import React, { useState, useEffect, useRef } from "react";

// Small hook for in-view detection (for fade-in on scroll)
function useInView(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.unobserve(el); // animate once
      }
    }, options);
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return [ref, inView];
}

const Reference1 = ({
  title = "Industrial Floor Reinforcement – Warehouse A",
  images = ["/images/project-references/151F29.jpg"],
  location = "Chiang Mai, Thailand",
  monthYear = "July 2024",
  siteArea = "15000 msquare",
  contractMember = "ABC Engineering Co., Ltd.",
  layoutType = 5,
  onPrev,
  onNext,
  length = 1,
}) => {
  const getFlexLayout = () => "justify-center items-center";

  // sm/md data (max 4 thumbnails)
  const smMdImages = images.slice(0, 4);
  const [activeIdx, setActiveIdx] = useState(0);
  const activeImage = smMdImages[activeIdx] || smMdImages[0] || images[0];

  // Swipe support on sm/md — slide whole project (use onPrev/onNext)
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchDeltaX, setTouchDeltaX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [leaveDir, setLeaveDir] = useState("left"); // 'left' | 'right'

  const goNextSlide = () => {
    if (typeof onNext === "function") onNext();
  };
  const goPrevSlide = () => {
    if (typeof onPrev === "function") onPrev();
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setIsDragging(true);
    setLeaving(false);
  };
  const handleTouchMove = (e) => {
    if (touchStartX !== null) {
      setTouchDeltaX(e.touches[0].clientX - touchStartX);
    }
  };
  const handleTouchEnd = () => {
    const threshold = 50; // px
    if (Math.abs(touchDeltaX) > threshold && length > 1) {
      const dir = touchDeltaX < 0 ? "left" : "right";
      setLeaveDir(dir);
      setLeaving(true);
      // Slide out, then trigger parent navigation
      setTimeout(() => {
        if (dir === "left") goNextSlide();
        else goPrevSlide();
        // reset states for next entry
        setTouchStartX(null);
        setTouchDeltaX(0);
        setIsDragging(false);
        setLeaving(false);
      }, 220);
    } else {
      // snap back
      setTouchStartX(null);
      setTouchDeltaX(0);
      setIsDragging(false);
      setLeaving(false);
    }
  };

  // lg+ data
  const displayImages = images.slice(0, 5);

  // Only apply lg+ UI if viewport >= 1024
  const isLg = typeof window !== "undefined" && window.innerWidth >= 1024;

  // Scroll-in animations
  const [smRef, smInView] = useInView({ threshold: 0.15 });
  const [smDetailsRef, smDetailsInView] = useInView({ threshold: 0.15 });
  const [lgRef, lgInView] = useInView({ threshold: 0.15 });

  // Compute transform for sm/md main image during drag/leave
  const smTransform =
    isDragging && !leaving ? `translateX(${touchDeltaX}px)` : "translateX(0)";
  const leaveClass =
    leaving && leaveDir === "left"
      ? "-translate-x-[110%]"
      : leaving && leaveDir === "right"
      ? "translate-x-[110%]"
      : "";

  return (
    <div
      className="relative flex items-center justify-center w-full max-w-[100vw] h-auto lg:h-[unset]"
      style={
        isLg
          ? {
              width:
                window.innerWidth >= 1024 && window.innerWidth < 1280
                  ? "1024px"
                  : window.innerWidth >= 1280 && window.innerWidth < 1536
                  ? "1280px"
                  : layoutType === 2
                  ? "2400px"
                  : "2000px",
              height:
                window.innerWidth >= 1024 && window.innerWidth < 1280
                  ? "500px"
                  : window.innerWidth >= 1280 && window.innerWidth < 1536
                  ? "600px"
                  : "800px",
            }
          : undefined
      }
    >
      {/* Prev button (lg+ only) */}
      {isLg && length > 1 && (
        <button
          onClick={onPrev}
          className="absolute left-2 md:left-3 lg:left-32 top-1/2 lg:top-2/5 -translate-y-1/2 z-20 bg-white/60 text-black p-2 md:p-3 rounded-lg hover:bg-white transition-all shadow-lg"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
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
      )}

      {/* sm/md layout: centered, thumbnails centered, details below */}
      <div
        ref={smRef}
        className={`w-full lg:hidden px-3 md:px-5 py-4 transform transition-all duration-700 ease-out ${
          smInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ backgroundColor: "#000A14" }}
      >
        {/* Title */}
        <h1
          className="text-white text-xl md:text-2xl font-bold text-center mb-3"
          style={{ fontFamily: "Oswald, sans-serif" }}
        >
          {title}
        </h1>

        {/* Images container (centered, no zoom) */}
        <div className="w-full max-w-[360px] md:max-w-[640px] mx-auto overflow-hidden">
          {/* Main image with swipe between main slides */}
          <div
            className={`w-full h-[220px] md:h-[300px] rounded-sm bg-transparent flex items-center justify-center select-none transition-transform duration-300 ease-out ${leaveClass}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ transform: smTransform }}
          >
            <img
              src={activeImage}
              alt="Project main"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Thumbnails (max 4) - centered row, fixed size */}
          {smMdImages.length > 1 && (
            <div className="mt-3 flex justify-center flex-wrap gap-2 md:gap-3 mx-auto">
              {smMdImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className="focus:outline-none"
                  aria-label={`Thumbnail ${idx + 1}`}
                >
                  <div
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-sm overflow-hidden bg-transparent transition-all ${
                      activeIdx === idx
                        ? "ring-2 ring-cyan-400 ring-offset-2 ring-offset-gray-900"
                        : "opacity-85 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Project details UNDER the images container, centered with spacing below */}
        <div
          ref={smDetailsRef}
          className={`mt-4 mb-8 md:mb-10 bg-gray-800/90 text-white p-3 md:p-4 rounded-md w-[300px] md:w-[640px] max-w-full mx-auto transform transition-all duration-700 ease-out delay-150 ${
            smDetailsInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="grid grid-cols-[110px_1fr] gap-y-1 text-sm lg:text- md:text-base">
            <span className="text-gray-300">Location</span>
            <span>: {location}</span>
            <span className="text-gray-300">Site Area</span>
            <span>: {siteArea}</span>
            <span className="text-gray-300">Month/Year</span>
            <span>: {monthYear}</span>
            {contractMember && (
              <>
                <span className="text-gray-300">Contractor</span>
                <span>: {contractMember}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* lg+ original layout (unchanged) */}
      <div
        ref={lgRef}
        className={`relative h-full hidden lg:block transform transition-all duration-700 ease-out ${
          lgInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{
          backgroundColor: "#000A14",
          width:
            isLg && window.innerWidth >= 1024 && window.innerWidth < 1280
              ? "700px"
              : isLg && window.innerWidth >= 1280 && window.innerWidth < 1536
              ? "800px"
              : isLg && layoutType === 2
              ? "1400px"
              : isLg
              ? "1000px"
              : undefined,
          padding:
            isLg && window.innerWidth >= 1024 && window.innerWidth < 1280
              ? "0 80px"
              : isLg && window.innerWidth >= 1280 && window.innerWidth < 1536
              ? "0 100px"
              : isLg
              ? "0 150px"
              : undefined,
        }}
      >
        {/* Title at top center - outside image area */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 z-10"
          style={{
            width:
              isLg && window.innerWidth >= 1024 && window.innerWidth < 1280
                ? "700px"
                : isLg && window.innerWidth >= 1280 && window.innerWidth < 1536
                ? "800px"
                : "1000px",
          }}
        >
          <h1
            className="text-white text-5xl font-bold text-center m-0"
            style={{ fontFamily: "Oswald, sans-serif" }}
          >
            {title}
          </h1>
        </div>

        {/* Images Grid - Adjusted to start below title */}
        <div
          className={`absolute flex gap-3 ${getFlexLayout(
            layoutType
          )} inset-x-0 top-20`}
          style={{
            padding:
              isLg && window.innerWidth >= 1024 && window.innerWidth < 1280
                ? "0 60px"
                : isLg && window.innerWidth >= 1280 && window.innerWidth < 1536
                ? "0 80px"
                : "0 150px",
          }}
        >
          {displayImages.map((image, index) => (
            <div
              key={index}
              className={`bg-cover bg-center ${
                layoutType === 1 ? "" : "border-5 border-white"
              } ${
                layoutType === 1
                  ? ""
                  : layoutType === 4
                  ? "w-1/3 xl:w-1/4 2xl:w-2/5 3xl:w-1/2"
                  : layoutType === 3
                  ? "flex-1 xl:w-1/4 2xl:w-3/5"
                  : layoutType === 2
                  ? isLg && window.innerWidth >= 1536
                    ? "w-[600px]"
                    : "flex-1 xl:w-1/4"
                  : layoutType === 5
                  ? "w-1/5 xl:w-[15%]"
                  : "flex-1 xl:w-1/4"
              } ${
                layoutType === 1 ||
                (layoutType === 2 && isLg && window.innerWidth >= 1536)
                  ? ""
                  : "aspect-square"
              }`}
              style={{
                backgroundImage: `url(${image})`,
                height:
                  isLg && window.innerWidth >= 1024 && window.innerWidth < 1280
                    ? "300px"
                    : isLg &&
                      window.innerWidth >= 1280 &&
                      window.innerWidth < 1536
                    ? "350px"
                    : "500px",
                ...(layoutType === 1 ? { width: "100%" } : {}),
                ...(isLg &&
                window.innerWidth >= 1280 &&
                window.innerWidth < 1536 &&
                (layoutType === 3 || layoutType === 4)
                  ? { width: "250px" }
                  : {}),
              }}
              onError={(e) => {
                console.log(`Failed to load image: ${image}`);
                e.target.style.backgroundImage = "none";
                e.target.style.backgroundColor = "#f3f4f6";
                e.target.innerHTML =
                  '<div class="flex items-center justify-center h-full text-gray-500">Image not found</div>';
              }}
            >
              {layoutType !== 1 && (
                <div className="w-full h-full bg-black bg-opacity-20"></div>
              )}
            </div>
          ))}
        </div>

        {/* Project details overlay (original) */}
        <div
          className="absolute z-10 p-4 bg-gray-800 bg-opacity-80 mx-auto"
          style={{
            bottom: "12px",
            left: "50%",
            transform: "translateX(-50%)",
            maxWidth: "600px",
          }}
        >
          <div className="text-white flex justify-center items-center lg:mb-0 mb-[20px]">
            <div className="text-left">
              <div className="grid grid-cols-[120px_1fr] text-lg lg:text-sm lg:w-[450px] xl:text-base">
                <span className="text-gray-300">Location </span>
                <span>: {location}</span>

                <span className="text-gray-300">Site Area </span>
                <span>: {siteArea}</span>

                <span className="text-gray-300">Month/Year </span>
                <span>: {monthYear}</span>

                {contractMember && (
                  <>
                    <span className="text-gray-300">Contractor </span>
                    <span>: {contractMember}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next button (lg+ only) */}
      {isLg && length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-2 md:right-3 lg:right-32 top-1/2 lg:top-2/5 -translate-y-1/2 z-20 bg-white/60 text-black p-2 md:p-3 rounded-lg hover:bg-white transition-all shadow-lg"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
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
      )}
    </div>
  );
};

export default Reference1;