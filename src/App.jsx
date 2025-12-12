import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RequestFormProvider } from './context/RequestFormContext';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load components
const Home = lazy(() => import('./Pages/home'));
const Product = lazy(() => import('./Pages/product'));
const ProjectReference = lazy(() => import('./Pages/project_reference'));
const NewArticle = lazy(() => import('./Pages/new_article'));
const New = lazy(() => import('./Pages/new'));
const Article = lazy(() => import('./Pages/article'));
const NotFound = lazy(() => import('./Pages/NotFound'));

function App() {
  return (
    <RequestFormProvider>
      <Router>
        <Suspense fallback={<LoadingSpinner fullScreen={true} size="large" text="Loading page..." />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/projects-reference" element={<ProjectReference />} />
            <Route path="/news-article" element={<NewArticle />} />
            <Route path="/new" element={<New />} />
            <Route path="/article" element={<Article />} />
            {/* Catch all unmatched routes - Must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </RequestFormProvider>
  );
}

export default App;
