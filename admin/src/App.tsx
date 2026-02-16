import { Refine } from '@refinedev/core';
import {
  AuthPage,
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from '@refinedev/antd';
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6';
import dataProvider from '@refinedev/simple-rest';
import { App as AntdApp, ConfigProvider } from 'antd';
import ptBR from 'antd/locale/pt_BR';
import '@refinedev/antd/dist/reset.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { authProvider, axiosInstance } from './providers/authProvider';
import {
  DashboardOutlined,
  FileTextOutlined,
  ShoppingOutlined,
  CommentOutlined,
  FormOutlined,
  PictureOutlined,
  TrophyOutlined,
  SoundOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { PostList } from './pages/blog/PostList';
import { PostCreate } from './pages/blog/PostCreate';
import { PostEdit } from './pages/blog/PostEdit';
import { PostShow } from './pages/blog/PostShow';
import { CategoryList } from './pages/blog/CategoryList';
import { CategoryCreate } from './pages/blog/CategoryCreate';
import { CategoryEdit } from './pages/blog/CategoryEdit';
import { ContatoList } from './pages/formularios/ContatoList';
import { ContatoShow } from './pages/formularios/ContatoShow';
import { DiagnosticoList } from './pages/formularios/DiagnosticoList';
import { DiagnosticoShow } from './pages/formularios/DiagnosticoShow';
import { MentoriaList } from './pages/formularios/MentoriaList';
import { PalestrasList } from './pages/formularios/PalestrasList';
import { NewsletterList } from './pages/formularios/NewsletterList';
import { AvaliacaoList } from './pages/formularios/AvaliacaoList';
import { AvaliacaoShow } from './pages/formularios/AvaliacaoShow';
import { DepoimentoList } from './pages/depoimentos/DepoimentoList';
import { DepoimentoCreate } from './pages/depoimentos/DepoimentoCreate';
import { DepoimentoEdit } from './pages/depoimentos/DepoimentoEdit';
import { DepoimentoShow } from './pages/depoimentos/DepoimentoShow';
import { GaleriaList } from './pages/galeria/GaleriaList';
import { GaleriaCreate } from './pages/galeria/GaleriaCreate';
import { GaleriaEdit } from './pages/galeria/GaleriaEdit';
import { AcervoList } from './pages/acervo/AcervoList';
import { AcervoCreate } from './pages/acervo/AcervoCreate';
import { AcervoEdit } from './pages/acervo/AcervoEdit';
import { AcervoShow } from './pages/acervo/AcervoShow';

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider locale={ptBR}>
          <AntdApp>
            <Refine
              dataProvider={dataProvider('http://localhost:3000/api/admin', axiosInstance)}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              options={{
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: 'jania-admin',
                syncWithLocation: true,
                redirect: {
                  afterLogin: '/',
                  afterLogout: '/login',
                },
              }}
              resources={[
                {
                  name: 'dashboard',
                  list: '/',
                  meta: {
                    label: 'Dashboard',
                    icon: <DashboardOutlined />,
                  },
                },
                {
                  name: 'blog',
                  meta: {
                    label: 'Blog',
                    icon: <FileTextOutlined />,
                  },
                },
                {
                  name: 'blog/posts',
                  list: '/blog/posts',
                  create: '/blog/posts/create',
                  edit: '/blog/posts/edit/:id',
                  show: '/blog/posts/show/:id',
                  meta: {
                    parent: 'blog',
                    label: 'Posts',
                  },
                },
                {
                  name: 'blog/categories',
                  list: '/blog/categories',
                  create: '/blog/categories/create',
                  edit: '/blog/categories/edit/:id',
                  meta: {
                    parent: 'blog',
                    label: 'Categorias',
                  },
                },
                {
                  name: 'formularios',
                  meta: {
                    label: 'Formulários',
                    icon: <FormOutlined />,
                  },
                },
                {
                  name: 'formularios/contato',
                  list: '/formularios/contato',
                  show: '/formularios/contato/show/:id',
                  meta: {
                    parent: 'formularios',
                    label: 'Contato',
                  },
                },
                {
                  name: 'formularios/diagnostico',
                  list: '/formularios/diagnostico',
                  show: '/formularios/diagnostico/show/:id',
                  meta: {
                    parent: 'formularios',
                    label: 'Diagnóstico',
                  },
                },
                {
                  name: 'formularios/mentoria',
                  list: '/formularios/mentoria',
                  meta: {
                    parent: 'formularios',
                    label: 'Mentoria',
                  },
                },
                {
                  name: 'formularios/palestras',
                  list: '/formularios/palestras',
                  meta: {
                    parent: 'formularios',
                    label: 'Palestras',
                  },
                },
                {
                  name: 'formularios/newsletter',
                  list: '/formularios/newsletter',
                  meta: {
                    parent: 'formularios',
                    label: 'Newsletter',
                  },
                },
                {
                  name: 'formularios/avaliacao',
                  list: '/formularios/avaliacao',
                  show: '/formularios/avaliacao/show/:id',
                  meta: {
                    parent: 'formularios',
                    label: 'Avaliações',
                  },
                },
                {
                  name: 'acervo/products',
                  list: '/acervo',
                  create: '/acervo/create',
                  edit: '/acervo/edit/:id',
                  show: '/acervo/show/:id',
                  meta: {
                    label: 'Acervo',
                    icon: <BookOutlined />,
                  },
                },
                {
                  name: 'depoimentos',
                  list: '/depoimentos',
                  create: '/depoimentos/create',
                  edit: '/depoimentos/edit/:id',
                  show: '/depoimentos/show/:id',
                  meta: {
                    label: 'Depoimentos',
                    icon: <CommentOutlined />,
                  },
                },
                {
                  name: 'galeria/fotos',
                  list: '/galeria',
                  create: '/galeria/create',
                  edit: '/galeria/edit/:id',
                  meta: {
                    label: 'Galeria',
                    icon: <PictureOutlined />,
                  },
                },
              ]}
            >
              <Routes>
                <Route
                  element={
                    <ThemedLayoutV2
                      Sider={() => <ThemedSiderV2 Title={() => <div style={{ padding: '16px' }}><h2>Admin</h2></div>} />}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  }
                >
                  <Route index element={<div style={{ padding: '24px' }}><h1>Dashboard</h1><p>Bem-vindo ao painel administrativo!</p></div>} />

                  <Route path="/blog/posts">
                    <Route index element={<PostList />} />
                    <Route path="create" element={<PostCreate />} />
                    <Route path="edit/:id" element={<PostEdit />} />
                    <Route path="show/:id" element={<PostShow />} />
                  </Route>

                  <Route path="/blog/categories">
                    <Route index element={<CategoryList />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                  </Route>

                  <Route path="/formularios/contato">
                    <Route index element={<ContatoList />} />
                    <Route path="show/:id" element={<ContatoShow />} />
                  </Route>

                  <Route path="/formularios/diagnostico">
                    <Route index element={<DiagnosticoList />} />
                    <Route path="show/:id" element={<DiagnosticoShow />} />
                  </Route>

                  <Route path="/formularios/mentoria" element={<MentoriaList />} />
                  <Route path="/formularios/palestras" element={<PalestrasList />} />
                  <Route path="/formularios/newsletter" element={<NewsletterList />} />

                  <Route path="/formularios/avaliacao">
                    <Route index element={<AvaliacaoList />} />
                    <Route path="show/:id" element={<AvaliacaoShow />} />
                  </Route>

                  <Route path="/acervo">
                    <Route index element={<AcervoList />} />
                    <Route path="create" element={<AcervoCreate />} />
                    <Route path="edit/:id" element={<AcervoEdit />} />
                    <Route path="show/:id" element={<AcervoShow />} />
                  </Route>

                  <Route path="/depoimentos">
                    <Route index element={<DepoimentoList />} />
                    <Route path="create" element={<DepoimentoCreate />} />
                    <Route path="edit/:id" element={<DepoimentoEdit />} />
                    <Route path="show/:id" element={<DepoimentoShow />} />
                  </Route>

                  <Route path="/galeria">
                    <Route index element={<GaleriaList />} />
                    <Route path="create" element={<GaleriaCreate />} />
                    <Route path="edit/:id" element={<GaleriaEdit />} />
                  </Route>

                  <Route path="*" element={<ErrorComponent />} />
                </Route>

                <Route path="/login" element={<AuthPage type="login" title="Admin - Jania Mesquita" />} />
              </Routes>

              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </AntdApp>
        </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
