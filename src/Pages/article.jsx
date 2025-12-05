import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Nav from '../Component/nav';
import Footer from '../Component/footer';
import ArticleRow from '../Component/article_row';
import ContentRenderer from '../Component/ContentRenderer';
import ChatBot from '../Component/ChatBot';
import { useArticles } from '../hooks/useApiQueries';

const Article = () => {
  const { data: articlesData = [], isLoading, error } = useArticles();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Helper function to extract plain text from Slate JSON content or HTML
  const getPlainTextPreview = (content, contentHtml) => {
    // If HTML content exists, strip tags for preview
    if (contentHtml) {
      const tmp = document.createElement('div');
      tmp.innerHTML = contentHtml;
      const text = tmp.textContent || tmp.innerText || '';
      return text.slice(0, 100) + (text.length > 100 ? '...' : '');
    }
    
    // Fallback to Slate JSON parsing
    if (typeof content === 'string') {
      return content.slice(0, 100) + (content.length > 100 ? '...' : '');
    }
    if (Array.isArray(content)) {
      const text = content.map(node => 
        node.children?.map(child => child.text).join('') || ''
      ).join(' ');
      return text.slice(0, 100) + (text.length > 100 ? '...' : '');
    }
    return '';
  };

  useEffect(() => {
    // Check for article ID in URL parameters when data is available
    const articleId = searchParams.get('id');
    if (articleId && articlesData.length > 0) {
      // First try to find by ID, then by index if ID is not found
      let article = articlesData.find(item => item.id == articleId);
      if (!article) {
        // If not found by ID, try by index (for fallback)
        const index = parseInt(articleId);
        if (!isNaN(index) && index >= 0 && index < articlesData.length) {
          article = articlesData[index];
        }
      }
      if (article) {
        console.log('Selected article PDF URL:', article.pdf_file);
        setSelectedArticle(article || null);
      }
    }
  }, [searchParams, articlesData]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
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
    <div className="min-h-screen bg-[#000A14]" style={{ fontFamily: "'Arial', sans-serif" }}>
      <Nav />
      {/* Content Section */}
      <section className="py-8 bg-[#000A14]">
        <div className="max-w-7xl mx-auto px-8">
          {/* Small left accent + heading to match image */}
          <div className="flex items-center mb-6">
            <div className="w-10 h-px bg-cyan-400 mr-4" />
            <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl text-white font-semibold tracking-wider">Articles</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Selected Article - Left Side */}
            <div className="lg:col-span-2">
              {selectedArticle ? (
                (() => {
                  const article = selectedArticle;
                  const content = article.content || '';

                  return (
                    <div>
                      {/* Centered title */}
                      <h1 className="text-xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-7xl font-bold text-white text-left mb-6">{article.article_title}</h1>
                      <p className="text-[10px] xs:text-sm sm:text-base md:text-base lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl text-gray-400 text-left mb-2">Category: {article.category}</p>
                      {article.keyword && article.keyword.length > 0 && (
                        <p className="text-[10px] xs:text-sm sm:text-base md:text-base lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl text-gray-400 text-left mb-6">
                          Keywords: {Array.isArray(article.keyword) ? article.keyword.join(', ') : article.keyword}
                        </p>
                      )}

                      {/* Full content display */}
                      <div className="text-white">
                        <style>
                          {`
                            .article-content {
                              font-size: 16px;
                              line-height: 1.6;
                              max-width: 95%;
                              text-align: justify;
                            }
                            .article-content h1 {
                              font-size: 26px;
                            }
                            .article-content h2 {
                              font-size: 22px;
                            }
                            .article-content span {
                              font-size: 20px;
                              text-align: justify;
                            }
                            .article-content span {
                              font-size: 20px;
                              text-align: justify;
                            }
                            @media (min-width: 360px) {
                              .article-content {
                                font-size: 18px;
                                line-height: 1.65;
                                max-width: 92%;
                                text-align: justify;
                              }
                              .article-content h1 {
                                font-size: 30px;
                              }
                              .article-content h2 {
                                font-size: 26px;
                              }
                              .article-content h3 {
                                font-size: 23px;
                              }
                              .article-content span {
                                font-size: 20px;
                                text-align: justify;
                              }
                            }
                            @media (min-width: 450px) {
                              .article-content {
                                font-size: 20px;
                                line-height: 1.75;
                                max-width: 85%;
                                text-align: justify;
                              }
                              .article-content h1 {
                                font-size: 36px;
                              }
                              .article-content h2 {
                                font-size: 30px;
                              }
                              .article-content span {
                                font-size: 20px;
                                text-align: justify;
                              }
                            }
                            @media (min-width: 768px) {
                              .article-content {
                                font-size: 22px;
                                line-height: 1.8;
                                max-width: 70ch;
                                text-align: justify;
                              }
                              .article-content h1 {
                                font-size: 44px;
                              }
                              .article-content h2 {
                                font-size: 36px;
                              }
                              .article-content span {
                                font-size: 20px;
                                text-align: justify;
                              }
                            }
                            @media (min-width: 1024px) {
                              .article-content {
                                font-size: 24px;
                                line-height: 1.85;
                                max-width: 70ch;
                                text-align: justify;
                              }
                              .article-content h1 {
                                font-size: 52px;
                              }
                              .article-content h2 {
                                font-size: 42px;
                              }
                              .article-content span {
                                font-size: 22px;
                                text-align: justify;
                              }
                            }
                            @media (min-width: 1280px) {
                              .article-content {
                                font-size: 26px;
                                line-height: 1.9;
                                max-width: 75ch;
                                text-align: justify;
                              }
                              .article-content h1 {
                                font-size: 60px;
                              }
                              .article-content h2 {
                                font-size: 48px;
                              }
                              .article-content h3 {
                                font-size: 40px;
                              }
                              .article-content span {
                                font-size: 22px;
                                text-align: justify;
                              }
                            }
                            .article-content img {
                              height: auto;
                              display: block;
                              margin: 1rem auto;
                              border: 1px solid #374151;
                              max-width: 100%;
                            }
                            .article-content table {
                              border-collapse: collapse;
                              width: 100%;
                              margin: 1rem 0;
                              background-color: #1f2937;
                            }
                            .article-content th, .article-content td {
                              border: 1px solid #4b5563;
                              padding: 0.5rem;
                              text-align: left;
                              color: white;
                            }
                            .article-content th {
                              background-color: #374151;
                              font-weight: bold;
                            }
                            .article-content p {
                              text-align: justify;
                              margin-bottom: 1rem;
                            }
                            .article-content h1, .article-content h2, .article-content h3, .article-content h4, .article-content h5, .article-content h6 {
                              margin-top: 1.5rem;
                              margin-bottom: 0.5rem;
                              font-weight: 600;
                            }
                            .article-content * {
                              color: white !important;
                              font-family: 'Arial', sans-serif !important;
                            }
                            .article-content a {
                              color: #22d3ee !important;
                            }
                            .article-content a:hover {
                              color: #67e8f9 !important;
                            }
                          `}
                        </style>
                        {/* Manga-like reading: Show only PDF on mobile (≤450px), hide article content completely */}
                        {windowWidth <= 450 ? (
                          // Mobile view - PDF only (manga-like reading)
                          article.pdf_file ? (
                            <div className="w-full h-screen flex flex-col">
                              {console.log('Rendering PDF with URL:', article.pdf_file)}
                              <object
                                data={article.pdf_file}
                                type="application/pdf"
                                className="w-full flex-1 border-0 rounded-lg"
                                style={{ height: 'calc(100vh - 120px)', minHeight: '600px' }}
                                aria-label={`${article.article_title} PDF`}
                              >
                                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                                  <p className="text-white mb-4">Visit with Laptop or ipad to read directly</p>
                                  <a 
                                    href={article.pdf_file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan-400 hover:text-cyan-300 underline"
                                  >
                                    Click here to download the PDF
                                  </a>
                                </div>
                              </object>
                            </div>
                          ) : (
                            <div className="text-center py-12">
                              <div className="text-gray-400 text-sm">No PDF available for mobile reading</div>
                            </div>
                          )
                        ) : (
                          // Desktop view - Show article content
                          article.content_html ? (
                            <>
                              {(() => {
                                // No need to process HTML - images are already base64 encoded by backend
                                // Just render the HTML content as-is
                                return (
                                  <>
                                    {console.log('Rendering HTML content')}
                                    <div 
                                      dangerouslySetInnerHTML={{ __html: article.content_html }} 
                                      className="prose prose-invert max-w-none article-content"
                                    />
                                  </>
                                );
                              })()}
                            </>
                          ) : (
                            <ContentRenderer content={article.content} />
                          )
                        )}
                      </div>

                      {/* Back to all articles button */}
                      <div className="flex justify-end mt-8">
                        <button
                          onClick={() => navigate('/news-article')}
                          className="hover:text-cyan-300 text-white font-medium py-1 px-3 rounded text-[10px] xs:text-sm sm:text-base md:text-base lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl transition-colors duration-200"
                        >
                          <span className="text-xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl mr-1">←</span> Back to All Articles
                        </button>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-sm xs:text-base sm:text-lg md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl">Select an article to read</div>
                </div>
              )}
            </div>

            {/* Articles List - Right Side */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="w-10 h-px bg-cyan-400 mr-4" />
                <h4 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl text-white font-semibold tracking-wider">All Articles</h4>
              </div>
              <div className="space-y-2">
                {articlesData.map((article, index) => (
                  <div
                    key={article.id || index}
                    onClick={() => navigate(`?id=${article.id}`)}
                    className={`py-3 px-4 cursor-pointer transition-colors border-b border-gray-700 last:border-b-0 ${
                      selectedArticle && selectedArticle.id === article.id
                        ? 'bg-cyan-900 border-cyan-400'
                        : 'hover:bg-gray-700'
                    }`}
                  >
                    <h5 className="text-xs xs:text-sm sm:text-base md:text-base lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl text-white font-medium leading-tight">{article.article_title}</h5>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-gray-400 text-[10px] xs:text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-lg 3xl:text-xl">{article.category || 'Uncategorized'}</p>
                      <button className="text-cyan-400 hover:text-cyan-300 text-[10px] xs:text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-lg 3xl:text-xl font-medium transition-colors">
                        Read More →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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

export default Article;