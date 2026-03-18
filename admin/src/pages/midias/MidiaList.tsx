import { List, useTable } from '@refinedev/antd';
import { Space, Button, Tag, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, LinkOutlined } from '@ant-design/icons';
import { useDelete, useNavigation } from '@refinedev/core';
import EnhancedTable, { EnhancedColumn } from '../../components/EnhancedTable';

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

    const columns: EnhancedColumn[] = [
        {
            key: 'type',
            dataIndex: 'type',
            title: 'Tipo',
            render: (type: string) => (
                <Tag color={typeColors[type] || 'default'}>{type}</Tag>
            ),
        },
        {
            key: 'outlet',
            dataIndex: 'outlet',
            title: 'Veículo',
            editable: true,
        },
        {
            key: 'title',
            dataIndex: 'title',
            title: 'Título',
            ellipsis: true,
            editable: true,
        },
        {
            key: 'date',
            dataIndex: 'date',
            title: 'Data',
            width: 120,
        },
        {
            key: 'link',
            dataIndex: 'link',
            title: 'Link',
            render: (link: string) => (
                <Tooltip title={link}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        <LinkOutlined /> Abrir
                    </a>
                </Tooltip>
            ),
        },
    ];

    return (
        <List
            title="Mídias"
            createButtonProps={{ onClick: () => create('midias') }}
        >
            <EnhancedTable
                dataSource={tableProps.dataSource || []}
                columns={columns}
                loading={tableProps.loading}
                resource="midias"
                reorderEnabled={true}
                pagination={tableProps.pagination}
                onChange={tableProps.onChange}
                actionColumn={(record: any) => (
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
        </List>
    );
};
