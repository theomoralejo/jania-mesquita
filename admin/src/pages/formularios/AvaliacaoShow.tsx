import {
  Show,
  TextField,
  EmailField,
  DateField,
} from '@refinedev/antd';
import { Typography, Tag, Space, Button, Card, Divider } from 'antd';
import { useShow, useUpdate } from '@refinedev/core';
import { useParams } from 'react-router-dom';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export const AvaliacaoShow = () => {
  const { id } = useParams();
  const { queryResult } = useShow({
    resource: 'formularios/avaliacao',
    id,
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

  let quizAnswers: Record<string, any> = {};
  if (record?.quizAnswers) {
    if (typeof record.quizAnswers === 'string') {
      try {
        quizAnswers = JSON.parse(record.quizAnswers);
      } catch (e) {
        console.error('Failed to parse quizAnswers:', e);
      }
    } else if (typeof record.quizAnswers === 'object') {
      quizAnswers = record.quizAnswers;
    }
  }
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
              {Object.entries(quizAnswers).map(([questionId, answerValue]: [string, any]) => {
                const qId = parseInt(questionId);
                const aVal = parseInt(answerValue);

                const questionsMap: Record<number, { title: string, options: Record<number, string> }> = {
                  1: {
                    title: 'Como estão documentados os processos da sua clínica?',
                    options: {
                      1: 'Não temos processos documentados - Tudo está na cabeça das pessoas',
                      2: 'Alguns processos informais - Anotações básicas e WhatsApp',
                      3: 'Processos principais documentados - Documentação dos fluxos core',
                      4: 'Todos processos otimizados - Documentação completa e atualizada',
                      5: 'Melhoria contínua sistêmica - Processos revisados e otimizados constantemente'
                    }
                  },
                  2: {
                    title: 'Como funciona a gestão do seu tempo na clínica?',
                    options: {
                      1: 'Dependência total do dono - Todas decisões passam por mim',
                      2: 'Apagar incêndios é rotina - Vivo resolvendo crises diárias',
                      3: 'Delegação funcional estabelecida - Time consegue operar sem mim em algumas áreas',
                      4: 'Liderança operacional capacitada - Time opera de forma autônoma',
                      5: 'Múltiplas unidades viáveis - Estrutura permite expansão'
                    }
                  },
                  3: {
                    title: 'Que tipo de métricas você acompanha regularmente?',
                    options: {
                      1: 'Sem métricas de gestão - Decisões por intuição',
                      2: 'Métricas básicas (faturamento) - Apenas controle financeiro básico',
                      3: 'Dashboard com KPIs básicos - Acompanhamento de indicadores principais',
                      4: 'Sistema de BI implementado - Análise avançada de dados',
                      5: 'Valuation claro - Métricas de valor empresarial'
                    }
                  },
                  4: {
                    title: 'Como é o planejamento estratégico da clínica?',
                    options: {
                      1: 'Não temos planejamento - Vamos tocando o dia a dia',
                      2: 'Planejamento informal - Ideias soltas sem estrutura',
                      3: 'Planejamento trimestral - Metas definidas por período',
                      4: 'Planejamento estratégico anual - Estrutégia estruturada de longo prazo',
                      5: 'Exit strategy definida - Planejamento de crescimento e saída'
                    }
                  },
                  5: {
                    title: 'Como está a previsibilidade financeira da operação?',
                    options: {
                      1: 'Margem imprevisível - Não sei quanto vou lucrar mês a mês',
                      2: 'Lucro existe, mas instável - Varia muito de mês para mês',
                      3: 'Margem previsível - Consigo prever resultados com razoável precisão',
                      4: 'Crescimento sustentável - Crescimento consistente e previsível',
                      5: 'Inovação estruturada - Investimento programado em crescimento'
                    }
                  }
                };

                const questionText = questionsMap[qId]?.title || `Pergunta ${qId}`;
                const answerText = questionsMap[qId]?.options[aVal] || `Resposta ${aVal}`;

                return (
                  <div key={questionId}>
                    <Text strong>{questionText}</Text>
                    <br />
                    <Text>{answerText}</Text>
                    <Divider style={{ margin: '8px 0' }} />
                  </div>
                );
              })}
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
