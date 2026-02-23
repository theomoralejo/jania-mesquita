import {
  List,
  useTable,
  DateField,
  EmailField,
  BooleanField,
} from '@refinedev/antd';
import { Table, Tag } from 'antd';

export const NewsletterList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: 'formularios/newsletter',
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
          dataIndex="email"
          title="Email"
          width="40%"
          render={(value) => <EmailField value={value} />}
        />
        <Table.Column
          dataIndex="active"
          title="Status"
          render={(value) => (
            value ? (
              <Tag color="green">Ativo</Tag>
            ) : (
              <Tag color="red">Inativo</Tag>
            )
          )}
        />
        <Table.Column
          dataIndex="createdAt"
          title="Data de Inscrição"
          render={(value) => <DateField value={value} format="DD/MM/YYYY HH:mm" />}
        />
      </Table>
    </List>
  );
};
