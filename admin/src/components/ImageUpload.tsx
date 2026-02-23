import { useState } from 'react';
import { Upload, Button, message, Image, Modal, Row, Col, Spin } from 'antd';
import { UploadOutlined, DeleteOutlined, PictureOutlined } from '@ant-design/icons';
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
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);

  // Se value for uma URL absoluta (http) ou caminho relativo (/uploads/...), mantenha o value
  // Quando exibimos a imagem, usamos `displayUrl` que garante que caminhos relativos vindos da API
  // sejam prefixed com a origem da API (ex: http://localhost:3000)
  const apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/api\/?$/, '');
  const displayUrl = imageUrl && imageUrl.startsWith('/uploads') ? `${apiBase}${imageUrl}` : imageUrl;

  const apiBaseLocal = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

  const fetchGallery = async () => {
    setGalleryLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${apiBaseLocal}/admin/galeria/fotos?_start=0&_end=100`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGalleryItems(res.data || []);
    } catch (err) {
      console.error('Erro ao carregar galeria:', err);
      message.error('Não foi possível carregar a galeria. Faça login e tente novamente.');
    } finally {
      setGalleryLoading(false);
    }
  };

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

  const openGallery = async () => {
    setGalleryVisible(true);
    await fetchGallery();
  };

  const selectFromGallery = (item: any) => {
    const src = item.src;
    setImageUrl(src);
    onChange?.(src);
    setGalleryVisible(false);
    message.success('Imagem selecionada da galeria');
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

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />} loading={loading}>
            {imageUrl ? 'Alterar Imagem' : 'Fazer Upload de Imagem'}
          </Button>
        </Upload>

        <Button icon={<PictureOutlined />} onClick={openGallery}>
          Selecionar da Galeria
        </Button>
      </div>

      {imageUrl && (
        <div style={{ fontSize: '12px', color: '#888' }}>
          URL: {imageUrl}
        </div>
      )}

      <Modal
        title="Biblioteca de mídia"
        open={galleryVisible}
        onCancel={() => setGalleryVisible(false)}
        footer={null}
        width={800}
      >
        {galleryLoading ? (
          <div style={{ textAlign: 'center', padding: 40 }}><Spin /></div>
        ) : (
          <Row gutter={[12, 12]}>
            {galleryItems.length === 0 && (
              <Col span={24} style={{ textAlign: 'center', color: '#666' }}>
                Nenhuma imagem na galeria — faça upload em <strong>Galeria → Criar</strong>.
              </Col>
            )}

            {galleryItems.map((item) => (
              <Col key={item.id} xs={12} sm={8} md={6} style={{ textAlign: 'center' }}>
                <div style={{ cursor: 'pointer' }} onClick={() => selectFromGallery(item)}>
                  <Image
                    src={item.src && item.src.startsWith('/uploads') ? apiBase + item.src : item.src}
                    alt={item.alt || item.title}
                    width={150}
                    height={100}
                    style={{ objectFit: 'cover', borderRadius: 6 }}
                    preview={false}
                  />
                  <div style={{ marginTop: 6, fontSize: 12 }}>{item.title || item.alt || item.id}</div>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Modal>
    </div>
  );
};
