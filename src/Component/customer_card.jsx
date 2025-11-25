import React from 'react';

const CustomerCard = ({ name, image, type = "customer" }) => {
  return (
    <div className="flex-shrink-0 mx-4">
      <div className="w-24 h-24 rounded-lg flex items-center justify-center shadow-md transition-all duration-300 hover:scale-105">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-16 h-16 object-contain"
            onError={(e) => {
              console.log('Customer image failed to load:', image);
              // Hide the image and show text instead
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `<span class="text-xs font-semibold text-center px-2 ${type === 'customer' ? 'text-blue-700' : 'text-gray-700'}">${name}</span>`;
            }}
          />
        ) : (
          <span className={`text-xs font-semibold text-center px-2 ${
            type === 'customer' ? 'text-blue-700' : 'text-gray-700'
          }`}>
            {name}
          </span>
        )}
      </div>
    </div>
  );
};

export default CustomerCard;