import { useState, useEffect } from 'react';
import { Card, Row, Col, Image, message, Button, Spin, Typography } from 'antd';
import { DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import { axiosInstance } from '../providers/authProvider';

const { Title, Text } = Typography;

interface UploadedImage {
    url: string;
    filename: string;
    folder: string;
}

export const BibliotecaMidia = () => {
    const [images, setImages] = useState<UploadedImage[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchImages = async () => {
        try {
            setLoading(true);
            const { data } = await axiosInstance.get('/upload/list');
            setImages(data || []);
        } catch (error) {
            console.error('Erro ao buscar imagens:', error);
            message.error('Erro ao buscar imagens do servidor.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleDelete = async (filename: string, folder: string) => {
        try {
            await axiosInstance.delete('/upload/image', {
                data: { filepath: `/uploads/${folder}/${filename}` },
            });
            message.success('Imagem deletada com sucesso!');
            fetchImages();
        } catch (error) {
            console.error('Erro ao deletar imagem:', error);
            message.error('Erro ao deletar imagem. Talvez o arquivo seja protegido (ex: arquivos padrão do site).');
        }
    };

    const handleCopyUrl = (url: string) => {
        const apiBase = (import.meta.env.VITE_API_URL || 'https://janiamesquita.com.br/api').replace(/\/api\/?$/, '');
        const fullUrl = `${apiBase}${url}`;
        navigator.clipboard.writeText(fullUrl);
        message.success('URL copiada para a área de transferência!');
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: 32 }}>
                <Title level={2} style={{ margin: 0, color: '#42331C', fontWeight: 700 }}>
                    Biblioteca de Mídia
                </Title>
                <Text style={{ color: '#78877E', fontSize: 16 }}>
                    Todos os arquivos físicos armazenados no servidor ({images.length} arquivos)
                </Text>
            </div>

            <Row gutter={[16, 16]}>
                {images.map((img) => {
                    const apiBase = (import.meta.env.VITE_API_URL || 'https://janiamesquita.com.br/api').replace(/\/api\/?$/, '');
                    const src = img.url.startsWith('http') ? img.url : `${apiBase}${img.url}`;

                    const isVideo = /\.(mp4|webm|mov|avi|mkv)$/i.test(img.filename);

                    return (
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} key={`${img.folder}-${img.filename}`}>
                            <Card
                                hoverable
                                cover={
                                    <div style={{ height: '150px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
                                        {isVideo ? (
                                            <video
                                                src={src}
                                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                                muted
                                                loop
                                                playsInline
                                                controls={false}
                                                onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                                                onMouseOut={(e) => {
                                                    const video = e.target as HTMLVideoElement;
                                                    video.pause();
                                                    video.currentTime = 0;
                                                }}
                                            />
                                        ) : (
                                            <Image
                                                src={src}
                                                alt={img.filename}
                                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                                fallback="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23ddd'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='%23999' font-size='10'%3ESem imagem%3C/text%3E%3C/svg%3E"
                                            />
                                        )}
                                    </div>
                                }
                                actions={[
                                    <Button type="text" icon={<CopyOutlined />} onClick={() => handleCopyUrl(img.url)} title="Copiar URL" />,
                                    <Button
                                        type="text"
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => {
                                            if (window.confirm('Tem certeza que deseja deletar este arquivo permanentemente?')) {
                                                handleDelete(img.filename, img.folder);
                                            }
                                        }}
                                        title="Deletar permanentemente"
                                    />
                                ]}
                            >
                                <Card.Meta
                                    title={<Text ellipsis style={{ fontSize: '13px' }}>{img.filename}</Text>}
                                    description={<Text type="secondary" style={{ fontSize: '11px' }}>Pasta: {img.folder}</Text>}
                                />
                            </Card>
                        </Col>
                    );
                })}
            </Row>

            {images.length === 0 && (
                <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#fafafa', borderRadius: '8px', border: '1px dashed #ddd' }}>
                    <Text type="secondary">Nenhuma imagem encontrada no servidor.</Text>
                </div>
            )}
        </div>
    );
};
