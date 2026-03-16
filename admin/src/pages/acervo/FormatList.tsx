import {
  List,
  useTable,
  EditButton,
  DeleteButton,
} from '@refinedev/antd';
import { useCreate, useNavigation } from '@refinedev/core';
import { Table, Space, Button, message } from 'antd';

export const FormatList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: 'acervo/formats',
  });

  const { mutate: create } = useCreate();
  const { list } = useNavigation();

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
              <Button
                size="small"
                onClick={async () => {
                  try {
                    const createValues = {
                      ...record,
                      label: `${record.label} (copy)`,
                      slug: `${record.slug}-copy-${Date.now().toString().slice(-4)}`,
                    };
                    // remove fields that should not be sent
                    delete createValues.id;
                    delete createValues.createdAt;
                    delete createValues.updatedAt;

                    await create({ resource: 'acervo/formats', values: createValues });
                    message.success('Formato duplicada com sucesso');
                    list('acervo/formats');
                  } catch (err) {
                    console.error(err);
                    message.error('Erro ao duplicar categoria');
                  }
                }}
              >
                Duplicar
              </Button>
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
