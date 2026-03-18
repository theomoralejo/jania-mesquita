import {
  List,
  useTable,
  ShowButton,
  EditButton,
  DeleteButton,
} from '@refinedev/antd';
import { useCreate, useNavigation } from '@refinedev/core';
import { Space, Tag, Avatar, Button, message } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import EnhancedTable, { EnhancedColumn } from '../../components/EnhancedTable';

export const DepoimentoList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: 'depoimentos',
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

  const columns: EnhancedColumn[] = [
    {
      key: 'image',
      dataIndex: 'image',
      title: 'Foto',
      width: 80,
      render: (value: any) => {
        const url = value && value.startsWith('/uploads') ? (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/api\/?$/, '') + value : value;
        return url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" title="Clique para abrir a imagem">
            <Avatar src={url} size={32} />
          </a>
        ) : null;
      },
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Nome',
      width: '15%',
      editable: true,
    },
    {
      key: 'role',
      dataIndex: 'role',
      title: 'Cargo',
      width: '15%',
      editable: true,
    },
    {
      key: 'event',
      dataIndex: 'event',
      title: 'Evento',
      width: '15%',
      editable: true,
    },
    {
      key: 'quote',
      dataIndex: 'quote',
      title: 'Depoimento',
      width: '30%',
      ellipsis: true,
      editable: true,
    },
    {
      key: 'published',
      dataIndex: 'published',
      title: 'Publicado',
      render: (value: any) => (
        value ? (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Sim
          </Tag>
        ) : (
          <Tag icon={<CloseCircleOutlined />} color="default">
            Não
          </Tag>
        )
      ),
    },
  ];

  return (
    <List>
      <EnhancedTable
        dataSource={tableProps.dataSource || []}
        columns={columns}
        loading={tableProps.loading}
        resource="depoimentos"
        reorderEnabled={true}
        pagination={tableProps.pagination}
        onChange={tableProps.onChange}
        actionColumn={(record: any) => (
          <Space>
            <ShowButton hideText size="small" recordItemId={record.id} />
            <EditButton hideText size="small" recordItemId={record.id} />
            <Button
              size="small"
              onClick={async () => {
                try {
                  const createValues = {
                    ...record,
                    name: `${record.name} (copy)`,
                  };
                  delete createValues.id;
                  delete createValues.createdAt;
                  delete createValues.updatedAt;
                  await create({ resource: 'depoimentos', values: createValues });
                  message.success('Depoimento duplicado com sucesso');
                  list('depoimentos');
                } catch (err) {
                  console.error(err);
                  message.error('Erro ao duplicar depoimento');
                }
              }}
            >
              Duplicar
            </Button>
            <DeleteButton hideText size="small" recordItemId={record.id} />
          </Space>
        )}
      />
    </List>
  );
};
