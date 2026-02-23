import {
  List,
  useTable,
  ShowButton,
  EditButton,
  DeleteButton,
} from '@refinedev/antd';
import { useCreate, useNavigation } from '@refinedev/core';
import { Table, Space, Tag, Avatar, Button, message } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

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

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="image"
          title="Imagem"
          width="100px"
          render={(value) => (
            <Avatar src={value && value.startsWith('/uploads') ? (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/api\/?$/, '') + value : value} size={64} shape="square" />
          )}
        />
        <Table.Column
          dataIndex="title"
          title="Título"
          width="25%"
        />
        <Table.Column
          dataIndex={['category', 'label']}
          title="Categoria"
        />
        <Table.Column
          dataIndex={['format', 'label']}
          title="Formato"
        />
        <Table.Column
          dataIndex="price"
          title="Preço"
        />
        <Table.Column
          dataIndex="published"
          title="Publicado"
          render={(value) => (
            value ? (
              <Tag icon={<CheckCircleOutlined />} color="success">
                Sim
              </Tag>
            ) : (
              <Tag icon={<CloseCircleOutlined />} color="default">
                Não
              </Tag>
            )
          )}
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
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
              <Button
                size="small"
                onClick={async () => {
                  try {
                    const createValues = {
                      ...record,
                      title: `${record.title} (copy)`,
                      published: false,
                    };
                    // remove fields that should not be sent
                    delete createValues.id;
                    delete createValues.createdAt;
                    delete createValues.updatedAt;

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
      </Table>
    </List>
  );
};
