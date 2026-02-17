import {
  List,
  useTable,
  ShowButton,
  EditButton,
  DeleteButton,
  BooleanField,
} from '@refinedev/antd';
import { Table, Space, Tag, Avatar } from 'antd';
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
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
