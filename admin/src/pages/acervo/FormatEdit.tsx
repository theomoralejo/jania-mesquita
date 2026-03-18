import {
  Edit,
  useForm,
} from '@refinedev/antd';
import { Form, Input, Select } from 'antd';

const ICON_OPTIONS = [
  { value: 'Book', label: 'Livro (Book)' },
  { value: 'BookOpen', label: 'Livro Aberto (BookOpen)' },
  { value: 'ShoppingBag', label: 'Produto (ShoppingBag)' },
  { value: 'Smartphone', label: 'Digital/Mobile (Smartphone)' },
  { value: 'Video', label: 'Vídeo (Video)' },
  { value: 'Headphones', label: 'Áudio (Headphones)' },
  { value: 'FileText', label: 'Documento (FileText)' },
  { value: 'PlayCircle', label: 'Play (PlayCircle)' },
  { value: 'Star', label: 'Estrela (Star)' },
  { value: 'Heart', label: 'Coração (Heart)' },
];

export const FormatEdit = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: 'acervo/formats',
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Nome da Formato"
          name="label"
          rules={[{ required: true, message: 'Por favor, insira o nome da categoria' }]}
        >
          <Input placeholder="Ex: Liderança" />
        </Form.Item>

        <Form.Item
          label="Slug"
          name="slug"
          rules={[
            { required: true, message: 'Por favor, insira o slug' },
            { pattern: /^[a-z0-9-]+$/, message: 'Use apenas letras minúsculas, números e hífens' }
          ]}
          extra="URL amigável (ex: lideranca)"
        >
          <Input placeholder="lideranca"  onBlur={(e) => {
            const val = e.target.value;
            if (val) {
              const formatted = val
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "");
              formProps.form?.setFieldsValue({ slug: formatted });
            }
          }} />
        </Form.Item>

        <Form.Item
          label="Ícone"
          name="icon"
          initialValue="BookOpen"
          extra="Selecione o ícone que aparecerá no filtro do site"
        >
          <Select 
            options={ICON_OPTIONS}
            placeholder="Selecione um ícone..."
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
