import axios from 'axios';

// Base URL da API - pode ser configurado via variável de ambiente
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Cliente axios configurado
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================
// BLOG API
// ============================================

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  readTime: string;
  featured: boolean;
  published: boolean;
  publishedAt: string;
  category: {
    id: string;
    label: string;
    slug: string;
  };
}

export interface BlogCategory {
  id: string;
  slug: string;
  label: string;
}

export const blogApi = {
  // Listar posts (com filtros opcionais)
  getPosts: async (params?: {
    category?: string;
    search?: string;
    featured?: boolean;
    page?: number;
    limit?: number;
  }): Promise<BlogPost[]> => {
    const { data } = await api.get('/blog/posts', { params });
    return data;
  },

  // Buscar post por slug
  getPostBySlug: async (slug: string): Promise<BlogPost> => {
    const { data } = await api.get(`/blog/posts/${slug}`);
    return data;
  },

  // Listar categorias
  getCategories: async (): Promise<BlogCategory[]> => {
    const { data } = await api.get('/blog/categories');
    return data;
  },
};

// ============================================
// ACERVO API (Produtos)
// ============================================

export interface AcervoProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullContent?: string;
  image: string;
  price: string;
  originalPrice?: string;
  hotmartLink?: string;
  published: boolean;
  order: number;
  category: {
    id: string;
    label: string;
    slug: string;
  };
  format: {
    id: string;
    label: string;
    slug: string;
  };
  features?: Array<{ text: string }>;
}

export interface AcervoCategory {
  id: string;
  slug: string;
  label: string;
}

export interface AcervoFormat {
  id: string;
  slug: string;
  label: string;
}

export const acervoApi = {
  // Listar produtos
  getProducts: async (params?: {
    category?: string;
    format?: string;
    page?: number;
    limit?: number;
  }): Promise<AcervoProduct[]> => {
    const { data } = await api.get('/acervo/products', { params });
    return data;
  },

  // Buscar produto por slug
  getProductBySlug: async (slug: string): Promise<AcervoProduct> => {
    const { data } = await api.get(`/acervo/products/${slug}`);
    return data;
  },

  // Listar categorias
  getCategories: async (): Promise<AcervoCategory[]> => {
    const { data } = await api.get('/acervo/categories');
    return data;
  },

  // Listar formatos
  getFormats: async (): Promise<AcervoFormat[]> => {
    const { data } = await api.get('/acervo/formats');
    return data;
  },
};

// ============================================
// PALESTRAS API
// ============================================

export interface PalestraVertente {
  id: string;
  title: string;
  question: string;
  icon: string;
  order: number;
}

export interface PalestraFormato {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  order: number;
}

export interface PalestraEstatistica {
  id: string;
  value: string;
  label: string;
  order: number;
}

export const palestrasApi = {
  // Listar vertentes
  getVertentes: async (): Promise<PalestraVertente[]> => {
    const { data } = await api.get('/palestras/vertentes');
    return data;
  },

  // Listar formatos
  getFormatos: async (): Promise<PalestraFormato[]> => {
    const { data } = await api.get('/palestras/formatos');
    return data;
  },

  // Listar estatísticas
  getEstatisticas: async (): Promise<PalestraEstatistica[]> => {
    const { data } = await api.get('/palestras/estatisticas');
    return data;
  },
};

// ============================================
// MÍDIA API (Na Mídia)
// ============================================

export interface MediaFeatured {
  id: string;
  type: string;
  outlet: string;
  title: string;
  date: string;
  description: string;
  image: string;
  link: string;
}

export interface MediaItem {
  id: string;
  type: string;
  icon: string;
  outlet: string;
  title: string;
  date: string;
  link: string;
  order: number;
}

export interface MediaBook {
  id: string;
  title: string;
  year: number;
  publisher: string;
  description: string;
  order: number;
}

export interface MediaPress {
  id: string;
  outlet: string;
  mentions: number;
  order: number;
}

