import { useState } from 'react';
import { Upload, Button, message, Image } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import axios from 'axios';

interface ImageUploadProps {
  value?: string;
  onChange?: (url: string) => void;
  folder?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, folder = 'general' }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(value || '');

  const uploadProps: UploadProps = {
    name: 'image',
    accept: 'image/*',
    showUploadList: false,
    customRequest: async ({ file, onSuccess, onError }) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('image', file as File);
        formData.append('folder', folder);

        const token = localStorage.getItem('token');
        const response = await axios.post(
          'http://localhost:3000/api/upload/image',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const url = response.data.url;
        setImageUrl(url);
        onChange?.(url);
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

  const handleDelete = async () => {
    if (!imageUrl) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:3000/api/upload/image', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { url: imageUrl },
      });

      setImageUrl('');
      onChange?.('');
      message.success('Imagem removida com sucesso!');
    } catch (error: any) {
      console.error('Erro ao deletar imagem:', error);
      message.error('Erro ao remover imagem');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {imageUrl && (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Image
            src={imageUrl}
            alt="Preview"
            style={{
              maxWidth: '300px',
              maxHeight: '300px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
            preview={{
              mask: 'Ver imagem',
            }}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={handleDelete}
            style={{ marginTop: '8px' }}
          >
            Remover Imagem
          </Button>
        </div>
      )}

      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />} loading={loading}>
          {imageUrl ? 'Alterar Imagem' : 'Fazer Upload de Imagem'}
        </Button>
      </Upload>

      {imageUrl && (
        <div style={{ fontSize: '12px', color: '#888' }}>
          URL: {imageUrl}
        </div>
      )}
    </div>
  );
};
