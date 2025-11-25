import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendar,
  faChartArea,
} from "@fortawesome/free-solid-svg-icons";

const HeroProjectReference = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Fetch favorite projects from API
  useEffect(() => {
    const fetchFavoriteProjects = async () => {
      try {
        setLoading(true);
        const response = await apiService.projectReferences.getFavorites();

        // Transform API data to match component format
        const transformedProjects = response.data.map((project) => ({
          id: project.id,
          title: project.project_name,
          image:
            project.project_image?.[0] ||
            "/images/project-references/default.jpg", // Use first image
          description: `${project.location} - ${project.date_time}`,
          location: project.location,
          site_area: project.site_area,
          date_time: project.date_time,
          contractor: project.contractor,
          layout_type: project.layout_type,
          project_image: project.project_image,
        }));

        setProjects(transformedProjects);
      } catch (err) {
        console.error("Error fetching favorite projects:", err);
        setError("Failed to load project references");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteProjects();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Touch handlers for swipe gestures
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && currentSlide < projects.length - 1) {
      nextSlide();
    }
    if (isRightSwipe && currentSlide > 0) {
      prevSlide();
    }
  };

  const handleViewProjectReferences = () => {
    navigate("/projects-reference");
  };

  const currentProject = projects[currentSlide];

  if (loading) {
    return (
      <section className="bg-white py-8">
        <div className="max-w-[1370px] mx-auto px-4">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 text-left">
              PROJECT REFERENCES
            </h2>
          </div>
          <div className="h-[600px] bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-gray-500">Loading project references...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white py-8">
        <div className="max-w-[1370px] mx-auto px-4">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 text-left">
              PROJECT REFERENCES
            </h2>
          </div>
          <div className="h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-red-500 mb-2">⚠️ {error}</div>
              <div className="text-gray-500 text-sm">
                Please check your connection and try again
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="bg-white py-8">
        <div className="max-w-[1370px] mx-auto px-4">
          <div className="mb-6 mr-3">
            <h2 className="text-3xl font-bold text-gray-900 text-left">
              PROJECT REFERENCES
            </h2>
          </div>
          <div className="h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">💝</div>
              <div className="text-gray-600 text-lg font-medium mb-2">
                No Favorite Projects Selected
              </div>
              <div className="text-gray-500 text-sm">
                Please select up to 4 favorite project references from the admin
                panel to display here
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-8">
      <div className="max-w-[1370px] mx-auto px-4 2xl:px-4 xl:px-[85px]">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-3xl 3xl:text-5xl md:text-3xl sm:text-xl font-bold text-gray-900">
            PROJECT REFERENCES
          </h2>
          {/* See More Button - Right */}
          <div className="hidden relative md:inline-flex md:items-center">
            <div className="absolute left-0 top-0 bottom-0 w-2 3xl:w-3 bg-cyan-400" />
            <button
              onClick={handleViewProjectReferences}
              className="bg-[#000A14] hover:bg-blue-800 text-white px-4 py-2 pl-6 3xl:px-6 3xl:py-3 3xl:pl-8 shadow-lg transition-all duration-300 flex items-center gap-2 3xl:gap-3"
            >
              <span className="text-sm 3xl:text-xl font-medium">
                See More Project References
              </span>
              <svg
                className="w-4 h-4 3xl:w-6 3xl:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Card Container */}
        <div className="relative h-[200px] sm:h-[200px] md:h-[500px] xl:h-[600px] 2xl:h-[600px] flex items-center justify-center overflow-hidden shadow-lg">
          <div
            className="w-full h-full md:w-[80%] md:h-[80%] lg:w-full lg:h-full bg-cover 2xl:bg-contain bg-no-repeat bg-center relative transition-all duration-500"
            style={{ backgroundImage: `url('${currentProject.image}')` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Navigation Arrows - Hidden on sm and md breakpoints */}
            <button
              onClick={prevSlide}
              className="absolute sm:hidden md:hidden lg:inline left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 transition-all duration-300 z-20 p-2 rounded-lg"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute sm:hidden md:hidden lg:inline right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 transition-all duration-300 z-20 p-2 rounded-lg"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Content Overlay */}
            <div className="absolute bottom-0.5 sm:bottom-1 left-2 sm:left-3 right-2 sm:right-3 z-10">
              <div className="max-w-4xl">
                <h3 className=" 3xl:text-4xl 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-lg sm:text-[10px] font-bold text-white bg-gray-900 inline-block px-3 sm:px-2 py-1 sm:py-1 mb-1 sm:mb-1 3xl:px-1 3xl:py-2 transition-all duration-500 mr-2">
                  {currentProject.title}
                </h3>
                {currentProject.location && (
                  <p className="3xl:text-2xl 2xl:text-xl xl:text-lg lg:text-base md:text-lg sm:text-[8px] text-white bg-black bg-opacity-50 inline-block px-1 sm:px-2 py-0.5 sm:py-1">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="sm:w-[10px] sm:h-[8px] 3xl:w-[24px] 3xl:h-[20px] 2xl:w-[22px] 2xl:h-[18px] xl:w-[20px] xl:h-[16px] lg:w-[20px] lg:h-[16px] md:w-[20px] md:h-[16px] w-[16px] h-[12px]"
                    />
                    {currentProject.location} |
                    <FontAwesomeIcon
                      icon={faCalendar}
                      className="sm:w-[10px] sm:h-[8px] 3xl:w-[24px] 3xl:h-[20px] 2xl:w-[22px] 2xl:h-[18px] xl:w-[20px] xl:h-[16px] lg:w-[20px] lg:h-[16px] md:w-[20px] md:h-[16px] w-[16px] h-[12px]"
                    />
                    {currentProject.date_time} |
                    <FontAwesomeIcon
                      icon={faChartArea}
                      className="sm:w-[10px] sm:h-[8px] 3xl:w-[24px] 3xl:h-[20px] 2xl:w-[22px] 2xl:h-[18px] xl:w-[20px] xl:h-[16px] lg:w-[20px] lg:h-[16px] md:w-[20px] md:h-[16px] w-[16px] h-[12px]"
                    />
                    {currentProject.site_area}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Centered Dots Navigation */}
        <div className="flex justify-center mt-4">
          <div className="flex space-x-3">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-gray-900"
                    : "bg-gray-400 hover:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroProjectReference;
