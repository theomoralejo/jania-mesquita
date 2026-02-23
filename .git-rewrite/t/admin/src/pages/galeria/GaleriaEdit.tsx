import { useState, useEffect } from 'react';
import { Edit, useForm } from '@refinedev/antd';
import { Form, Input, InputNumber, Image } from 'antd';
import { ImageUpload } from '../../components/ImageUpload';

export const GaleriaEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({
    resource: 'galeria/fotos',
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Imagem"
          name="src"
          rules={[{ required: true, message: 'Por favor, faça upload da imagem' }]}
        >
          <ImageUpload folder="galeria" />
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
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
