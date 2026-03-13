import { List, useTable } from '@refinedev/antd';
import { Table, Space, Button, Image } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDelete, useNavigation } from '@refinedev/core';

export const GaleriaList = () => {
  const { tableProps } = useTable({
    resource: 'galeria/fotos',
    syncWithLocation: true,
  });

  const { mutate: deleteOne } = useDelete();
  const { edit, create } = useNavigation();

  const apiBase = (import.meta.env.VITE_API_URL || 'https://janiamesquita.com.br/api').replace(/\/api\/?$/, '');

  return (
    <List
      title="Galeria: 'Jania em Ação'"
      createButtonProps={{ onClick: () => create('galeria/fotos') }}
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column
          title="Imagem"
          dataIndex="src"
          render={(src: string) => {
            const fullUrl = src.startsWith('http') ? src : `${apiBase}${src}`;
            return (
              <Image
                src={fullUrl}
                width={80}
                height={80}
                style={{ objectFit: 'cover', borderRadius: 4 }}
              />
            );
          }}
        />
        <Table.Column title="Título" dataIndex="title" />
        <Table.Column title="Alt Text" dataIndex="alt" />
        <Table.Column title="Ordem" dataIndex="order" width={100} />
        <Table.Column
          title="Ações"
          render={(_, record: any) => (
            <Space>
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => edit('galeria/fotos', record.id)}
              />
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() =>
                  deleteOne({
                    resource: 'galeria/fotos',
                    id: record.id,
                  })
                }
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
