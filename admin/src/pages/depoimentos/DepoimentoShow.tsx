import {
  Show,
  TextField,
  BooleanField,
} from '@refinedev/antd';
import { Typography, Tag, Space, Image } from 'antd';
import { useShow } from '@refinedev/core';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export const DepoimentoShow = () => {
  const { queryResult } = useShow({
    resource: 'depoimentos',
  });
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {record?.image && (
          <div style={{ textAlign: 'center' }}>
            <Image
              src={record.image && record.image.startsWith('/uploads') ? (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/api\/?$/, '') + record.image : record.image}
              alt={record.name}
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
          </div>
        )}

        <div>
          <Title level={5}>Nome</Title>
          <TextField value={record?.name} />
        </div>

        <div>
          <Title level={5}>Cargo/Função</Title>
          <TextField value={record?.role} />
        </div>

        <div>
          <Title level={5}>Evento/Contexto</Title>
          <TextField value={record?.event} />
        </div>

        <div>
          <Title level={5}>Depoimento</Title>
          <Paragraph
            style={{
              fontStyle: 'italic',
              fontSize: '16px',
              padding: '16px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              borderLeft: '4px solid #722d82',
            }}
          >
            "{record?.quote}"
          </Paragraph>
        </div>

        <div>
          <Title level={5}>Status</Title>
          {record?.published ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              Publicado
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="default">
              Não Publicado
            </Tag>
          )}
        </div>

        <div>
          <Title level={5}>Ordem de Exibição</Title>
          <TextField value={record?.order} />
        </div>
      </Space>
    </Show>
  );
};
