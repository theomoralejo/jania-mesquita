import {
  List,
  useTable,
  EditButton,
  ShowButton,
  DeleteButton,
  DateField,
  BooleanField,
} from '@refinedev/antd';
import { useCreate, useNavigation } from '@refinedev/core';
import { Space, Tag, Button, message } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import EnhancedTable, { EnhancedColumn } from '../../components/EnhancedTable';

export const PostList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: 'blog/posts',
  });

  const { mutate: create } = useCreate();
  const { list } = useNavigation();

  const columns: EnhancedColumn[] = [
    {
      key: 'title',
      dataIndex: 'title',
      title: 'Título',
      width: '30%',
      editable: true,
    },
    {
      key: 'category',
      dataIndex: ['category', 'label'],
      title: 'Categoria',
      render: (value: any) => <Tag color="blue">{value}</Tag>,
    },
    {
      key: 'featured',
      dataIndex: 'featured',
      title: 'Destaque',
      render: (value: any) => (
        <BooleanField
          value={value}
          trueIcon={<CheckCircleOutlined />}
          falseIcon={<CloseCircleOutlined />}
          valueLabelTrue="Sim"
          valueLabelFalse="Não"
        />
      ),
    },
    {
      key: 'published',
      dataIndex: 'published',
      title: 'Publicado',
      render: (value: any) => (
        <BooleanField
          value={value}
          trueIcon={<CheckCircleOutlined />}
          falseIcon={<CloseCircleOutlined />}
          valueLabelTrue="Sim"
          valueLabelFalse="Não"
        />
      ),
    },
    {
      key: 'publishedAt',
      dataIndex: 'publishedAt',
      title: 'Data de Publicação',
      render: (value: any) => <DateField value={value} format="DD/MM/YYYY" />,
    },
    {
      key: 'readTime',
      dataIndex: 'readTime',
      title: 'Tempo de Leitura',
      hiddenByDefault: true,
    },
  ];

  return (
    <List>
      <EnhancedTable
        dataSource={tableProps.dataSource || []}
        columns={columns}
        loading={tableProps.loading}
        resource="blog/posts"
        reorderEnabled={false}
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
                  const newSlug = `${record.slug}-copy-${Date.now().toString().slice(-4)}`;
                  const createValues = {
                    ...record,
                    title: `${record.title} (copy)`,
                    slug: newSlug,
                    published: false,
                  };
                  delete createValues.id;
                  delete createValues.createdAt;
                  delete createValues.updatedAt;
                  await create({ resource: 'blog/posts', values: createValues });
                  message.success('Post duplicado com sucesso');
                  list('blog/posts');
                } catch (err) {
                  console.error(err);
                  message.error('Erro ao duplicar post');
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
