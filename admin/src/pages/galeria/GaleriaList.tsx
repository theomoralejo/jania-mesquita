import {
  List,
  useTable,
  EditButton,
  DeleteButton,
} from '@refinedev/antd';
import { useCreate, useNavigation } from '@refinedev/core';
import { Table, Space, Image, Button, message } from 'antd';
import { axiosInstance } from '../../providers/authProvider';

export const GaleriaList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: 'galeria/fotos',
    sorters: {
      initial: [
        {
          field: 'order',
          order: 'asc',
        },
      ],
    },
  });

  const { mutate: create } = useCreate();
  const { list } = useNavigation();

  const onDragStart = (e: React.DragEvent, record: any) => {
    e.dataTransfer.setData('text/plain', String(record.id));
  };

  const onDrop = async (e: React.DragEvent, targetRecord: any) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    if (!draggedId) return;

    const data: any[] = (tableProps as any).dataSource || [];
    const draggedIndex = data.findIndex((d) => String(d.id) === String(draggedId));
    const targetIndex = data.findIndex((d) => d.id === targetRecord.id);
    if (draggedIndex === -1 || targetIndex === -1) return;

    const newData = [...data];
    const [moved] = newData.splice(draggedIndex, 1);
    newData.splice(targetIndex, 0, moved);

    // prepare payload with new order values
    const payload = newData.map((item, idx) => ({ id: item.id, order: idx }));

    try {
      await axiosInstance.put('/admin/galeria/fotos/reorder', { items: payload });
      message.success('Ordem atualizada');
      list('galeria');
    } catch (err) {
      console.error(err);
      message.error('Erro ao atualizar ordem');
    }
  };

  return (
    <List>
      <Table
        {...tableProps}
        rowKey="id"
        onRow={(record) => ({
          draggable: true,
          onDragStart: (e) => onDragStart(e as React.DragEvent, record),
          onDragOver: (e) => e.preventDefault(),
          onDrop: (e) => onDrop(e as React.DragEvent, record),
        })}
      >
        <Table.Column
          dataIndex="src"
          title="Foto"
          width="120px"
          render={(value) => {
            const apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/api\/?$/, '');
            const src = value && value.startsWith('/uploads') ? `${apiBase}${value}` : value;
            return (
              <Image
                src={src}
                alt="foto"
                width={100}
                height={100}
                style={{ objectFit: 'cover', borderRadius: '4px' }}
                preview={{ mask: 'Ver' }}
                fallback="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23ddd'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='%23999' font-size='10'%3ESem imagem%3C/text%3E%3C/svg%3E"
              />
            );
          }}
        />
        <Table.Column
          dataIndex="title"
          title="Título"
          width="30%"
        />
        <Table.Column
          dataIndex="alt"
          title="Texto Alternativo"
          width="30%"
        />
        <Table.Column
          dataIndex="order"
          title="Ordem"
          align="center"
        />
        <Table.Column
          title="Ações"
          dataIndex="actions"
          render={(_, record: any) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <Button
                size="small"
                onClick={async () => {
                  try {
                    const createValues = {
                      ...record,
                      title: `${record.title} (copy)`,
                    };
                    // remove fields that should not be sent
                    delete createValues.id;
                    delete createValues.createdAt;
                    delete createValues.updatedAt;

                    await create({ resource: 'galeria/fotos', values: createValues });
                    message.success('Foto duplicada com sucesso');
                    list('galeria');
                  } catch (err) {
                    console.error(err);
                    message.error('Erro ao duplicar foto');
                  }
                }}
              >
                Duplicar
              </Button>
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
