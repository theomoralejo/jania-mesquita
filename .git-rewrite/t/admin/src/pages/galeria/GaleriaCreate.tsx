import { useState } from 'react';
import { Create } from '@refinedev/antd';
import { Form, Input, InputNumber, Upload, Button, message, Image } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { useCreate, useNavigation } from '@refinedev/core';
import { axiosInstance } from '../../providers/authProvider';

export const GaleriaCreate = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const { mutate } = useCreate();
  const { list } = useNavigation();

  const [form] = Form.useForm();

  const uploadProps: UploadProps = {
    name: 'image',
    accept: 'image/*',
    showUploadList: false,
    customRequest: async ({ file, onSuccess, onError }) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('image', file as File);
        formData.append('category', 'galeria');

        const response = await axiosInstance.post('/admin/upload/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const url = response.data.url;
        setImageUrl(url);
        form.setFieldValue('src', url);
        message.success('Imagem enviada com sucesso!');
        onSuccess?.(response.data);
      } catch (error: any) {
        console.error('Erro ao fazer upload:', error);
        message.error(error.response?.data?.error || 'Erro ao fazer upload da imagem');
        onError?.(error);
      } finally {
        setLoading(false);
      }
    },
  };

  const onFinish = (values: any) => {
    if (!imageUrl) {
      message.error('Por favor, faça upload de uma imagem');
      return;
    }

    mutate(
      {
        resource: 'galeria/fotos',
        values: {
          ...values,
          src: imageUrl,
        },
      },
      {
        onSuccess: () => {
          message.success('Foto adicionada com sucesso!');
          list('galeria/fotos');
        },
        onError: (error) => {
          message.error('Erro ao adicionar foto');
          console.error(error);
        },
      }
    );
  };

  return (
    <Create
      saveButtonProps={{
        onClick: () => form.submit(),
      }}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Upload da Foto" required>
          <Upload.Dragger {...uploadProps} disabled={loading}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Clique ou arraste a imagem para esta área
            </p>
            <p className="ant-upload-hint">
              Suporte para arquivos JPG, PNG, WebP
            </p>
          </Upload.Dragger>
        </Form.Item>

        {imageUrl && (
          <div style={{ marginBottom: '24px' }}>
            <Image
              src={imageUrl}
              alt="Preview"
              style={{
                maxWidth: '100%',
                maxHeight: '400px',
                objectFit: 'contain',
              }}
              preview={{
                mask: 'Ver imagem',
              }}
            />
          </div>
        )}

        <Form.Item name="src" hidden>
          <Input />
        </Form.Item>

        <Form.Item
          label="Título"
          name="title"
          rules={[{ required: true, message: 'Por favor, insira o título' }]}
        >
          <Input placeholder="Ex: Palestra sobre Liderança" />
        </Form.Item>

        <Form.Item
          label="Texto Alternativo (Alt)"
          name="alt"
          rules={[{ required: true, message: 'Por favor, insira o texto alternativo' }]}
          extra="Descrição da imagem para acessibilidade e SEO"
        >
          <Input placeholder="Ex: Jania apresentando palestra em hospital" />
        </Form.Item>

        <Form.Item
          label="Ordem de Exibição"
          name="order"
          rules={[{ required: true, message: 'Por favor, insira a ordem' }]}
          initialValue={0}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Create>
  );
};
