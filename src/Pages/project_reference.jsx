import React, { useState, useEffect } from 'react';
import Nav from '../Component/nav';
import Reference1 from '../Component/reference_1';
import Footer from '../Component/footer';
import ChatBot from '../Component/ChatBot';
import { apiService } from '../services/api';

const ProjectReference = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectReferences = async () => {
      try {
        setLoading(true);
        const response = await apiService.projectReferences.getAll();
        
        // Sort projects by position (ascending order)
        const sortedReferences = response.data.sort((a, b) => (a.position || 999) - (b.position || 999));
        
        const transformedReferences = sortedReferences.map((project) => ({
          title: project.project_name,
          images: project.project_image || [],
          location: project.location,
          monthYear: project.date_time,
          siteArea: project.site_area,
          contractMember: project.contractor,
          layoutType: project.layout_type || 1
        }));
        
        setReferences(transformedReferences);
      } catch (err) {
        console.error('Error fetching project references:', err);
        setError('Failed to load project references');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectReferences();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (references.length <= 1) return;
      
      if (event.key === 'ArrowLeft') {
        setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : references.length - 1);
      } else if (event.key === 'ArrowRight') {
        setCurrentSlide(currentSlide < references.length - 1 ? currentSlide + 1 : 0);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide, references.length]);

  // Auto-slide functionality (optional - can be enabled)
  useEffect(() => {
    if (references.length <= 1) return;
    
    const autoSlide = setInterval(() => {
      setCurrentSlide(current => current < references.length - 1 ? current + 1 : 0);
    }, 10000); // Change slide every 10 seconds

    return () => clearInterval(autoSlide);
  }, [references.length]);

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#000A14" }}>
        <Nav />
        <div className="flex items-center justify-center h-64">
          <div className="text-white text-xl">Loading project references...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#000A14" }}>
        <Nav />
        <div className="flex items-center justify-center h-64">
          <div className="text-red-400 text-xl">{error}</div>
        </div>
      </div>
    );
  }

  if (references.length === 0) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#000A14" }}>
        <Nav />
        <div className="flex items-center justify-center h-64">
          <div className="text-white text-xl">No project references available.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#000A14" }}>
      <Nav />

      {/* Project Reference Slider - Desktop Fit */}
      <div className="flex-1 relative flex items-center justify-center">
        {references.length > 0 && (
          <Reference1
            title={references[currentSlide].title}
            images={references[currentSlide].images}
            location={references[currentSlide].location}
            monthYear={references[currentSlide].monthYear}
            siteArea={references[currentSlide].siteArea}
            contractMember={references[currentSlide].contractMember}
            layoutType={references[currentSlide].layoutType}
            onPrev={() => setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : references.length - 1)}
            onNext={() => setCurrentSlide(currentSlide < references.length - 1 ? currentSlide + 1 : 0)}
            length={references.length}
          />
        )}

        

        {/* Slide Indicators */}
        {references.length > 1 && (
          <div className="absolute bottom-4  left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex space-x-2">
              {references.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === index 
                      ? 'bg-white' 
                      : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
};

export default ProjectReference;
