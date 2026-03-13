import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, message, Typography, Divider, Spin } from 'antd';
import { SaveOutlined, CodeOutlined } from '@ant-design/icons';
import { axiosInstance } from '../providers/authProvider';

const { Title, Text } = Typography;
const { TextArea } = Input;

export const SettingsPage: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchConfigs = async () => {
            try {
                setLoading(true);
                // GET /api/admin/config
                const { data } = await axiosInstance.get('/admin/config');

                // Ex: data is [{ key: 'scripts', value: { head: '...', body: '...' } }]
                const scriptsConfig = data?.find((c: any) => c.key === 'scripts');
                if (scriptsConfig && scriptsConfig.value) {
                    form.setFieldsValue({
                        headScripts: scriptsConfig.value.head || '',
                        bodyScripts: scriptsConfig.value.body || '',
                    });
                }
            } catch (err) {
                console.error('Erro ao buscar configs:', err);
                message.error('Não foi possível carregar as configurações');
            } finally {
                setLoading(false);
            }
        };
        fetchConfigs();
    }, [form]);

    const onFinish = async (values: any) => {
        try {
            setSaving(true);
            const payload = {
                head: values.headScripts || '',
                body: values.bodyScripts || '',
            };

            await axiosInstance.put('/admin/config/scripts', { value: payload });
            message.success('Configurações de script atualizadas com sucesso!');
        } catch (err) {
            console.error('Erro ao salvar:', err);
            message.error('Não foi possível salvar as configurações');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '100px' }}><Spin size="large" /></div>;
    }

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: 32 }}>
                <Title level={2} style={{ margin: 0, color: '#42331C', fontWeight: 700 }}>
                    Configurações do Site
                </Title>
                <Text style={{ color: '#78877E', fontSize: 16 }}>
                    Ajustes avançados, rastreamento e tags
                </Text>
            </div>

            <Card
                title={<><CodeOutlined /> Scripts de Rastreamento (Pixels e Analytics)</>}
                bordered
                style={{ maxWidth: 800, borderRadius: 12 }}
            >
                <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
                    Insira códigos do Facebook Pixel, Google Analytics, Tag Manager ou qualquer script de terceiros.
                    Eles serão injetados diretamente no código-fonte do site.
                </Text>

                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="headScripts"
                        label={<strong>Scripts no &lt;head&gt;</strong>}
                        tooltip="Código inserido antes do fechamento da tag </head>. Recomendado para Google Analytics, Tag Manager e verificação de domínio."
                    >
                        <TextArea
                            rows={8}
                            placeholder="<!-- Cole seu script aqui -->&#10;<script>&#10;...&#10;</script>"
                            style={{ fontFamily: 'monospace', fontSize: 13, backgroundColor: '#f9f9f9' }}
                        />
                    </Form.Item>

                    <Divider />

                    <Form.Item
                        name="bodyScripts"
                        label={<strong>Scripts no &lt;body&gt;</strong>}
                        tooltip="Código inserido logo após a abertura da tag <body>. Recomendado para o GTM (noscript) ou scripts pesados."
                    >
                        <TextArea
                            rows={8}
                            placeholder="<!-- Cole seu script aqui -->&#10;<noscript>&#10;...&#10;</noscript>"
                            style={{ fontFamily: 'monospace', fontSize: 13, backgroundColor: '#f9f9f9' }}
                        />
                    </Form.Item>

                    <Form.Item style={{ marginTop: 32, marginBottom: 0 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<SaveOutlined />}
                            loading={saving}
                            style={{ padding: '0 32px', height: 40 }}
                        >
                            Salvar Configurações
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};
