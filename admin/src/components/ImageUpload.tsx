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

  // Se value for uma URL absoluta (http) ou caminho relativo (/uploads/...), mantenha o value
  // Quando exibimos a imagem, usamos `displayUrl` que garante que caminhos relativos vindos da API
  // sejam prefixed com a origem da API (ex: http://localhost:3000)
  const apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/api\/?$/, '');
  const displayUrl = imageUrl && imageUrl.startsWith('/uploads') ? `${apiBase}${imageUrl}` : imageUrl;

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
        const apiBaseLocal = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
        const response = await axios.post(
          `${apiBaseLocal}/upload/image`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const url = response.data.url; // geralmente '/uploads/…'
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
      const apiBaseLocal = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
      // backend espera campo `filepath` contendo o caminho (ex: /uploads/galeria/xxx.jpg)
      await axios.delete(`${apiBaseLocal}/upload/image`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { filepath: imageUrl },
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
            src={displayUrl}
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