export const mediaApi = {
  // Listar featured media
  getFeatured: async (): Promise<MediaFeatured[]> => {
    const { data } = await api.get('/media/featured');
    return data;
  },

  // Listar media items
  getItems: async (): Promise<MediaItem[]> => {
    const { data } = await api.get('/media/items');
    return data;
  },

  // Listar livros
  getBooks: async (): Promise<MediaBook[]> => {
    const { data } = await api.get('/media/books');
    return data;
  },

  // Listar press mentions
  getPress: async (): Promise<MediaPress[]> => {
    const { data } = await api.get('/media/press');
    return data;
  },
};

// ============================================
// DEPOIMENTOS API
// ============================================

export interface Depoimento {
  id: string;
  name: string;
  role: string;
  event: string;
  quote: string;
  image: string;
  published: boolean;
  order: number;
}

export const depoimentosApi = {
  // Listar depoimentos publicados
  getDepoimentos: async (): Promise<Depoimento[]> => {
    const { data } = await api.get('/depoimentos');
    return data;
  },
};

// ============================================
// GALERIA API
// ============================================

export interface GaleriaFoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  order: number;
}

export const galeriaApi = {
  // Listar fotos
  getFotos: async (): Promise<GaleriaFoto[]> => {
    const { data } = await api.get('/galeria/fotos');
    return data;
  },
};

// ============================================
// SOCIAL PROOF API
// ============================================

export interface SocialProofStat {
  id: string;
  value: string;
  label: string;
  order: number;
}

export const socialProofApi = {
  // Listar estatísticas
  getStats: async (): Promise<SocialProofStat[]> => {
    const { data } = await api.get('/social-proof/stats');
    return data;
  },
};

// ============================================
// FORMULÁRIOS API
// ============================================

export interface ContatoFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface DiagnosticoFormData {
  name: string;
  email: string;
  phone: string;
  clinic: string;
  revenue: string;
  mainChallenge: string;
}

export interface MentoriaFormData {
  name: string;
  email: string;
  phone: string;
  clinic: string;
  revenue: string;
  tier: string;
}

export interface PalestrasFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  eventType: string;
  attendees: string;
  date: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}

export interface AvaliacaoFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  revenue: string;
  employees: string;
  operationTime: string;
  quizAnswers: Record<string, any>;
  totalScore: number;
  maturityLevel: string;
}

export const formulariosApi = {
  // Enviar formulário de contato
  submitContato: async (data: ContatoFormData): Promise<{ success: boolean }> => {
    const response = await api.post('/formularios/contato', data);
    return response.data;
  },

  // Enviar formulário de diagnóstico
  submitDiagnostico: async (data: DiagnosticoFormData): Promise<{ success: boolean }> => {
    const response = await api.post('/formularios/diagnostico', data);
    return response.data;
  },

  // Enviar formulário de mentoria
  submitMentoria: async (data: MentoriaFormData): Promise<{ success: boolean }> => {
    const response = await api.post('/formularios/mentoria', data);
    return response.data;
  },

  // Enviar formulário de palestras
  submitPalestras: async (data: PalestrasFormData): Promise<{ success: boolean }> => {
    const response = await api.post('/formularios/palestras', data);
    return response.data;
  },

  // Enviar inscrição newsletter
  submitNewsletter: async (data: NewsletterFormData): Promise<{ success: boolean }> => {
    const response = await api.post('/formularios/newsletter', data);
    return response.data;
  },

  // Enviar formulário de avaliação/quiz
  submitAvaliacao: async (data: AvaliacaoFormData): Promise<{ success: boolean }> => {
    const response = await api.post('/formularios/avaliacao', data);
    return response.data;
  },
};

// Export default para facilitar importação
export default {
  blog: blogApi,
  acervo: acervoApi,
  palestras: palestrasApi,
  media: mediaApi,
  depoimentos: depoimentosApi,
  galeria: galeriaApi,
  socialProof: socialProofApi,
  formularios: formulariosApi,
};
