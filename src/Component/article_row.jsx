import React from 'react';

const ArticleRow = ({ title, description, category, date, onClick }) => {
  // Extract plain text from Slate JSON content for description
  const getPlainTextDescription = (content) => {
    if (typeof content === 'string') {
      return content;
    }
    if (Array.isArray(content)) {
      return content.map(node => 
        node.children?.map(child => child.text).join('') || ''
      ).join(' ').slice(0, 150) + '...';
    }
    return '';
  };

  return (
    <div className="py-4 px-6 bg-gray-800 hover:bg-gray-700 transition-colors duration-200 border-l-4 border-cyan-400 ">
      {/* Content */}
      <div className="w-full">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-cyan-400 text-xs font-medium bg-cyan-400/10 px-2 py-1 rounded-full">
            {category || 'Article'}
          </span>
        </div>

        <h3 className="text-white font-semibold text-sm mb-2 hover:text-cyan-400 cursor-pointer line-clamp-1">
          {title}
        </h3>

        <p className="text-gray-300 text-xs mb-3 line-clamp-2">
          {getPlainTextDescription(description)}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-xs">{date}</span>
          <button onClick={onClick} className="text-cyan-400 hover:text-cyan-300 text-xs font-medium">
            Read More →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleRow;