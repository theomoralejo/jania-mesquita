import {
  Show,
  TextField,
  EmailField,
  DateField,
} from '@refinedev/antd';
import { Typography, Tag, Space, Button } from 'antd';
import { useShow, useUpdate } from '@refinedev/core';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export const ContatoShow = () => {
  const { queryResult } = useShow({
    resource: 'formularios/contato',
  });
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { mutate: updateRead } = useUpdate();

  const handleMarkAsRead = () => {
    if (record?.id) {
      updateRead({
        resource: 'formularios/contato',
        id: record.id,
        values: { read: true },
      });
    }
  };

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

        <div>
          <Title level={5}>Nome</Title>
          <TextField value={record?.name} />
        </div>

        <div>
          <Title level={5}>Email</Title>
          <EmailField value={record?.email} />
        </div>

        <div>
          <Title level={5}>Telefone</Title>
          <TextField value={record?.phone} />
        </div>

        <div>
          <Title level={5}>Assunto</Title>
          <TextField value={record?.subject} />
        </div>

        <div>
          <Title level={5}>Mensagem</Title>
          <Text style={{ whiteSpace: 'pre-wrap' }}>{record?.message}</Text>
        </div>

        <div>
          <Title level={5}>Data de Envio</Title>
          <DateField value={record?.createdAt} format="DD/MM/YYYY [às] HH:mm" />
        </div>
      </Space>
    </Show>
  );
};
