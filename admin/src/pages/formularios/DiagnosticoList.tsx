import {
  List,
  useTable,
  ShowButton,
  DateField,
  EmailField,
} from '@refinedev/antd';
import { Table, Space, Tag, Alert } from 'antd';

export const DiagnosticoList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: 'formularios/diagnostico',
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
      <Alert
        message="Formulário Rápido de Contato (Diagnóstico)"
        description={<>Estes contatos vêm do formulário no rodapé da página inicial (Home). <a href="https://janiamesquita.com.br/#diagnostico" target="_blank" rel="noreferrer">Ver formulário no site</a></>}
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />
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
