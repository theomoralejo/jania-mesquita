import {
  List,
  useTable,
  EditButton,
  ShowButton,
  DeleteButton,
  DateField,
  BooleanField,
} from '@refinedev/antd';
import { Table, Space, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

export const PostList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: 'blog/posts',
  });

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
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
