import {
  Edit,
  useForm,
  useSelect,
} from '@refinedev/antd';
import { Form, Input, Select, Switch, InputNumber, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { ImageUpload } from '../../components/ImageUpload';
import { RichTextEditor } from '../../components/RichTextEditor';

// Função para calcular tempo de leitura
const calculateReadTime = (content: string): string => {
  if (!content) return '1 min';

  // Remove HTML tags e conta palavras
  const text = content.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).length;

  // Média de 200 palavras por minuto
  const minutes = Math.ceil(words / 200);

  return `${minutes} min`;
};

export const PostEdit = () => {
  const { formProps, saveButtonProps, queryResult, form } = useForm({
    resource: 'blog/posts',
  });

  const { selectProps: categorySelectProps } = useSelect({
    resource: 'blog/categories',
    optionLabel: 'label',
    optionValue: 'id',
    defaultValue: queryResult?.data?.data?.categoryId,
  });

  // Atualiza tempo de leitura quando conteúdo muda
  const handleContentChange = (value: string) => {
    form?.setFieldValue('content', value);
    const readTime = calculateReadTime(value);
    form?.setFieldValue('readTime', readTime);
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Título"
          name="title"
          rules={[{ required: true, message: 'Por favor, insira o título' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Slug"
          name="slug"
          rules={[{ required: true, message: 'Por favor, insira o slug' }]}
          extra="URL amigável (ex: meu-post-incrivel)"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Categoria"
          name="categoryId"
          rules={[{ required: true, message: 'Por favor, selecione uma categoria' }]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>

        <Form.Item
          label="Resumo"
          name="excerpt"
          rules={[{ required: true, message: 'Por favor, insira o resumo' }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Conteúdo"
          name="content"
          rules={[{ required: true, message: 'Por favor, insira o conteúdo' }]}
        >
          <RichTextEditor
            placeholder="Digite o conteúdo do post..."
            onChange={handleContentChange}
          />
        </Form.Item>

        <Form.Item
          label="Imagem de Capa"
          name="image"
          rules={[{ required: true, message: 'Por favor, faça upload da imagem' }]}
        >
          <ImageUpload folder="blog" />
        </Form.Item>

        <Form.Item
          label="Tempo de Leitura"
          name="readTime"
          rules={[{ required: true }]}
          extra="Calculado automaticamente baseado no conteúdo"
        >
          <Input placeholder="8 min" disabled />
        </Form.Item>

        <Form.Item
          label="Post em Destaque"
          name="featured"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Publicado"
          name="published"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Data de Publicação"
          name="publishedAt"
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
          normalize={(value) => value && dayjs(value).toISOString()}
        >
          <DatePicker showTime format="DD/MM/YYYY HH:mm" style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
