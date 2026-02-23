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
import { Table, Space, Tag, Button, message } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

export const PostList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: 'blog/posts',
  });

  const { mutate: create } = useCreate();
  const { list } = useNavigation();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="title"
          title="Título"
          width="30%"
        />
        <Table.Column
          dataIndex={['category', 'label']}
          title="Categoria"
          render={(value) => <Tag color="blue">{value}</Tag>}
        />
        <Table.Column
          dataIndex="featured"
          title="Destaque"
          render={(value) => (
            <BooleanField
              value={value}
              trueIcon={<CheckCircleOutlined />}
              falseIcon={<CloseCircleOutlined />}
              valueLabelTrue="Sim"
              valueLabelFalse="Não"
            />
          )}
        />
        <Table.Column
          dataIndex="published"
          title="Publicado"
          render={(value) => (
            <BooleanField
              value={value}
              trueIcon={<CheckCircleOutlined />}
              falseIcon={<CloseCircleOutlined />}
              valueLabelTrue="Sim"
              valueLabelFalse="Não"
            />
          )}
        />
        <Table.Column
          dataIndex="publishedAt"
          title="Data de Publicação"
          render={(value) => <DateField value={value} format="DD/MM/YYYY" />}
        />
        <Table.Column
          dataIndex="readTime"
          title="Tempo de Leitura"
        />
        <Table.Column
          title="Ações"
          dataIndex="actions"
          render={(_, record: any) => (
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
                    // remove fields that should not be sent
                    delete createValues.id;
                    delete createValues.createdAt;
                    delete createValues.updatedAt;

                    await create({ resource: 'blog/posts', values: createValues });
                    message.success('Post duplicado com sucesso');
                    // refresh table is automatic because useTable syncs with location — force reload by navigating to list
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
      </Table>
    </List>
  );
};
