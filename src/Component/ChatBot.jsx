import React, { useState, useRef, useEffect } from 'react';
import { apiService, chatBotStorage } from '../services/api';
import { useRequestForm } from '../context/RequestFormContext';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(() => chatBotStorage.loadState().isOpen);
  const { isRequestFormOpen } = useRequestForm();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [messages, setMessages] = useState(() => chatBotStorage.loadMessages());
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Save chat state to localStorage whenever it changes
  useEffect(() => {
    chatBotStorage.saveState(isOpen);
  }, [isOpen]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    chatBotStorage.saveMessages(messages);
  }, [messages]);

  // Track window width for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await apiService.chatbot.sendMessage({
        question: inputMessage,
        honeypot: '' // Honeypot field - should always be empty
      });

      const botMessage = {
        id: messages.length + 2,
        text: response.data.response || response.data.message || 'Sorry, I couldn\'t process your message.',
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: 'Sorry, I\'m having trouble connecting right now. Please try again later.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const clearChat = () => {
    chatBotStorage.clearMessages();
    const defaultMessage = [
      {
        id: 1,
        text: "Hello! I'm CMS Bot. How can I help you today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ];
    setMessages(defaultMessage);
  };

  // Determine if chatbot should be hidden (on mobile when request form is open)
  const shouldHideChatbot = isRequestFormOpen && windowWidth <= 390;

  return (
    <>
      {/* Floating Chat Button */}
      {!shouldHideChatbot && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 lg:bottom-6 lg:right-6 xl:bottom-8 xl:right-8 2xl:bottom-10 2xl:right-10 3xl:bottom-12 3xl:right-12 z-50">
        <button
          onClick={toggleChat}
          className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-16 lg:h-16 xl:w-18 xl:h-18 2xl:w-20 2xl:h-20 3xl:w-24 3xl:h-24 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-cyan-300"
          aria-label="Open chat"
        >
          {isOpen ? (
            <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-8 lg:h-8 xl:w-9 xl:h-9 2xl:w-10 2xl:h-10 3xl:w-12 3xl:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-8 lg:h-8 xl:w-9 xl:h-9 2xl:w-10 2xl:h-10 3xl:w-12 3xl:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </button>
      </div>
      )}

      {/* Chat Window */}
      {!shouldHideChatbot && isOpen && (
        <div className="fixed bottom-16 right-4 left-4 sm:bottom-20 sm:right-6 sm:left-6 md:bottom-24 md:right-8 md:left-auto md:w-96 lg:bottom-24 lg:right-6 lg:w-96 xl:bottom-28 xl:right-8 xl:w-[400px] 2xl:bottom-32 2xl:right-10 2xl:w-[420px] 3xl:bottom-36 3xl:right-12 3xl:w-[450px] h-[400px] sm:h-[450px] md:h-[500px] lg:h-[500px] xl:h-[550px] 2xl:h-[600px] 3xl:h-[650px] bg-white rounded-lg shadow-2xl z-40 flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-cyan-500 text-white p-3 sm:p-4 md:p-4 lg:p-4 xl:p-5 2xl:p-6 3xl:p-6 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-3 lg:space-x-3 xl:space-x-4 2xl:space-x-4 3xl:space-x-4">
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-11 xl:h-11 2xl:w-12 2xl:h-12 3xl:w-14 3xl:h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 3xl:w-9 3xl:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base md:text-base lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl">CMS Bot</h3>
                <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-lg 3xl:text-xl opacity-90">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearChat}
                className="text-white hover:text-gray-200 transition-colors p-1"
                aria-label="Clear chat history"
                title="Clear chat history"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close chat"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 3xl:w-9 3xl:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-4 lg:p-4 xl:p-5 2xl:p-6 3xl:p-6 space-y-3 sm:space-y-4 md:space-y-4 lg:space-y-4 xl:space-y-5 2xl:space-y-6 3xl:space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[250px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[320px] xl:max-w-[350px] 2xl:max-w-[380px] 3xl:max-w-[400px] px-3 sm:px-4 md:px-4 lg:px-4 xl:px-5 2xl:px-6 3xl:px-6 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-cyan-500 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-base 3xl:text-lg leading-relaxed">{message.text}</p>
                  <p className={`text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm 2xl:text-sm 3xl:text-base mt-1 ${
                    message.sender === 'user' ? 'text-cyan-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp && typeof message.timestamp.toLocaleTimeString === 'function' 
                      ? message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-3 sm:px-4 md:px-4 lg:px-4 xl:px-5 2xl:px-6 3xl:px-6 py-2 rounded-lg rounded-bl-none">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm 3xl:text-base text-gray-500 ml-2">Typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-3 sm:p-4 md:p-4 lg:p-4 xl:p-5 2xl:p-6 3xl:p-6 border-t border-gray-200">
            <div className="flex space-x-2 md:space-x-3 lg:space-x-3 xl:space-x-4 2xl:space-x-4 3xl:space-x-4">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 text-sm sm:text-base md:text-base lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-3 sm:px-4 md:px-4 lg:px-4 xl:px-5 2xl:px-6 3xl:px-6 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 3xl:w-8 3xl:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" transform="rotate(90)">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            
            {/* HONEYPOT FIELD - Hidden from users but visible to bots */}
            <input
              type="text"
              name="honeypot"
              value=""
              onChange={() => {}} // Do nothing - field should remain empty
              style={{ display: 'none' }}
              tabIndex="-1"
              autoComplete="off"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;