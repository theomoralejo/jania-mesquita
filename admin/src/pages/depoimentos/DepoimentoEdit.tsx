import {
  Edit,
  useForm,
} from '@refinedev/antd';
import { Form, Input, Switch, InputNumber } from 'antd';
import { ImageUpload } from '../../components/ImageUpload';

export const DepoimentoEdit = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: 'depoimentos',
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Nome"
          name="name"
          rules={[{ required: true, message: 'Por favor, insira o nome' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Cargo/Função"
          name="role"
          rules={[{ required: true, message: 'Por favor, insira o cargo' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Evento/Contexto"
          name="event"
          rules={[{ required: true, message: 'Por favor, insira o evento' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Depoimento"
          name="quote"
          rules={[{ required: true, message: 'Por favor, insira o depoimento' }]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>

        <Form.Item
          label="Foto"
          name="image"
        >
          <ImageUpload folder="depoimentos" />
        </Form.Item>

        <Form.Item
          label="Publicado"
          name="published"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Ordem de Exibição"
          name="order"
          rules={[{ required: true, message: 'Por favor, insira a ordem' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
