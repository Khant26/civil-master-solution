import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RequestFormProvider } from './context/RequestFormContext';
import Home from './Pages/home';
import Product from './Pages/product';
import ProjectReference from './Pages/project_reference';
import NewArticle from './Pages/new_article';
import New from './Pages/new';
import Article from './Pages/article';

function App() {
  return (
    <RequestFormProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/projects-reference" element={<ProjectReference />} />
          <Route path="/news-article" element={<NewArticle />} />
          <Route path="/new" element={<New />} />
          <Route path="/article" element={<Article />} />
        </Routes>
      </Router>
    </RequestFormProvider>
  );
}

export default App;
