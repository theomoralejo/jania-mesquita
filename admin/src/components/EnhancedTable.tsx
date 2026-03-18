import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Table, Input, Button, Dropdown, Checkbox, Space, message } from 'antd';
import { MenuOutlined, SettingOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// ==========================================
// Sortable Row Component
// ==========================================
interface SortableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const SortableRow: React.FC<SortableRowProps> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props['data-row-key'] });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform),
    transition,
    ...(isDragging ? { 
      position: 'relative' as const, 
      zIndex: 9999,
      background: '#fafafa',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    } : {}),
  };

  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(props.children, (child) => {
        if (React.isValidElement(child) && (child as any).key === 'drag-handle') {
          return React.cloneElement(child as React.ReactElement<any>, {
            children: (
              <MenuOutlined 
                style={{ cursor: 'grab', color: '#999' }} 
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};

// ==========================================
// Inline Editable Cell
// ==========================================
interface EditableCellProps {
  value: any;
  record: any;
  field: string;
  onSave: (record: any, field: string, value: any) => Promise<void>;
  editable?: boolean;
  renderDisplay?: (value: any, record: any) => React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  value,
  record,
  field,
  onSave,
  editable = true,
  renderDisplay,
}) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleSave = async () => {
    if (inputValue !== value) {
      await onSave(record, field, inputValue);
    }
    setEditing(false);
  };

  const handleCancel = () => {
    setInputValue(value);
    setEditing(false);
  };

  if (!editable) {
    return <>{renderDisplay ? renderDisplay(value, record) : value}</>;
  }

  if (editing) {
    return (
      <Space.Compact style={{ width: '100%' }}>
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleSave}
          onKeyDown={(e) => e.key === 'Escape' && handleCancel()}
          size="small"
        />
        <Button size="small" type="primary" icon={<CheckOutlined />} onClick={handleSave} />
        <Button size="small" icon={<CloseOutlined />} onClick={handleCancel} />
      </Space.Compact>
    );
  }

  return (
    <div
      style={{ cursor: 'pointer', minHeight: 22, padding: '0 2px' }}
      onClick={() => {
        setInputValue(value);
        setEditing(true);
      }}
      title="Clique para editar"
    >
      {renderDisplay ? renderDisplay(value, record) : (value || <span style={{color: '#ccc'}}>—</span>)}
    </div>
  );
};

// ==========================================
// Column Visibility Dropdown
// ==========================================
interface ColumnVisibilityProps {
  columns: { key: string; title: string }[];
  visible: Record<string, boolean>;
  onChange: (key: string, checked: boolean) => void;
}

const ColumnVisibility: React.FC<ColumnVisibilityProps> = ({ columns, visible, onChange }) => {
  const items = columns.map((col) => ({
    key: col.key,
    label: (
      <Checkbox
        checked={visible[col.key] !== false}
        onChange={(e) => onChange(col.key, e.target.checked)}
      >
        {col.title}
      </Checkbox>
    ),
  }));

  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
      <Button icon={<SettingOutlined />} size="small" title="Colunas visíveis">
        Colunas
      </Button>
    </Dropdown>
  );
};

// ==========================================
// Main Enhanced Table Component
// ==========================================
export interface EnhancedColumn {
  key: string;
  dataIndex: string | string[];
  title: string;
  width?: string | number;
  editable?: boolean;  // allow inline editing
  ellipsis?: boolean;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, record: any) => React.ReactNode;
  hiddenByDefault?: boolean;
}

interface EnhancedTableProps {
  dataSource: readonly any[] | any[];
  columns: EnhancedColumn[];
  loading?: any;
  rowKey?: string;
  resource: string;           // API resource path for reorder
  reorderEnabled?: boolean;   // enable drag-and-drop
  onInlineSave?: (record: any, field: string, value: any) => Promise<void>;
  actionColumn?: (record: any) => React.ReactNode;
  pagination?: any;
  onChange?: any;
}

