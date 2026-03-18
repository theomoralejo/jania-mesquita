import {
  Edit,
  useForm,
} from '@refinedev/antd';
import { Form, Input } from 'antd';

export const AcervoCategoryEdit = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: 'acervo/categories',
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Nome da Categoria"
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
      </Form>
    </Edit>
  );
};
