import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Component/nav';
import NewsCards from '../Component/news_cards';
import ArticleRow from '../Component/article_row';
import Footer from '../Component/footer';
import ChatBot from '../Component/ChatBot';
import { apiService } from '../services/api';

const NewArticle = () => {
  const [newsData, setNewsData] = useState([]);
  const [articlesData, setArticlesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const newsPerPage = 4;
  const totalPages = Math.ceil(newsData.length / newsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [newsResponse, articlesResponse] = await Promise.all([
          apiService.news.getAll(),
          apiService.articles.getAll()
        ]);
        console.log('News API response:', newsResponse.data);
        console.log('Articles API response:', articlesResponse.data);
        setNewsData(newsResponse.data);
        setArticlesData(articlesResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load news and articles');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Nav />
        <div className="flex items-center justify-center h-64">
          <div className="text-white text-xl">Loading news and articles...</div>
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
    <div className="min-h-screen bg-[#000A14]" >
      <Nav />

      <div className="w-full h-[300px] bg-gray-900 relative">
        <img src="/images/backgrounds/new_article_background.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-10">
          <div className="text-center">
            <h2 className="text-white sm:text-xs md:text-2xl lg:text-4xl xl:text-4xl font-bold font-oswald mb-4">CIVIL MASTER SOLUTION</h2>
            <p className="text-white text-xs xl:text-xl lg:text-lg md:text-base 2xl:text-2xl 3xl:text-2xl  px-20 sm:px-4 max-w-[1600px] sm:max-w-full mx-auto font-oswald leading-relaxed">Welcome to the CMS News & Articles section, where we share insights, updates, and expert knowledge on industrial flooring solutions. Here, you'll find the latest company news, industry trends, and case studies from real projects across Thailand. Our articles are written by experienced design engineers, offering practical advice and technical know-how. We aim to keep our clients and partners informed about new technologies, best practices, and international standards in flooring solutions.</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-8">
        <div className="max-w-[1370px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* News Section - Left Side */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg xs:text-2xl font-bold text-white">
                  Latest <span className="text-cyan-400">News</span>
                </h2>
              </div>
              
              {/* News Grid - 2x2 */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {newsData.slice((currentPage - 1) * newsPerPage, currentPage * newsPerPage).map((news, index) => (
                  <NewsCards
                    key={news.id || index}
                    image={news.news_image && news.news_image.length > 0 ? news.news_image[0] : null}
                    title={news.news_title}
                    description={news.content}
                    date={null}
                    newsItem={news}
                    onClick={() => {
                      navigate(`/new?id=${news.id || index}`);
                    }}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center space-x-4">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`p-2 transition-colors ${currentPage === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:text-cyan-400'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="flex space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                        currentPage === page 
                          ? 'bg-cyan-400 text-gray-900' 
                          : 'bg-gray-700 text-white hover:bg-gray-600'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`p-2 transition-colors ${currentPage === totalPages ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:text-cyan-400'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Articles Section - Right Side */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg xs:text-2xl font-bold text-white">
                  Technical <span className="text-cyan-400">Articles</span>
                </h2>
              </div>

              {/* Articles List */}
              <div className="max-h-[440px] overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-cyan-400 space-y-3 pr-2">
                {articlesData.map((article, index) => (
                  <ArticleRow
                    key={article.id || index}
                    title={article.article_title}
                    description={article.content}
                    category={article.category}
                    date={new Date(article.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                    onClick={() => navigate(`/article?id=${article.id || index}`)}
                  />
                ))}
              </div>

              {articlesData.length === 0 && (
                <div className="text-white text-center py-8">No articles available</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
};

export default NewArticle;
