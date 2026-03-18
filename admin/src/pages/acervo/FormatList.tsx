import {
  List,
  useTable,
  EditButton,
  DeleteButton,
} from '@refinedev/antd';
import { useCreate, useNavigation } from '@refinedev/core';
import { Space, Button, message } from 'antd';
import EnhancedTable, { EnhancedColumn } from '../../components/EnhancedTable';

export const FormatList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: 'acervo/formats',
  });

  const { mutate: create } = useCreate();
  const { list } = useNavigation();

  const columns: EnhancedColumn[] = [
    {
      key: 'label',
      dataIndex: 'label',
      title: 'Nome',
      width: '40%',
      editable: true,
    },
    {
      key: 'slug',
      dataIndex: 'slug',
      title: 'Slug',
      width: '40%',
      editable: true,
    },
  ];

  return (
    <List>
      <EnhancedTable
        dataSource={tableProps.dataSource || []}
        columns={columns}
        loading={tableProps.loading}
        resource="acervo/formats"
        reorderEnabled={false}
        pagination={tableProps.pagination}
        onChange={tableProps.onChange}
        actionColumn={(record: any) => (
          <Space>
            <EditButton hideText size="small" recordItemId={record.id} />
            <Button
              size="small"
              onClick={async () => {
                try {
                  const createValues = {
                    ...record,
                    label: `${record.label} (copy)`,
                    slug: `${record.slug}-copy-${Date.now().toString().slice(-4)}`,
                  };
                  delete createValues.id;
                  delete createValues.createdAt;
                  delete createValues.updatedAt;
                  await create({ resource: 'acervo/formats', values: createValues });
                  message.success('Formato duplicado com sucesso');
                  list('acervo/formats');
                } catch (err) {
                  console.error(err);
                  message.error('Erro ao duplicar formato');
                }
              }}
            >
              Duplicar
            </Button>
            <DeleteButton hideText size="small" recordItemId={record.id} />
          </Space>
        )}
      />
    </List>
  );
};
