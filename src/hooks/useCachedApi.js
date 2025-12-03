import { useState, useCallback } from 'react';
import { useCache } from '../context/CacheContext';
import { apiService } from '../services/api';

export const useCachedApi = () => {
  const { getCachedData, setCachedData, loadFromLocalStorage } = useCache();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generic cached API call function
  const cachedApiCall = useCallback(async (apiFunction, cacheKey, params = {}) => {
    try {
      setLoading(true);
      setError(null);

      // First, try to get from cache
      let cachedResult = getCachedData(cacheKey, params);
      
      // If not in memory cache, try localStorage
      if (!cachedResult) {
        cachedResult = loadFromLocalStorage(cacheKey, params);
      }

      // If we have cached data, return it immediately
      if (cachedResult) {
        setLoading(false);
        return cachedResult;
      }

      // If no cached data, make API call
      console.log(`🌐 Fetching from API: ${cacheKey}`);
      const response = await apiFunction();
      const data = response.data;

      // Cache the result
      setCachedData(cacheKey, params, data);
      
      setLoading(false);
      return data;
    } catch (err) {
      setError(err);
      setLoading(false);
      console.error(`API Error for ${cacheKey}:`, err);
      throw err;
    }
  }, [getCachedData, setCachedData, loadFromLocalStorage]);

  // Specific API methods with caching
  const partnerships = {
    getAll: useCallback(() => 
      cachedApiCall(apiService.partnerships.getAll, '/partnerships/'), 
    [cachedApiCall]),
    
    getById: useCallback((id) => 
      cachedApiCall(() => apiService.partnerships.getById(id), `/partnerships/${id}/`), 
    [cachedApiCall]),
  };

  const customers = {
    getAll: useCallback(() => 
      cachedApiCall(apiService.customers.getAll, '/customerships/'), 
    [cachedApiCall]),
    
    getById: useCallback((id) => 
      cachedApiCall(() => apiService.customers.getById(id), `/customerships/${id}/`), 
    [cachedApiCall]),
  };

  const products = {
    getAll: useCallback(() => 
      cachedApiCall(apiService.products.getAll, '/products/'), 
    [cachedApiCall]),
    
    getById: useCallback((id) => 
      cachedApiCall(() => apiService.products.getById(id), `/products/${id}/`), 
    [cachedApiCall]),
  };

  const projectReferences = {
    getAll: useCallback(() => 
      cachedApiCall(apiService.projectReferences.getAll, '/projectreferences/'), 
    [cachedApiCall]),
    
    getById: useCallback((id) => 
      cachedApiCall(() => apiService.projectReferences.getById(id), `/projectreferences/${id}/`), 
    [cachedApiCall]),
    
    getFavorites: useCallback(() => 
      cachedApiCall(apiService.projectReferences.getFavorites, '/projectreferences/favorites/'), 
    [cachedApiCall]),
  };

  const news = {
    getAll: useCallback(() => 
      cachedApiCall(apiService.news.getAll, '/news/'), 
    [cachedApiCall]),
    
    getById: useCallback((id) => 
      cachedApiCall(() => apiService.news.getById(id), `/news/${id}/`), 
    [cachedApiCall]),
    
    // Note: POST methods are not cached as they modify data
    submit: useCallback((data) => apiService.news.submit(data), []),
  };

  const articles = {
    getAll: useCallback(() => 
      cachedApiCall(apiService.articles.getAll, '/articles/'), 
    [cachedApiCall]),
    
    getById: useCallback((id) => 
      cachedApiCall(() => apiService.articles.getById(id), `/articles/${id}/`), 
    [cachedApiCall]),
  };

  // Non-cached methods (POST, PUT, DELETE operations)
  const requestForm = {
    submit: useCallback((data) => apiService.requestForm.submit(data), []),
  };

  const chatbot = {
    sendMessage: useCallback((data) => apiService.chatbot.sendMessage(data), []),
  };

  return {
    partnerships,
    customers,
    products,
    projectReferences,
    news,
    articles,
    requestForm,
    chatbot,
    loading,
    error,
    cachedApiCall, // For custom API calls
  };
};

export default useCachedApi;