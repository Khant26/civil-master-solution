import React, { createContext, useContext, useState, useCallback } from 'react';

const CacheContext = createContext();

export const useCache = () => {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error('useCache must be used within a CacheProvider');
  }
  return context;
};

export const CacheProvider = ({ children }) => {
  // In-memory cache for fast access
  const [cache, setCache] = useState(new Map());
  
  // Cache expiration time (5 minutes by default)
  const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds
  
  // Generate cache key from URL and params
  const generateCacheKey = useCallback((url, params = {}) => {
    const paramString = Object.keys(params).length 
      ? '?' + new URLSearchParams(params).toString() 
      : '';
    return url + paramString;
  }, []);

  // Check if cache entry is valid (not expired)
  const isCacheValid = useCallback((cacheEntry) => {
    if (!cacheEntry) return false;
    return Date.now() - cacheEntry.timestamp < CACHE_EXPIRY;
  }, []);

  // Get data from cache
  const getCachedData = useCallback((url, params = {}) => {
    const cacheKey = generateCacheKey(url, params);
    const cacheEntry = cache.get(cacheKey);
    
    if (cacheEntry && isCacheValid(cacheEntry)) {
      console.log(`📦 Cache HIT for: ${cacheKey}`);
      return cacheEntry.data;
    }
    
    if (cacheEntry) {
      console.log(`⏰ Cache EXPIRED for: ${cacheKey}`);
      cache.delete(cacheKey);
    } else {
      console.log(`❌ Cache MISS for: ${cacheKey}`);
    }
    
    return null;
  }, [cache, generateCacheKey, isCacheValid]);

  // Set data in cache
  const setCachedData = useCallback((url, params = {}, data) => {
    const cacheKey = generateCacheKey(url, params);
    const cacheEntry = {
      data,
      timestamp: Date.now(),
    };
    
    setCache(prevCache => {
      const newCache = new Map(prevCache);
      newCache.set(cacheKey, cacheEntry);
      console.log(`💾 Cache SET for: ${cacheKey}`);
      return newCache;
    });

    // Also save to localStorage for persistence
    try {
      const storageKey = `cache_${cacheKey}`;
      localStorage.setItem(storageKey, JSON.stringify(cacheEntry));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }, [generateCacheKey]);

  // Load data from localStorage on initialization
  const loadFromLocalStorage = useCallback((url, params = {}) => {
    try {
      const cacheKey = generateCacheKey(url, params);
      const storageKey = `cache_${cacheKey}`;
      const stored = localStorage.getItem(storageKey);
      
      if (stored) {
        const cacheEntry = JSON.parse(stored);
        if (isCacheValid(cacheEntry)) {
          setCache(prevCache => {
            const newCache = new Map(prevCache);
            newCache.set(cacheKey, cacheEntry);
            return newCache;
          });
          console.log(`🔄 Restored from localStorage: ${cacheKey}`);
          return cacheEntry.data;
        } else {
          // Remove expired data from localStorage
          localStorage.removeItem(storageKey);
        }
      }
    } catch (error) {
      console.warn('Failed to load from localStorage:', error);
    }
    return null;
  }, [generateCacheKey, isCacheValid]);

  // Clear cache (optional, for manual cache clearing)
  const clearCache = useCallback((pattern = null) => {
    if (pattern) {
      // Clear specific pattern
      setCache(prevCache => {
        const newCache = new Map();
        prevCache.forEach((value, key) => {
          if (!key.includes(pattern)) {
            newCache.set(key, value);
          }
        });
        return newCache;
      });
    } else {
      // Clear all cache
      setCache(new Map());
    }
    
    // Also clear from localStorage
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('cache_') && (!pattern || key.includes(pattern))) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }, []);

  // Get cache statistics
  const getCacheStats = useCallback(() => {
    let validEntries = 0;
    let expiredEntries = 0;
    
    cache.forEach((entry) => {
      if (isCacheValid(entry)) {
        validEntries++;
      } else {
        expiredEntries++;
      }
    });
    
    return {
      totalEntries: cache.size,
      validEntries,
      expiredEntries,
      cacheHitRate: validEntries / Math.max(cache.size, 1),
    };
  }, [cache, isCacheValid]);

  const value = {
    getCachedData,
    setCachedData,
    loadFromLocalStorage,
    clearCache,
    getCacheStats,
    cache,
  };

  return (
    <CacheContext.Provider value={value}>
      {children}
    </CacheContext.Provider>
  );
};

export default CacheContext;