import {
  List,
  useTable,
  ShowButton,
  DateField,
  EmailField,
} from '@refinedev/antd';
import { Table, Space, Tag } from 'antd';

export const MentoriaList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: 'formularios/mentoria',
    sorters: {
      initial: [
        {
          field: 'createdAt',
          order: 'desc',
        },
      ],
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="name"
          title="Nome"
          width="20%"
        />
        <Table.Column
          dataIndex="email"
          title="Email"
          render={(value) => <EmailField value={value} />}
        />
        <Table.Column
          dataIndex="phone"
          title="Telefone"
        />
        <Table.Column
          dataIndex="clinic"
          title="Clínica"
          width="20%"
        />
        <Table.Column
          dataIndex="revenue"
          title="Faturamento"
        />
        <Table.Column
          dataIndex="tier"
          title="Plano"
          render={(value) => (
            <Tag color="blue">{value}</Tag>
          )}
        />
        <Table.Column
          dataIndex="read"
          title="Lido"
          render={(value) => (
            value ? (
              <Tag color="green">Lido</Tag>
            ) : (
              <Tag color="orange">Não lido</Tag>
            )
          )}
        />
        <Table.Column
          dataIndex="createdAt"
          title="Data"
          render={(value) => <DateField value={value} format="DD/MM/YYYY HH:mm" />}
        />
        <Table.Column
          title="Ações"
          dataIndex="actions"
          render={(_, record: any) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
