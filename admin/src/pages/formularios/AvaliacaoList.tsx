import {
  List,
  useTable,
  ShowButton,
  DateField,
  EmailField,
} from '@refinedev/antd';
import { Table, Space, Tag, Alert } from 'antd';

export const AvaliacaoList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: 'formularios/avaliacao',
    sorters: {
      initial: [
        {
          field: 'createdAt',
          order: 'desc',
        },
      ],
    },
  });

  const getMaturityLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      'Inicial': 'red',
      'Básico': 'orange',
      'Intermediário': 'yellow',
      'Avançado': 'green',
      'Excelente': 'blue',
    };
    return colors[level] || 'default';
  };

  return (
    <List>
      <Alert
        message="Teste de Maturidade (Avaliação / Diagnóstico Completo)"
        description={<>Estes contatos concluíram o quiz longo de pontuação de Maturidade da Clínica. <a href="https://janiamesquita.com.br/avaliacao" target="_blank" rel="noreferrer">Ver quiz no site</a></>}
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="name"
          title="Nome"
          width="15%"
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
          dataIndex="position"
          title="Cargo"
        />
        <Table.Column
          dataIndex="totalScore"
          title="Pontuação"
          align="center"
        />
        <Table.Column
          dataIndex="maturityLevel"
          title="Nível de Maturidade"
          render={(value) => (
            <Tag color={getMaturityLevelColor(value)}>{value}</Tag>
          )}
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
