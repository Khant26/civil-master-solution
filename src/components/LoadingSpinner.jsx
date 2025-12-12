import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...', fullScreen = false }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    xlarge: 'w-24 h-24'
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50'
    : 'flex items-center justify-center p-8';

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div
          className={`${sizeClasses[size]} mx-auto animate-spin rounded-full border-4 border-gray-300 border-t-cyan-500`}
        ></div>
        {text && (
          <p className="mt-4 text-gray-600 text-sm sm:text-base font-medium">
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;