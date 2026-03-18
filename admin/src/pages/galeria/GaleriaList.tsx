import { List, useTable } from '@refinedev/antd';
import { Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDelete, useNavigation } from '@refinedev/core';
import EnhancedTable, { EnhancedColumn } from '../../components/EnhancedTable';

export const GaleriaList = () => {
  const { tableProps } = useTable({
    resource: 'galeria/fotos',
    syncWithLocation: true,
  });

  const { mutate: deleteOne } = useDelete();
  const { edit, create } = useNavigation();

  const apiBase = (import.meta.env.VITE_API_URL || 'https://janiamesquita.com.br/api').replace(/\/api\/?$/, '');

  const columns: EnhancedColumn[] = [
    {
      key: 'src',
      dataIndex: 'src',
      title: 'Imagem',
      render: (src: string) => {
        const fullUrl = src.startsWith('http') ? src : `${apiBase}${src}`;
        return (
          <a href={fullUrl} target="_blank" rel="noopener noreferrer" title="Clique para abrir a imagem">
            <img
              src={fullUrl}
              width={32}
              height={32}
              style={{ objectFit: 'cover', borderRadius: 4, display: 'block' }}
            />
          </a>
        );
      },
    },
    {
      key: 'title',
      dataIndex: 'title',
      title: 'Título',
      editable: true,
    },
    {
      key: 'alt',
      dataIndex: 'alt',
      title: 'Alt Text',
      editable: true,
    },
  ];

  return (
    <List
      title="Galeria: 'Jania em Ação'"
      createButtonProps={{ onClick: () => create('galeria/fotos') }}
    >
      <EnhancedTable
        dataSource={tableProps.dataSource || []}
        columns={columns}
        loading={tableProps.loading}
        resource="galeria/fotos"
        reorderEnabled={true}
        pagination={tableProps.pagination}
        onChange={tableProps.onChange}
        actionColumn={(record: any) => (
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
    </List>
  );
};
