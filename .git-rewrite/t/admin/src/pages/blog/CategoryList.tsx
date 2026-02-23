import {
  List,
  useTable,
  EditButton,
  DeleteButton,
} from '@refinedev/antd';
import { Table, Space } from 'antd';

export const CategoryList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: 'blog/categories',
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="label"
          title="Nome"
          width="40%"
        />
        <Table.Column
          dataIndex="slug"
          title="Slug"
          width="40%"
        />
        <Table.Column
          title="Ações"
          dataIndex="actions"
          render={(_, record: any) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
