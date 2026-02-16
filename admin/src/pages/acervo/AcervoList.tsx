import {
  List,
  useTable,
  ShowButton,
  EditButton,
  DeleteButton,
} from '@refinedev/antd';
import { Table, Space, Tag, Avatar } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

export const AcervoList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: 'acervo/products',
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
          title="Imagem"
          width="100px"
          render={(value) => (
            <Avatar src={value} size={64} shape="square" />
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
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
