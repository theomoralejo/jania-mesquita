import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Spin, Progress, Alert } from 'antd';

type Summary = {
  totalPosts: number;
  publishedPosts: number;
  totalProducts: number;
  totalGaleriaFotos: number;
  unreadContatos: number;
  newsletterCount: number;
};

export const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAndLoad = async () => {
      try {
        // Create a custom request to the full /api/admin/summary endpoint
        // The axiosInstance already has /api/admin as base, so request /summary directly
        const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
        const token = localStorage.getItem('token');
        
        const response = await fetch(`${backendURL}/admin/summary`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        
        if (response.status === 401) {
          // Redirect to login - this will be handled by authProvider
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

  if (loading) return <Spin />;
  if (error) return <Alert type="error" message="Erro" description={error} />;
  if (!summary) return null;

  const max = Math.max(
    summary.totalPosts,
    summary.totalProducts,
    summary.totalGaleriaFotos,
    summary.unreadContatos,
    summary.newsletterCount,
    1,
  );

  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Resumo geral — números reais do sistema</p>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Posts (total)" value={summary.totalPosts} />
            <Progress percent={Math.round((summary.totalPosts / max) * 100)} strokeColor="#385443" />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic title="Posts publicados" value={summary.publishedPosts} />
            <Progress percent={Math.round((summary.publishedPosts / max) * 100)} strokeColor="#614D35" />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic title="Produtos (acervo)" value={summary.totalProducts} />
            <Progress percent={Math.round((summary.totalProducts / max) * 100)} strokeColor="#D4A017" />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Fotos (galeria)" value={summary.totalGaleriaFotos} />
            <Progress percent={Math.round((summary.totalGaleriaFotos / max) * 100)} />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic title="Mensagens não lidas" value={summary.unreadContatos} />
            <Progress percent={Math.round((summary.unreadContatos / max) * 100)} status={summary.unreadContatos > 0 ? 'exception' : 'normal'} />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic title="Inscritos newsletter" value={summary.newsletterCount} />
            <Progress percent={Math.round((summary.newsletterCount / max) * 100)} />
          </Card>
        </Col>
      </Row>

      <div style={{ marginTop: 24 }}>
        <Card>
          <h3>Detalhes</h3>
          <ul>
            <li>Posts: {summary.totalPosts} (publicados: {summary.publishedPosts})</li>
            <li>Produtos no acervo: {summary.totalProducts}</li>
            <li>Fotos na galeria: {summary.totalGaleriaFotos}</li>
            <li>Mensagens não lidas: {summary.unreadContatos}</li>
            <li>Inscritos na newsletter: {summary.newsletterCount}</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
