import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Nav from '../Component/nav';
import Footer from '../Component/footer';
import NewsCards from '../Component/news_cards';
import ContentRenderer from '../Component/ContentRenderer';
import ChatBot from '../Component/ChatBot';
import { apiService } from '../services/api';

const New = () => {
  const [newsData, setNewsData] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await apiService.news.getAll();
        console.log('News data:', response.data);
        setNewsData(response.data);

        // Check for news ID in URL parameters
        const newsId = searchParams.get('id');
        if (newsId) {
          const news = response.data.find(item => item.id == newsId || item.id == null && response.data.indexOf(item) == newsId);
          setSelectedNews(news || null);
        }
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [newsData]);

  const totalPages = Math.ceil(newsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedNews = newsData.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Nav />
        <div className="flex items-center justify-center h-64">
          <div className="text-white text-xl">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Nav />
        <div className="flex items-center justify-center h-64">
          <div className="text-red-400 text-xl">{error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000A14]">
      <Nav />

      {/* Content Section */}
      <section className="py-8 bg-[#000A14]">
        <div className="max-w-7xl mx-auto px-8">
          {/* Hero section (image + overlay + heading) */}
          

          {/* Small left accent + heading to match image */}
          <div className="flex items-center mb-6">
            <div className="w-10 h-px bg-cyan-400 mr-4" />
            <h1 className="text-lg xs:text-2xl sm:text-3xl md:text-5xl text-white font-semibold tracking-wider">News</h1>
          </div>

          {/* Use selectedNews if present or first item as focusArticle */}
          {((selectedNews && selectedNews) || newsData[0]) ? (
            (() => {
              const article = selectedNews || newsData[0];

              return (
                <div>
                  {/* Hero image */}
                  {article.news_image && article.news_image.length > 0 && (
                    <div className="w-full h-64 md:h-72 bg-gray-700 mb-6 overflow-hidden">
                      <img
                        src={article.news_image[0]}
                        alt={article.news_title}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                      />
                      <div className="w-full h-full flex items-center justify-center" style={{ display: 'none' }}>
                        <span className="text-gray-400">Image not available</span>
                      </div>
                    </div>
                  )}

                  {/* Centered title */}
                  <h1 className="text-xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6">{article.news_title}</h1>
                  <p className="text-[10px] xs:text-sm text-gray-400 text-left mb-3">Keywords: {Array.isArray(article.keyword) ? article.keyword.join(', ') : article.keyword}</p>

                  {/* Content */}
                  <div className="text-white">
                    <ContentRenderer content={article.content} />
                  </div>

                  {/* Back to all news button */}
                  <div className="flex justify-end mt-8">
                    <button
                      onClick={() => navigate('/news-article')}
                      className=" hover:text-cyan-300 text-white font-medium py-1 px-3 rounded text-[10px] xs:text-sm transition-colors duration-200"
                    >
                      <span className="text-xl xs:text-3xl sm:text-4xl mr-1">←</span> Back to News & Articles
                    </button>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg sm:text-xs">No news available</div>
            </div>
          )}
        </div>
      </section>

      {/* News List Section */}
      <section className="py-8 bg-[#000A14]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center mb-6">
            <div className="w-10 h-px bg-cyan-400 mr-4" />
            <h3 className="text-sm xs:text-lg sm:text-xl text-white font-semibold tracking-wider">All News</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedNews.map((news, index) => (
              <NewsCards
                key={news.id || index}
                image={news.news_image && news.news_image[0]}
                title={news.news_title}
                description={news.content}
                date={news.created_at || news.updated_at}
                onClick={() => navigate(`?id=${news.id}`)}
                newsItem={news}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="text-cyan-400 hover:text-cyan-300 disabled:text-gray-500 text-[10px] xs:text-sm sm:text-base md:text-lg font-semibold"
              >
                ← Previous
              </button>
              <span className="text-white text-[10px] xs:text-sm sm:text-base">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="text-cyan-400 hover:text-cyan-300 disabled:text-gray-500 text-[10px] xs:text-sm sm:text-base md:text-lg font-semibold"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
};

export default New;