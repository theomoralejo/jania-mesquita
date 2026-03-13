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

const apiBaseLocal = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const apiBase = apiBaseLocal.replace(/\/api\/?$/, '');

function resolveAdminImageUrl(url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('/uploads')) return `${apiBase}${url}`;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return url;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, folder = 'general' }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(value || '');
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);

  const displayUrl = resolveAdminImageUrl(imageUrl);

  const fetchGallery = async () => {
    setGalleryLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${apiBaseLocal}/upload/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGalleryItems(res.data || []);
    } catch (err) {
      console.error('Erro ao carregar galeria:', err);
      message.error('Não foi possível carregar a galeria.');
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
      await axios.delete(`${apiBaseLocal}/upload/image`, {
        headers: { Authorization: `Bearer ${token}` },
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

  const selectFromGallery = (url: string) => {
    setImageUrl(url);
    onChange?.(url);
    setGalleryVisible(false);
    message.success('Imagem selecionada');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {imageUrl && (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Image
            src={displayUrl}
            alt="Preview"
            style={{ maxWidth: '300px', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px' }}
            preview={{ mask: 'Ver imagem' }}
            fallback="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23ddd'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='%23999' font-size='12'%3ESem imagem%3C/text%3E%3C/svg%3E"
          />
          <div>
            <Button danger icon={<DeleteOutlined />} onClick={handleDelete} style={{ marginTop: '8px' }}>
              Remover Imagem
            </Button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />} loading={loading}>
            {imageUrl ? 'Alterar Imagem' : 'Fazer Upload de Imagem'}
          </Button>
        </Upload>

        <Button icon={<PictureOutlined />} onClick={openGallery}>
          Selecionar do Servidor
        </Button>
      </div>

      {imageUrl && (
        <div style={{ fontSize: '12px', color: '#888' }}>
          URL salva: {imageUrl}
        </div>
      )}

      <Modal
        title="Imagens enviadas ao servidor"
        open={galleryVisible}
        onCancel={() => setGalleryVisible(false)}
        footer={null}
        width={800}
      >
        {galleryLoading ? (
          <div style={{ textAlign: 'center', padding: 40 }}><Spin /></div>
        ) : (
          <>
            {galleryItems.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#666', padding: 40 }}>
                Nenhuma imagem enviada ainda — use o botão <strong>"Fazer Upload de Imagem"</strong>.
              </div>
            ) : (
              <Row gutter={[12, 12]}>
                {galleryItems.map((item, idx) => (
                  <Col key={idx} xs={12} sm={8} md={6} style={{ textAlign: 'center' }}>
                    <div
                      style={{ cursor: 'pointer', border: '2px solid transparent', borderRadius: 8, padding: 4, transition: 'border-color 0.2s' }}
                      onClick={() => selectFromGallery(item.url)}
                      onMouseOver={e => (e.currentTarget.style.borderColor = '#385443')}
                      onMouseOut={e => (e.currentTarget.style.borderColor = 'transparent')}
                    >
                      <Image
                        src={`${apiBase}${item.url}`}
                        alt={item.filename}
                        width={150}
                        height={100}
                        style={{ objectFit: 'cover', borderRadius: 6 }}
                        preview={false}
                      />
                      <div style={{ marginTop: 6, fontSize: 11, color: '#666' }}>
                        {item.folder}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}
      </Modal>
    </div>
  );
};
