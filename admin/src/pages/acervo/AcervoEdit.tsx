import {
  Edit,
  useForm,
  useSelect,
} from '@refinedev/antd';
import { Form, Input, Select, Switch, InputNumber, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ImageUpload } from '../../components/ImageUpload';
import { RichTextEditor } from '../../components/RichTextEditor';

export const AcervoEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({
    resource: 'acervo',
  });

  const { selectProps: categorySelectProps } = useSelect({
    resource: 'acervo/categories',
    optionLabel: 'label',
    optionValue: 'id',
    defaultValue: queryResult?.data?.data?.categoryId,
  });

  const { selectProps: formatSelectProps } = useSelect({
    resource: 'acervo/formats',
    optionLabel: 'label',
    optionValue: 'id',
    defaultValue: queryResult?.data?.data?.formatId,
  });

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
          extra="URL amigável (ex: meu-produto)"
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
          label="Formato"
          name="formatId"
          rules={[{ required: true, message: 'Por favor, selecione um formato' }]}
        >
          <Select {...formatSelectProps} />
        </Form.Item>

        <Form.Item
          label="Descrição Resumida"
          name="description"
          rules={[{ required: true, message: 'Por favor, insira a descrição' }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Conteúdo Completo"
          name="fullContent"
          extra="Opcional - Descrição detalhada do produto"
        >
          <RichTextEditor placeholder="Digite a descrição completa do produto..." />
        </Form.Item>

        <Form.Item
          label="Imagem do Produto"
          name="image"
          rules={[{ required: true, message: 'Por favor, faça upload da imagem' }]}
        >
          <ImageUpload folder="acervo" />
        </Form.Item>

        <Form.Item
          label="Preço"
          name="price"
          rules={[{ required: true, message: 'Por favor, insira o preço' }]}
        >
          <Input placeholder="R$ 89,90" />
        </Form.Item>

        <Form.Item
          label="Preço Original (Cortado)"
          name="originalPrice"
          extra="Opcional - Preço antes do desconto (Ex: De R$ 119,90)"
        >
          <Input placeholder="R$ 119,90" />
        </Form.Item>

        <Form.Item
          label="Preço Parcelado"
          name="installmentsPrice"
          extra="Opcional - Ex: 12x de R$ 9,90"
        >
          <Input placeholder="12x de R$ 9,90" />
        </Form.Item>

        <Form.Item
          label="Link Hotmart"
          name="hotmartLink"
          extra="Opcional - URL de compra no Hotmart"
        >
          <Input placeholder="https://pay.hotmart.com/..." />
        </Form.Item>

        {/* SECÇÕES DINÂMICAS E BADGES */}
        <div style={{ padding: '24px', backgroundColor: '#f9f9f9', borderRadius: '8px', marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '16px' }}>Textos de Alta Conversão (LP)</h3>
          
          <Space align="start" style={{ width: '100%' }}>
            <Form.Item label="Ativar Badge 1" name="badge1Enabled" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="Texto do Badge 1" name="badge1Text" style={{ flexGrow: 1, minWidth: '300px' }}>
              <Input />
            </Form.Item>
          </Space>

          <Space align="start" style={{ width: '100%' }}>
            <Form.Item label="Ativar Badge 2" name="badge2Enabled" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="Texto do Badge 2" name="badge2Text" style={{ flexGrow: 1, minWidth: '300px' }}>
              <Input />
            </Form.Item>
          </Space>

          <Space align="start" style={{ width: '100%' }}>
            <Form.Item label="Ativar Título da Descrição" name="descriptionTitleEnabled" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="Título da Descrição" name="descriptionTitleText" style={{ flexGrow: 1, minWidth: '300px' }}>
              <Input />
            </Form.Item>
          </Space>

          <Form.Item label="Texto Bestseller" name="bestsellerText">
            <Input />
          </Form.Item>
          
          <Form.Item label="Texto Leitores (Social Proof)" name="readersText">
            <Input />
          </Form.Item>
        </div>

        <Form.Item label="Features (Itens do Pricebox)">
          <Form.List name="features">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'text']}
                      rules={[{ required: true, message: 'Insira o texto da feature' }]}
                      style={{ marginBottom: 0, flex: 1 }}
                    >
                      <Input placeholder="Ex: 320 páginas de conteúdo prático" style={{ width: '400px' }} />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Adicionar Feature
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
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
