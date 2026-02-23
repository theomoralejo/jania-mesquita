import {
  Show,
  TextField,
  EmailField,
  DateField,
} from '@refinedev/antd';
import { Typography, Tag, Space, Button, Card, Divider } from 'antd';
import { useShow, useUpdate } from '@refinedev/core';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export const AvaliacaoShow = () => {
  const { queryResult } = useShow({
    resource: 'formularios/avaliacao',
  });
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { mutate: updateRead } = useUpdate();

  const handleMarkAsRead = () => {
    if (record?.id) {
      updateRead({
        resource: 'formularios/avaliacao',
        id: record.id,
        values: { read: true },
      });
    }
  };

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

  const quizAnswers = record?.quizAnswers ? JSON.parse(record.quizAnswers as string) : {};

  return (
    <Show
      isLoading={isLoading}
      headerButtons={({ defaultButtons }) => (
        <>
          {!record?.read && (
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={handleMarkAsRead}
            >
              Marcar como Lido
            </Button>
          )}
          {defaultButtons}
        </>
      )}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={5}>Status</Title>
          {record?.read ? (
            <Tag color="green">Lido</Tag>
          ) : (
            <Tag color="orange">Não lido</Tag>
          )}
        </div>

        <Card title="Informações Pessoais" size="small">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text strong>Nome:</Text> <TextField value={record?.name} />
            </div>
            <div>
              <Text strong>Email:</Text> <EmailField value={record?.email} />
            </div>
            <div>
              <Text strong>Telefone:</Text> <TextField value={record?.phone} />
            </div>
            <div>
              <Text strong>Cargo:</Text> <TextField value={record?.position} />
            </div>
          </Space>
        </Card>

        <Card title="Informações da Empresa" size="small">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text strong>Faturamento Mensal:</Text> <TextField value={record?.revenue} />
            </div>
            <div>
              <Text strong>Número de Colaboradores:</Text> <TextField value={record?.employees} />
            </div>
            <div>
              <Text strong>Tempo de Operação:</Text> <TextField value={record?.operationTime} />
            </div>
          </Space>
        </Card>

        <Card title="Resultado da Avaliação" size="small">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text strong>Pontuação Total:</Text>{' '}
              <Tag color="blue" style={{ fontSize: '16px', padding: '4px 12px' }}>
                {record?.totalScore} pontos
              </Tag>
            </div>
            <div>
              <Text strong>Nível de Maturidade:</Text>{' '}
              <Tag
                color={getMaturityLevelColor(record?.maturityLevel || '')}
                style={{ fontSize: '16px', padding: '4px 12px' }}
              >
                {record?.maturityLevel}
              </Tag>
            </div>
          </Space>
        </Card>

        <Card title="Respostas do Questionário" size="small">
          {Object.keys(quizAnswers).length > 0 ? (
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              {Object.entries(quizAnswers).map(([question, answer]: [string, any]) => (
                <div key={question}>
                  <Text strong>{question}:</Text>
                  <br />
                  <Text>{answer}</Text>
                  <Divider style={{ margin: '8px 0' }} />
                </div>
              ))}
            </Space>
          ) : (
            <Text type="secondary">Nenhuma resposta registrada</Text>
          )}
        </Card>

        <div>
          <Title level={5}>Data de Envio</Title>
          <DateField value={record?.createdAt} format="DD/MM/YYYY [às] HH:mm" />
        </div>
      </Space>
    </Show>
  );
};
