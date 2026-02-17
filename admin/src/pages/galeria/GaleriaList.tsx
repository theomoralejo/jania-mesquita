import {
  List,
  useTable,
  DeleteButton,
} from '@refinedev/antd';
import { Table, Space, Image } from 'antd';

export const GaleriaList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: 'galeria/fotos',
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
          dataIndex="src"
          title="Foto"
          width="120px"
          render={(value) => (
            <Image
              src={value && value.startsWith('/uploads') ? (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/api\/?$/, '') + value : value}
              alt="foto"
              width={100}
              height={100}
              style={{ objectFit: 'cover', borderRadius: '4px' }}
              preview={{
                mask: 'Ver',
              }}
            />
          )}
        />
        <Table.Column
          dataIndex="title"
          title="Título"
          width="30%"
        />
        <Table.Column
          dataIndex="alt"
          title="Texto Alternativo"
          width="30%"
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
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
