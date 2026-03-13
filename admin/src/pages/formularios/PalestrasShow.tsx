import {
    Show,
    TextField,
    EmailField,
    DateField,
} from '@refinedev/antd';
import { Typography, Tag, Space, Button } from 'antd';
import { useShow, useUpdate } from '@refinedev/core';
import { useParams } from 'react-router-dom';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export const PalestrasShow = () => {
    const { id } = useParams();
    const { queryResult } = useShow({
        resource: 'formularios/palestras',
        id,
    });
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const { mutate: updateRead } = useUpdate();

    const handleMarkAsRead = () => {
        if (record?.id) {
            updateRead({
                resource: 'formularios/palestras',
                id: record.id,
                values: { read: true },
            });
        }
    };

    return (
        <Show
            isLoading={isLoading}
            headerButtons={({ defaultButtons }) => (
                <>
                    {!record?.read && (
                        <Button
                            type="primary"
                            icon={<CheckCircleOutlined />}
                            onClick={handleMarkAsRead}
                        >
                            Marcar como Lido
                        </Button>
                    )}
                    {defaultButtons}
                </>
            )}
        >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                    <Title level={5}>Status</Title>
                    {record?.read ? (
                        <Tag color="green">Lido</Tag>
                    ) : (
                        <Tag color="orange">Não lido</Tag>
                    )}
                </div>

                <div>
                    <Title level={5}>Nome</Title>
                    <TextField value={record?.name} />
                </div>

                <div>
                    <Title level={5}>Email</Title>
                    <EmailField value={record?.email} />
                </div>

                <div>
                    <Title level={5}>Telefone</Title>
                    <TextField value={record?.phone} />
                </div>

                <div>
                    <Title level={5}>Empresa</Title>
                    <TextField value={record?.company} />
                </div>

                {record?.eventType && (
                    <div>
                        <Title level={5}>Tipo de Evento</Title>
                        <TextField value={record?.eventType} />
                    </div>
                )}

                {record?.attendees && (
                    <div>
                        <Title level={5}>Público Estimado</Title>
                        <TextField value={record?.attendees} />
                    </div>
                )}

                {record?.date && (
                    <div>
                        <Title level={5}>Data Prevista</Title>
                        <TextField value={record?.date} />
                    </div>
                )}

                {record?.message && (
                    <div>
                        <Title level={5}>Mensagem/Detalhes</Title>
                        <Text style={{ whiteSpace: 'pre-wrap' }}>{record?.message}</Text>
                    </div>
                )}

                <div>
                    <Title level={5}>Data de Envio</Title>
                    <DateField value={record?.createdAt} format="DD/MM/YYYY [às] HH:mm" />
                </div>
            </Space>
        </Show>
    );
};
