import { Refine } from '@refinedev/core';
import {
  AuthPage,
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from '@refinedev/antd';
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6';
import dataProvider from '@refinedev/simple-rest';
import { App as AntdApp, ConfigProvider, theme as antdTheme } from 'antd';
import ptBR from 'antd/locale/pt_BR';
import '@refinedev/antd/dist/reset.css';
import './styles/global.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { authProvider, axiosInstance } from './providers/authProvider';
import {
  DashboardOutlined,
  FileTextOutlined,
  CommentOutlined,
  FormOutlined,
  PictureOutlined,
  BookOutlined,
  PlaySquareOutlined,
  SettingOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';
import { DashboardPage } from './pages/Dashboard';
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
import { MentoriaShow } from './pages/formularios/MentoriaShow';
import { PalestrasList } from './pages/formularios/PalestrasList';
import { PalestrasShow } from './pages/formularios/PalestrasShow';
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
import { MidiaList } from './pages/midias/MidiaList';
import { MidiaCreate } from './pages/midias/MidiaCreate';
import { MidiaEdit } from './pages/midias/MidiaEdit';
import { BibliotecaMidia } from './pages/BibliotecaMidia';
import { SettingsPage } from './pages/Settings';
import { AdminLoginLogo } from './components/AdminLoginLogo';

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider
        locale={ptBR}
        theme={{
          algorithm: antdTheme.defaultAlgorithm,
          token: {
            // Cores principais
            colorPrimary: '#385443',
            colorLink: '#385443',
            colorSuccess: '#52c41a',
            colorWarning: '#d4a017',
            colorError: '#cf1322',

            // Backgrounds
            colorBgContainer: '#FFFFFF',
            colorBgLayout: '#F2EFE8',
            colorBgElevated: '#FFFFFF',
            colorBgSpotlight: '#F2EFE8',

            // Texto
            colorText: '#42331C',
            colorTextSecondary: '#696969',
            colorTextTertiary: '#B6A689',
            colorTextQuaternary: '#B6A689',
            colorTextPlaceholder: '#B6A689',

            // Bordas
            colorBorder: '#DFDCD4',
            colorBorderSecondary: '#EBEBEB',
            colorSplit: '#DFDCD4',

            // Tipografia
            fontFamily: "'Nunito', 'Lato', sans-serif",
            fontSize: 14,
            fontSizeLG: 16,

            // Bordas arredondadas
            borderRadius: 7,
            borderRadiusLG: 9,
            borderRadiusSM: 5,
            borderRadiusXS: 3,

            // Sombras
            boxShadow: '0 2px 12px rgba(66, 51, 28, 0.08)',
            boxShadowSecondary: '0 8px 32px rgba(66, 51, 28, 0.12)',
          },
          components: {
            Layout: {
              headerBg: '#FFFFFF',
              siderBg: '#42331C',
              bodyBg: '#F2EFE8',
            },
            Menu: {
              darkItemBg: 'transparent',
              darkSubMenuItemBg: 'rgba(0,0,0,0.15)',
              darkItemSelectedBg: '#385443',
              darkItemColor: '#d4c4a8',
              darkItemSelectedColor: '#FFFFFF',
              darkItemHoverBg: 'rgba(255,255,255,0.08)',
              darkItemHoverColor: '#FFFFFF',
            },
            Button: {
              borderRadius: 7,
              fontWeight: 600,
            },
            Table: {
              headerBg: '#F2EFE8',
              headerColor: '#42331C',
              borderColor: '#DFDCD4',
              rowHoverBg: '#f9f7f2',
            },
            Card: {
              borderRadiusLG: 9,
            },
            Input: {
              borderRadius: 7,
            },
            Select: {
              borderRadius: 7,
            },
          },
        }}
      >
        <AntdApp>
          <Refine
            dataProvider={dataProvider((import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/admin` : 'http://localhost:3000/api/admin'), axiosInstance)}
            notificationProvider={useNotificationProvider}
            routerProvider={routerBindings}
            authProvider={authProvider}
            options={{
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
              projectId: 'jania-admin',
              syncWithLocation: true,
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
                show: '/formularios/mentoria/show/:id',
                meta: {
                  parent: 'formularios',
                  label: 'Mentoria',
                },
              },
              {
                name: 'formularios/palestras',
                list: '/formularios/palestras',
                show: '/formularios/palestras/show/:id',
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
                name: 'acervo',
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
              {
                name: 'midias',
                list: '/midias',
                create: '/midias/create',
                edit: '/midias/edit/:id',
                meta: {
                  label: 'Mídias',
                  icon: <PlaySquareOutlined />,
                },
              },
              {
                name: 'biblioteca',
                list: '/biblioteca',
                meta: {
                  label: 'Arquivos do Servidor',
                  icon: <FolderOpenOutlined />,
                },
              },
              {
                name: 'settings',
                list: '/settings',
                meta: {
                  label: 'Configurações',
                  icon: <SettingOutlined />,
                },
              },
            ]}
          >
            <Routes>
              <Route
                element={
                  <ThemedLayoutV2
                    Header={() => null}
                    Sider={() => (
                      <ThemedSiderV2
                        Title={() => (
                          <div className="admin-logo" style={{ padding: '0px', textAlign: 'center', width: '100%', marginTop: '16px' }}>
                            <div style={{ transform: 'scale(0.8)', transformOrigin: 'center center', display: 'flex', justifyContent: 'center' }}>
                              <AdminLoginLogo />
                            </div>
                            <div style={{ color: '#d4c4a8', fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '-8px' }}>
                              Admin
                            </div>
                          </div>
                        )}
                      />
                    )}
                  >
                    <Outlet />
                  </ThemedLayoutV2>
                }
              >
                <Route index element={<DashboardPage />} />

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

                <Route path="/formularios/mentoria">
                  <Route index element={<MentoriaList />} />
                  <Route path="show/:id" element={<MentoriaShow />} />
                </Route>

                <Route path="/formularios/palestras">
                  <Route index element={<PalestrasList />} />
                  <Route path="show/:id" element={<PalestrasShow />} />
                </Route>
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

                <Route path="/midias">
                  <Route index element={<MidiaList />} />
                  <Route path="create" element={<MidiaCreate />} />
                  <Route path="edit/:id" element={<MidiaEdit />} />
                </Route>

                <Route path="/biblioteca" element={<BibliotecaMidia />} />
                <Route path="/settings" element={<SettingsPage />} />

                <Route path="*" element={<ErrorComponent />} />
              </Route>

              <Route path="/login" element={<AuthPage type="login" title={<AdminLoginLogo />} registerLink={false} />} />
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
