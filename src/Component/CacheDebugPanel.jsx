import React, { useState, useEffect } from 'react';
import { useCache } from '../context/CacheContext';

const CacheDebugPanel = ({ isVisible = false }) => {
  const { getCacheStats, clearCache, cache } = useCache();
  const [stats, setStats] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setStats(getCacheStats());
      }, 1000); // Update every second

      return () => clearInterval(interval);
    }
  }, [isVisible, getCacheStats]);

  const handleClearCache = () => {
    clearCache();
    setStats(getCacheStats());
  };

  const getCacheEntries = () => {
    const entries = [];
    cache.forEach((value, key) => {
      entries.push({
        key,
        timestamp: value.timestamp,
        age: Math.floor((Date.now() - value.timestamp) / 1000),
        dataSize: JSON.stringify(value.data).length,
      });
    });
    return entries.sort((a, b) => b.timestamp - a.timestamp);
  };

  if (!isVisible || !stats) return null;

  return (
    <div 
      className="fixed bottom-4 right-4 z-50 bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-md"
      style={{ fontSize: '12px' }}
    >
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4 className="font-bold">🚀 Cache Status</h4>
        <span className="text-xs">{isExpanded ? '▲' : '▼'}</span>
      </div>
      
      <div className="mt-2 space-y-1">
        <div className="flex justify-between">
          <span>Total Entries:</span>
          <span className="font-mono">{stats.totalEntries}</span>
        </div>
        <div className="flex justify-between">
          <span>Valid Entries:</span>
          <span className="font-mono text-green-400">{stats.validEntries}</span>
        </div>
        <div className="flex justify-between">
          <span>Expired Entries:</span>
          <span className="font-mono text-red-400">{stats.expiredEntries}</span>
        </div>
        <div className="flex justify-between">
          <span>Hit Rate:</span>
          <span className="font-mono text-blue-400">
            {(stats.cacheHitRate * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 border-t border-gray-600 pt-2">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Cache Entries:</span>
            <button
              onClick={handleClearCache}
              className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
            >
              Clear All
            </button>
          </div>
          
          <div className="max-h-40 overflow-y-auto space-y-1">
            {getCacheEntries().map((entry, index) => (
              <div key={index} className="text-xs border-b border-gray-700 pb-1">
                <div className="font-mono text-green-300 truncate">{entry.key}</div>
                <div className="flex justify-between text-gray-400">
                  <span>Age: {entry.age}s</span>
                  <span>Size: {(entry.dataSize / 1024).toFixed(1)}KB</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-2 text-xs text-gray-400">
        💡 Data cached for 5 minutes
      </div>
    </div>
  );
};

export default CacheDebugPanel;