import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api';

// Query Keys - centralized for consistency
export const QUERY_KEYS = {
  PARTNERSHIPS: ['partnerships'],
  CUSTOMERS: ['customers'], 
  PRODUCTS: ['products'],
  PROJECT_REFERENCES: ['projectReferences'],
  PROJECT_REFERENCE_FAVORITES: ['projectReferences', 'favorites'],
  NEWS: ['news'],
  ARTICLES: ['articles'],
  NEWS_BY_ID: (id) => ['news', id],
  ARTICLE_BY_ID: (id) => ['articles', id],
  PARTNERSHIP_BY_ID: (id) => ['partnerships', id],
  CUSTOMER_BY_ID: (id) => ['customers', id],
  PRODUCT_BY_ID: (id) => ['products', id],
  PROJECT_REFERENCE_BY_ID: (id) => ['projectReferences', id],
};

// Partnership Hooks
export const usePartnerships = () => {
  return useQuery({
    queryKey: QUERY_KEYS.PARTNERSHIPS,
    queryFn: async () => {
      const response = await apiService.partnerships.getAll();
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const usePartnership = (id) => {
  return useQuery({
    queryKey: QUERY_KEYS.PARTNERSHIP_BY_ID(id),
    queryFn: async () => {
      const response = await apiService.partnerships.getById(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

// Customer Hooks
export const useCustomers = () => {
  return useQuery({
    queryKey: QUERY_KEYS.CUSTOMERS,
    queryFn: async () => {
      const response = await apiService.customers.getAll();
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useCustomer = (id) => {
  return useQuery({
    queryKey: QUERY_KEYS.CUSTOMER_BY_ID(id),
    queryFn: async () => {
      const response = await apiService.customers.getById(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

// Product Hooks
export const useProducts = () => {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCTS,
    queryFn: async () => {
      const response = await apiService.products.getAll();
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCT_BY_ID(id),
    queryFn: async () => {
      const response = await apiService.products.getById(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

// Project Reference Hooks
export const useProjectReferences = () => {
  return useQuery({
    queryKey: QUERY_KEYS.PROJECT_REFERENCES,
    queryFn: async () => {
      const response = await apiService.projectReferences.getAll();
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useProjectReference = (id) => {
  return useQuery({
    queryKey: QUERY_KEYS.PROJECT_REFERENCE_BY_ID(id),
    queryFn: async () => {
      const response = await apiService.projectReferences.getById(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useProjectReferenceFavorites = () => {
  return useQuery({
    queryKey: QUERY_KEYS.PROJECT_REFERENCE_FAVORITES,
    queryFn: async () => {
      const response = await apiService.projectReferences.getFavorites();
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

// News Hooks
export const useNews = () => {
  return useQuery({
    queryKey: QUERY_KEYS.NEWS,
    queryFn: async () => {
      const response = await apiService.news.getAll();
      return response.data;
    },
    staleTime: 1000 * 60 * 3, // 3 minutes for news (more frequent updates)
  });
};

export const useNewsItem = (id) => {
  return useQuery({
    queryKey: QUERY_KEYS.NEWS_BY_ID(id),
    queryFn: async () => {
      const response = await apiService.news.getById(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 3,
  });
};

// Article Hooks
export const useArticles = () => {
  return useQuery({
    queryKey: QUERY_KEYS.ARTICLES,
    queryFn: async () => {
      const response = await apiService.articles.getAll();
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useArticle = (id) => {
  return useQuery({
    queryKey: QUERY_KEYS.ARTICLE_BY_ID(id),
    queryFn: async () => {
      const response = await apiService.articles.getById(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

// Mutation Hooks for POST operations
export const useSubmitNews = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data) => apiService.news.submit(data),
    onSuccess: () => {
      // Invalidate and refetch news data
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.NEWS });
    },
  });
};

export const useSubmitRequestForm = () => {
  return useMutation({
    mutationFn: (data) => apiService.requestForm.submit(data),
  });
};

export const useSendChatbotMessage = () => {
  return useMutation({
    mutationFn: (data) => apiService.chatbot.sendMessage(data),
  });
};

// Combined hook for home page data
export const useHomePageData = () => {
  const partnershipsQuery = usePartnerships();
  const customersQuery = useCustomers();

  return {
    partnerships: partnershipsQuery.data || [],
    customers: customersQuery.data || [],
    isLoading: partnershipsQuery.isLoading || customersQuery.isLoading,
    isError: partnershipsQuery.isError || customersQuery.isError,
    error: partnershipsQuery.error || customersQuery.error,
  };
};