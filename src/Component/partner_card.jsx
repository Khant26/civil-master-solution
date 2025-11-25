import React, { useState } from 'react';

const PartnerCard = ({ logo, image, name, type = 'partner' }) => {
  // Use either logo or image prop
  const imageSource = logo || image;
  const [imgError, setImgError] = useState(false);
  return (
    <div
      className={`
        ${type === 'partner'
          ? 'text-gray-400'
          : 'text-gray-600'
        }
        rounded flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105
      `}
      style={{ width: '6.25rem', height: '6.25rem' }}
    >
      {imageSource && !imgError ? (
        <img
          src={imageSource}
          alt={name}
          className="max-h-full max-w-full object-contain p-2"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className={`text-xs ${type === 'partner' ? 'text-gray-400' : 'text-gray-600'} text-center px-1`}>
          {name || 'Logo'}
        </span>
      )}
    </div>
  );
};

export default PartnerCard;