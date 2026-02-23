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

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="image"
          title="Foto"
          width="80px"
          render={(value) => (
            <Avatar src={value && value.startsWith('/uploads') ? (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/api\/?$/, '') + value : value} size={50} />
          )}
        />
        <Table.Column
          dataIndex="name"
          title="Nome"
          width="15%"
        />
        <Table.Column
          dataIndex="role"
          title="Cargo"
          width="15%"
        />
        <Table.Column
          dataIndex="event"
          title="Evento"
          width="15%"
        />
        <Table.Column
          dataIndex="quote"
          title="Depoimento"
          width="30%"
          ellipsis={true}
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
                      name: `${record.name} (copy)`,
                    };
                    // remove fields that should not be sent
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
      </Table>
    </List>
  );
};
