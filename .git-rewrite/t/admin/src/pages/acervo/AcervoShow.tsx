import {
  Show,
  TextField,
  BooleanField,
} from '@refinedev/antd';
import { Typography, Tag, Space, Image, Card } from 'antd';
import { useShow } from '@refinedev/core';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Link } = Typography;

export const AcervoShow = () => {
  const { queryResult } = useShow({
    resource: 'acervo/products',
    meta: {
      populate: ['category', 'format'],
    },
  });
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {record?.image && (
          <div style={{ textAlign: 'center' }}>
            <Image
              src={record.image}
              alt={record.title}
              style={{
                maxWidth: '100%',
                maxHeight: '400px',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
          </div>
        )}

        <div>
          <Title level={3}>{record?.title}</Title>
        </div>

        <div>
          <Title level={5}>Slug</Title>
          <TextField value={record?.slug} />
        </div>

        <div>
          <Title level={5}>Categoria e Formato</Title>
          <Space>
            <Tag color="blue">{record?.category?.label || 'Sem categoria'}</Tag>
            <Tag color="purple">{record?.format?.label || 'Sem formato'}</Tag>
          </Space>
        </div>

        <div>
          <Title level={5}>Descrição</Title>
          <Paragraph>{record?.description}</Paragraph>
        </div>

        {record?.fullContent && (
          <div>
            <Title level={5}>Conteúdo Completo</Title>
            <Card>
              <div
                dangerouslySetInnerHTML={{ __html: record.fullContent }}
                style={{
                  backgroundColor: '#fafafa',
                }}
              />
            </Card>
          </div>
        )}

        <div>
          <Title level={5}>Preço</Title>
          <Tag color="green" style={{ fontSize: '16px', padding: '4px 12px' }}>
            {record?.price}
          </Tag>
        </div>

        {record?.hotmartLink && (
          <div>
            <Title level={5}>Link de Compra</Title>
            <Link href={record.hotmartLink} target="_blank">
              {record.hotmartLink}
            </Link>
          </div>
        )}

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
