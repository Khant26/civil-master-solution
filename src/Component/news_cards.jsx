import React from 'react';

const NewsCards = ({ image, title, onClick }) => {
  return (
    <div className="bg-gray-800 overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
      {/* Image */}
      <div className="h-24 bg-gray-700 relative">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400 text-xs">{title} Image</span>
          </div>
        )}
        {image && (
          <div className="w-full h-full flex items-center justify-center absolute inset-0" style={{ display: 'none' }}>
            <span className="text-gray-400 text-xs">{title} Image</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-3">
        <h3 className="text-white font-semibold text-xs xs:text-sm mb-2">
          {title}
        </h3>

        <div className="flex justify-between items-center">
          <span className="text-cyan-400 text-[10px] xs:text-xs line-clamp-1">{title}</span>
          <button 
            onClick={onClick}
            className="text-cyan-400 hover:text-cyan-300 text-[10px] xs:text-xs font-medium"
          >
            Read More →
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCards;