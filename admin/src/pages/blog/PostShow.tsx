import {
  Show,
  TextField,
  DateField,
  BooleanField,
} from '@refinedev/antd';
import { Typography, Tag, Space, Image } from 'antd';
import { useShow } from '@refinedev/core';

const { Title, Paragraph } = Typography;

export const PostShow = () => {
  const { queryResult } = useShow({
    resource: 'blog/posts',
    meta: {
      populate: ['category'],
    },
  });
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={5}>Título</Title>
          <Title level={3}>{record?.title}</Title>
        </div>

        {record?.image && (
          <div>
            <Title level={5}>Imagem de Capa</Title>
            <Image
              src={record.image}
              alt={record.title}
              style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'cover' }}
            />
          </div>
        )}

        <div>
          <Title level={5}>Slug</Title>
          <TextField value={record?.slug} />
        </div>

        <div>
          <Title level={5}>Categoria</Title>
          <Tag color="blue">{record?.category?.label || 'Sem categoria'}</Tag>
        </div>

        <div>
          <Title level={5}>Resumo</Title>
          <Paragraph>{record?.excerpt}</Paragraph>
        </div>

        <div>
          <Title level={5}>Conteúdo</Title>
          <div
            dangerouslySetInnerHTML={{ __html: record?.content || '' }}
            style={{
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              padding: '16px',
              backgroundColor: '#fafafa',
            }}
          />
        </div>

        <div>
          <Title level={5}>Tempo de Leitura</Title>
          <TextField value={record?.readTime} />
        </div>

        <div>
          <Title level={5}>Status</Title>
          <Space>
            {record?.featured && <Tag color="gold">Destaque</Tag>}
            {record?.published ? (
              <Tag color="green">Publicado</Tag>
            ) : (
              <Tag color="orange">Rascunho</Tag>
            )}
          </Space>
        </div>

        <div>
          <Title level={5}>Data de Publicação</Title>
          <DateField value={record?.publishedAt} format="DD/MM/YYYY [às] HH:mm" />
        </div>

        <div>
          <Title level={5}>Criado em</Title>
          <DateField value={record?.createdAt} format="DD/MM/YYYY [às] HH:mm" />
        </div>

        <div>
          <Title level={5}>Atualizado em</Title>
          <DateField value={record?.updatedAt} format="DD/MM/YYYY [às] HH:mm" />
        </div>
      </Space>
    </Show>
  );
};