const EnhancedTable: React.FC<EnhancedTableProps> = ({
  dataSource: externalData,
  columns: columnDefs,
  loading,
  rowKey = 'id',
  resource,
  reorderEnabled = false,
  onInlineSave,
  actionColumn,
  pagination,
  onChange,
}) => {
  const [dataSource, setDataSource] = useState<any[]>([...(externalData || [])]);
  const storageKey = `col-visibility-${resource}`;
  
  // Load saved column visibility from localStorage
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch {}
    // Default: hide columns marked as hiddenByDefault
    const defaults: Record<string, boolean> = {};
    columnDefs.forEach(c => {
      if (c.hiddenByDefault) defaults[c.key] = false;
    });
    return defaults;
  });

  useEffect(() => {
    setDataSource([...(externalData || [])]);
  }, [externalData]);

  const handleColumnVisibilityChange = (key: string, checked: boolean) => {
    const newVis = { ...columnVisibility, [key]: checked };
    setColumnVisibility(newVis);
    localStorage.setItem(storageKey, JSON.stringify(newVis));
  };

  // Default inline save via PATCH
  const defaultInlineSave = useCallback(async (record: any, field: string, value: any) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_URL}/admin/${resource}/${record.id}`, 
        { [field]: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update local state
      setDataSource(prev => 
        prev.map(item => item.id === record.id ? { ...item, [field]: value } : item)
      );
      message.success('Atualizado!');
    } catch (err) {
      console.error(err);
      message.error('Erro ao atualizar');
    }
  }, [resource]);

  const handleInlineSave = onInlineSave || defaultInlineSave;

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = dataSource.findIndex(item => item[rowKey] === active.id);
    const newIndex = dataSource.findIndex(item => item[rowKey] === over.id);
    const newData = arrayMove(dataSource, oldIndex, newIndex);
    
    // Update local state immediately
    setDataSource(newData);

    // Send reorder to backend
    try {
      const token = localStorage.getItem('token');
      const items = newData.map((item, index) => ({ id: item[rowKey], order: index }));
      await axios.post(`${API_URL}/admin/${resource}/reorder`, { items }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success('Ordem salva!');
    } catch (err) {
      console.error(err);
      message.error('Erro ao salvar ordem');
    }
  }, [dataSource, rowKey, resource]);

  // Build Ant Design columns
  const antColumns: ColumnsType<any> = [];

  // Add drag handle column if reorder enabled
  if (reorderEnabled) {
    antColumns.push({
      key: 'drag-handle',
      dataIndex: 'drag-handle',
      title: '',
      width: 40,
      align: 'center',
      render: () => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />,
    });
  }

  // Add defined columns (respecting visibility)
  columnDefs.forEach(col => {
    if (columnVisibility[col.key] === false) return;

    antColumns.push({
      key: col.key,
      dataIndex: col.dataIndex,
      title: col.title,
      width: col.width,
      ellipsis: col.ellipsis,
      align: col.align,
      render: col.editable
        ? (value: any, record: any) => (
            <EditableCell
              value={typeof col.dataIndex === 'string' ? record[col.dataIndex] : value}
              record={record}
              field={typeof col.dataIndex === 'string' ? col.dataIndex : col.key}
              onSave={handleInlineSave}
              editable={true}
              renderDisplay={col.render ? (v: any, r: any) => col.render!(v, r) : undefined}
            />
          )
        : col.render 
          ? (value: any, record: any) => col.render!(value, record)
          : undefined,
    });
  });

  // Add actions column
  if (actionColumn) {
    antColumns.push({
      key: 'actions',
      title: 'Ações',
      width: 160,
      render: (_: any, record: any) => actionColumn(record),
    });
  }

  // Column visibility items
  const visibilityItems = columnDefs.map(c => ({
    key: c.key,
    title: c.title as string,
  }));

  const tableContent = (
    <Table
      dataSource={dataSource}
      columns={antColumns}
      rowKey={rowKey}
      loading={loading}
      pagination={pagination}
      onChange={onChange}
      size="small"
      components={reorderEnabled ? {
        body: {
          row: SortableRow,
        },
      } : undefined}
    />
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <ColumnVisibility
          columns={visibilityItems}
          visible={columnVisibility}
          onChange={handleColumnVisibilityChange}
        />
      </div>
      {reorderEnabled ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={dataSource.map(item => item[rowKey])}
            strategy={verticalListSortingStrategy}
          >
            {tableContent}
          </SortableContext>
        </DndContext>
      ) : (
        tableContent
      )}
    </div>
  );
};

export default EnhancedTable;
export { EditableCell, ColumnVisibility };
