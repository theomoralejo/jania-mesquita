import { List, useTable } from '@refinedev/antd';
import { Table, Space, Button, Tag, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, LinkOutlined } from '@ant-design/icons';
import { useDelete, useNavigation } from '@refinedev/core';

export const MidiaList = () => {
    const { tableProps } = useTable({
        resource: 'midias',
        syncWithLocation: true,
    });

    const { mutate: deleteOne } = useDelete();
    const { edit, create } = useNavigation();

    const typeColors: Record<string, string> = {
        TV: 'blue',
        Podcast: 'purple',
        Revista: 'gold',
        Artigo: 'green',
        Entrevista: 'cyan',
    };

    return (
        <List
            title="Mídias"
            createButtonProps={{ onClick: () => create('midias') }}
        >
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    title="Tipo"
                    dataIndex="type"
                    render={(type: string) => (
                        <Tag color={typeColors[type] || 'default'}>{type}</Tag>
                    )}
                />
                <Table.Column title="Veículo" dataIndex="outlet" />
                <Table.Column title="Título" dataIndex="title" ellipsis />
                <Table.Column title="Data" dataIndex="date" width={120} />
                <Table.Column
                    title="Link"
                    dataIndex="link"
                    render={(link: string) => (
                        <Tooltip title={link}>
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                <LinkOutlined /> Abrir
                            </a>
                        </Tooltip>
                    )}
                />
                <Table.Column title="Ordem" dataIndex="order" width={80} />
                <Table.Column
                    title="Ações"
                    render={(_, record: any) => (
                        <Space>
                            <Button
                                type="text"
                                icon={<EditOutlined />}
                                onClick={() => edit('midias', record.id)}
                            />
                            <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() =>
                                    deleteOne({
                                        resource: 'midias',
                                        id: record.id,
                                    })
                                }
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
