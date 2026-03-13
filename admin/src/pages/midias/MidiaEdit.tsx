import { Edit, useForm } from '@refinedev/antd';
import { Form, Input, InputNumber, Select } from 'antd';

export const MidiaEdit = () => {
    const { formProps, saveButtonProps } = useForm({
        resource: 'midias',
        action: 'edit',
    });

    return (
        <Edit saveButtonProps={saveButtonProps} title="Editar Mídia">
            <Form {...formProps} layout="vertical">
                <Form.Item label="Tipo" name="type" rules={[{ required: true }]}>
                    <Select>
                        <Select.Option value="TV">TV</Select.Option>
                        <Select.Option value="Podcast">Podcast</Select.Option>
                        <Select.Option value="Revista">Revista</Select.Option>
                        <Select.Option value="Artigo">Artigo</Select.Option>
                        <Select.Option value="Entrevista">Entrevista</Select.Option>
                        <Select.Option value="Jornal">Jornal</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Ícone" name="icon">
                    <Select>
                        <Select.Option value="Tv">Tv</Select.Option>
                        <Select.Option value="Mic">Mic (Podcast)</Select.Option>
                        <Select.Option value="BookOpen">BookOpen (Revista)</Select.Option>
                        <Select.Option value="FileText">FileText (Artigo)</Select.Option>
                        <Select.Option value="Newspaper">Newspaper (Jornal)</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Veículo / Outlet" name="outlet" rules={[{ required: true }]}>
                    <Input placeholder="Ex: Globo, Forbes, etc." />
                </Form.Item>
                <Form.Item label="Título" name="title" rules={[{ required: true }]}>
                    <Input placeholder="Título da aparição na mídia" />
                </Form.Item>
                <Form.Item label="Data" name="date" rules={[{ required: true }]}>
                    <Input placeholder="Ex: Janeiro 2026" />
                </Form.Item>
                <Form.Item label="Link Externo" name="link" rules={[{ required: true, type: 'url' }]}>
                    <Input placeholder="https://..." />
                </Form.Item>
                <Form.Item label="Ordem" name="order">
                    <InputNumber min={0} />
                </Form.Item>
            </Form>
        </Edit>
    );
};
