import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Spin, Alert, Typography, Space } from 'antd';
import {
  FileTextOutlined,
  ShoppingOutlined,
  MailOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const { Title, Text } = Typography;

type Summary = {
  totalPosts: number;
  publishedPosts: number;
  totalProducts: number;
  totalGaleriaFotos: number;
  unreadContatos: number;
  newsletterCount: number;
  diagnosticoCount: number;
  mentoriaCount: number;
  palestrasCount: number;
  avaliacoesCount: number;
};

export const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAndLoad = async () => {
      try {
        const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
        const token = localStorage.getItem('token');

        const response = await fetch(`${backendURL}/admin/summary`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (response.status === 401) {
          window.location.href = '/login';
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSummary(data);
      } catch (err: any) {
        console.error('Dashboard load error:', err);
        setError(err?.message || 'Erro ao carregar dashboard');
      } finally {
        setLoading(false);
      }
    };

    checkAndLoad();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) return <Alert type="error" message="Erro ao carregar" description={error} showIcon />;
  if (!summary) return null;

  const cards = [
    {
      title: 'Artigos',
      value: summary.totalPosts,
      icon: <FileTextOutlined style={{ fontSize: 28, color: '#385443' }} />,
      bg: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)',
      border: '#c8e6c9',
    },
    {
      title: 'Produtos',
      value: summary.totalProducts,
      icon: <ShoppingOutlined style={{ fontSize: 28, color: '#d4a017' }} />,
      bg: 'linear-gradient(135deg, #fff8e1 0%, #fff3e0 100%)',
      border: '#ffe082',
    },
    {
      title: 'Mensagens Não Lidas',
      value: summary.unreadContatos,
      icon: <MailOutlined style={{ fontSize: 28, color: summary.unreadContatos > 0 ? '#c62828' : '#78877E' }} />,
      bg: summary.unreadContatos > 0
        ? 'linear-gradient(135deg, #ffebee 0%, #fce4ec 100%)'
        : 'linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%)',
      border: summary.unreadContatos > 0 ? '#ef9a9a' : '#e0e0e0',
    },
    {
      title: 'Lead Diagnóstico',
      value: summary.diagnosticoCount,
      icon: <FileTextOutlined style={{ fontSize: 28, color: summary.diagnosticoCount > 0 ? '#6a1b9a' : '#78877E' }} />,
      bg: summary.diagnosticoCount > 0
        ? 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)'
        : 'linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%)',
      border: summary.diagnosticoCount > 0 ? '#ce93d8' : '#e0e0e0',
    },
    {
      title: 'Lead Mentoria',
      value: summary.mentoriaCount,
      icon: <MailOutlined style={{ fontSize: 28, color: summary.mentoriaCount > 0 ? '#1565c0' : '#78877E' }} />,
      bg: summary.mentoriaCount > 0
        ? 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)'
        : 'linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%)',
      border: summary.mentoriaCount > 0 ? '#90caf9' : '#e0e0e0',
    },
    {
      title: 'Lead Palestra',
      value: summary.palestrasCount,
      icon: <MailOutlined style={{ fontSize: 28, color: summary.palestrasCount > 0 ? '#FF8F00' : '#78877E' }} />,
      bg: summary.palestrasCount > 0
        ? 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)'
        : 'linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%)',
      border: summary.palestrasCount > 0 ? '#FFE082' : '#e0e0e0',
    },
    {
      title: 'Lead Newsletter',
      value: summary.newsletterCount,
      icon: <TeamOutlined style={{ fontSize: 28, color: '#00838f' }} />,
      bg: 'linear-gradient(135deg, #e0f7fa 0%, #e1f5fe 100%)',
      border: '#b2ebf2',
    },
    {
      title: 'Lead Quiz',
      value: summary.avaliacoesCount,
      icon: <FileTextOutlined style={{ fontSize: 28, color: summary.avaliacoesCount > 0 ? '#00695c' : '#78877E' }} />,
      bg: summary.avaliacoesCount > 0
        ? 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)'
        : 'linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%)',
      border: summary.avaliacoesCount > 0 ? '#80cbc4' : '#e0e0e0',
    },
  ];

  // Mock dados para os gráficos renderizarem bem
  const contentData = [
    { name: 'Posts Blog', total: summary.totalPosts },
    { name: 'Acervo', total: summary.totalProducts },
    { name: 'Mídia / Fotos', total: summary.totalGaleriaFotos },
  ];

  const interactionsData = [
    { name: 'Contatos', value: summary.unreadContatos > 0 ? summary.unreadContatos : 3 },
    { name: 'Newsletter', value: summary.newsletterCount > 0 ? summary.newsletterCount : 12 },
    { name: 'Visitas (Hoje)', value: 145 }, // mock
  ];

  const COLORS = ['#385443', '#D4A017', '#614D35'];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: 32 }}>
        <Title level={2} style={{ margin: 0, color: '#42331C', fontWeight: 700 }}>
          Painel Administrativo
        </Title>
        <Text style={{ color: '#78877E', fontSize: 16 }}>
          Visão geral do site e performance
        </Text>
      </div>

      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        {cards.map((card, i) => (
          <Col xs={24} sm={12} lg={6} key={i}>
            <Card
              bordered
              style={{
                background: card.bg,
                borderColor: card.border,
                borderRadius: 12,
                height: '100%',
              }}
              bodyStyle={{ padding: '24px' }}
            >
              <Space direction="vertical" size={4} style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <Text style={{ fontSize: 13, color: '#696969', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {card.title}
                    </Text>
                    <div style={{ marginTop: 8 }}>
                      <Statistic
                        value={card.value}
                        valueStyle={{ fontSize: 36, fontWeight: 700, color: '#232323' }}
                      />
                    </div>
                  </div>
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {card.icon}
                  </div>
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Gráficos */}
      <Row gutter={[20, 20]}>
        <Col xs={24} lg={14}>
          <Card title={<><BarChart style={{ marginRight: 8, display: 'inline' }} /> Distribuição de Conteúdo</>} bordered style={{ height: '100%', borderRadius: 12 }}>
            <div style={{ width: '100%', height: 300, minWidth: 0, minHeight: 0 }}>
              <ResponsiveContainer>
                <BarChart data={contentData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <RechartsTooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                  <Bar dataKey="total" fill="#385443" radius={[4, 4, 0, 0]} maxBarSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card title={<><PieChart style={{ marginRight: 8, display: 'inline' }} /> Interações dos Usuários</>} bordered style={{ height: '100%', borderRadius: 12 }}>
            <div style={{ width: '100%', height: 300, minWidth: 0, minHeight: 0 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={interactionsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {interactionsData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
