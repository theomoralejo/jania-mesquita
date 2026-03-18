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

export const AcervoList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: 'acervo',
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
      title: 'Imagem',
      width: 100,
      render: (value: any) => {
        const url = value && value.startsWith('/uploads') ? (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/api\/?$/, '') + value : value;
        return url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" title="Clique para abrir a imagem">
            <Avatar src={url} size={32} shape="square" />
          </a>
        ) : null;
      },
    },
    {
      key: 'title',
      dataIndex: 'title',
      title: 'Título',
      width: '25%',
      editable: true,
    },
    {
      key: 'category',
      dataIndex: ['category', 'label'],
      title: 'Categoria',
    },
    {
      key: 'format',
      dataIndex: ['format', 'label'],
      title: 'Formato',
      hiddenByDefault: true,
    },
    {
      key: 'price',
      dataIndex: 'price',
      title: 'Preço',
      editable: true,
    },
    {
      key: 'published',
      dataIndex: 'published',
      title: 'Publicado',
      render: (value: any) => (
        value ? (
          <Tag icon={<CheckCircleOutlined />} color="success">Sim</Tag>
        ) : (
          <Tag icon={<CloseCircleOutlined />} color="default">Não</Tag>
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
        resource="acervo"
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
                    title: `${record.title} (Cópia)`,
                    slug: `${record.slug}-copia-${Math.floor(Date.now() / 1000)}`,
                    published: false,
                  };
                  delete createValues.id;
                  delete createValues.createdAt;
                  delete createValues.updatedAt;
                  delete createValues.category;
                  delete createValues.format;
                  delete createValues.tags;
                  delete createValues.features;
                  delete createValues.benefits;
                  await create({ resource: 'acervo', values: createValues });
                  message.success('Produto duplicado com sucesso');
                  list('acervo');
                } catch (err) {
                  console.error(err);
                  message.error('Erro ao duplicar produto');
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
