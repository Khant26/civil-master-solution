import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from '../context/LanguageContext';
import { useHomePageData } from '../hooks/useApiQueries';
import Nav from "../Component/nav";
import Footer from "../Component/footer";
import LogoLoop from "../Component/LogoLoop";
import HeroProjectReference from "../Component/hero_project_reference";
import PartnerCard from "../Component/partner_card";
import ChatBot from "../Component/ChatBot";
import LoadingSpinner from "../components/LoadingSpinner";
import "./home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Home = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { partnerships, isLoading, isError, error } = useHomePageData();

  // Transform data using useMemo for performance - MUST be called before conditional returns
  const transformedPartners = useMemo(() => {
    return partnerships.map((partner, index) => {
      const imageUrl = partner.partner_image?.[0];
      const fallbackImage = `https://via.placeholder.com/100x80/4B5563/FFFFFF?text=${encodeURIComponent(
        partner.partner_name || "Partner"
      )}`;
      const finalImage = imageUrl && imageUrl.trim() !== "" ? imageUrl : fallbackImage;

      return {
        node: (
          <PartnerCard
            key={`partner-${partner.id || index}`}
            name={partner.partner_name}
            image={finalImage}
            type="partner"
          />
        ),
        title: partner.partner_name,
      };
    });
  }, [partnerships]);



  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <LoadingSpinner 
          fullScreen={false} 
          size="large" 
          text="Loading content..." 
        />
        <ChatBot />
      </div>
    );
  }

  // Show error state if API calls fail
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">Failed to load page content. Please try again.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
        <ChatBot />
      </div>
    );
  }

  const handleViewProducts = () => {
    navigate("/product");
  };

  return (
    <div className="min-h-screen bg-000A14">
      {/* Hero Section */}
      <hero className="h-screen block relative">
        <section
          className="relative px-4 md:px-6 lg:px-8 py-6 h-[85vh] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/backgrounds/floor-2.png')" }}
        >
          <div className="absolute top-0 left-0 right-0 z-50">
            <Nav />
          </div>
          <div className="max-w-7xl xl:px-[80px] 2xl:px-[0px] 3xl:px-[0px] mx-auto flex items-center sm:justify-center md:justify-center lg:justify-center h-full relative z-10">
            {/* Left Content */}
            <div className="flex-1 max-w-2xl flex flex-col items-center sm:items-center md:items-center lg:items-center xl:items-start sm:pb-8 md:pb-8 lg:pb-8 xl:pb-0 2xl:pb-8 3xl:pb-8 pt-12">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-7xl 2xl:text-9xl 3xl:text-9xl font-bold text-white mb-4 lg:mb-6 2xl:mb-6 3xl:mb-6 tracking-tight font-oswald mt-auto text-center sm:text-center md:text-center lg:text-center xl:text-left">
                <span className="sm:inline md:inline lg:inline xl:block">CIVIL</span>{" "}
                <span className="sm:inline md:inline lg:inline xl:block">MASTER</span>{" "}
                <span className="sm:inline md:inline lg:inline xl:block">SOLUTION</span>
              </h1>
              <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-xl 2xl:text-2xl 3xl:text-2xl mb-6 lg:mb-8 2xl:mb-8 3xl:mb-8 max-w-lg font-poppins font-light tracking-wide text-center sm:text-center md:text-center lg:text-center xl:text-left">
                Leading specialist of industrial floor solution in Thailand
              </p>
                <div className="relative inline-flex items-center mx-auto sm:mx-auto md:mx-auto lg:mx-0">
                <div className="absolute left-0 top-0 bottom-0 w-2 lg:w-3 2xl:w-3 3xl:w-3 bg-cyan-400"></div>
                <button
                  onClick={handleViewProducts}
                  className="bg-white text-gray-900 px-6 lg:px-8 xl:px-10 2xl:px-10 3xl:px-10 py-3 lg:py-4 2xl:py-4 3xl:py-4 pl-6 lg:pl-8 2xl:pl-8 3xl:pl-8 text-sm lg:text-base 2xl:text-base 3xl:text-base font-semibold font-poppins hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  {t('common.viewProducts')}
                </button>
              </div>
            </div>

            {/* Product Images - Positioned to match reference */}
            <div className="hidden xl:block xl:flex-1 xl:relative xl:h-full xl:transform xl:origin-center xl:scale-75 xl:w-[]  2xl:scale-95 3xl:scale-100">
              {/* Top right image - metal bars */}
              <div
                className="absolute right-3 lg:right-4 xl:right-1 2xl:right-6 3xl:right-6 top-12 lg:top-10 xl:top-13 2xl:top-20 3xl:top-20 w-32 lg:w-40 xl:w-48 2xl:w-48 3xl:w-48 h-32 lg:h-40 xl:h-48 2xl:h-48 3xl:h-48 shadow-lg overflow-hidden"
                style={{ border: "3px solid white" }}
              >
                <img
                  src="/images/heroSection/product1.jpg"
                  alt="Product 1"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Center image - squares */}
              <div
                className="absolute right-24 lg:right-32 xl:right-14 xl:top-[220px] 2xl:right-40 3xl:right-40 top-[30%] lg:top-[170px] 2xl:top-1/3 3xl:top-1/3 w-40 lg:w-52 xl:w-60 2xl:w-60 3xl:w-60 h-40 lg:h-52 xl:h-60 2xl:h-60 3xl:h-60 shadow-lg overflow-hidden"
                style={{ border: "3px solid white" }}
              >
                <img
                  src="/images/heroSection/product2.jpg"
                  alt="Product 2"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom left image - construction site */}
              <div
                className="absolute left-8  xl:left-14 2xl:left-14 3xl:left-14 bottom-8 lg:bottom-[-10px] lg:left-[-5px] xl:bottom-12 2xl:bottom-12 3xl:bottom-12 w-36 lg:w-44 xl:w-52 2xl:w-52 3xl:w-52 h-36 lg:h-44 xl:h-52 2xl:h-52 3xl:h-52 shadow-lg overflow-hidden"
                style={{ border: "3px solid white" }}
              >
                <img
                  src="/images/heroSection/product3.png"
                  alt="Product 3"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom right image - fibers */}
              <div
                className="absolute lg:right-[1px] 2xl:right-2 3xl:right-2 bottom-12 lg:bottom-4 xl:bottom-10 2xl:bottom-20 3xl:bottom-20 w-40 lg:w-48 xl:w-56 2xl:w-56 3xl:w-56 h-40 lg:h-48 xl:h-56 2xl:h-56 3xl:h-56 shadow-lg overflow-hidden"
                style={{ border: "3px solid white" }}
              >   
                <img
                  src="/images/heroSection/product4.jpg"
                  alt="Product 4"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section
          className="h-[15vh] min-h-[120px] relative"
          style={{ backgroundColor: "#000A14" }}
        >
          <div className="absolute inset-0 flex items-center justify-center gap-12 md:gap-20 lg:gap-32 xl:gap-48 2xl:gap-60 3xl:gap-60 px-4">
            <div className="text-center">
              <h3 className="text-cyan-400 text-[15px] md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-5xl font-bold mb-2 lg:mb-3 2xl:mb-3 3xl:mb-3">
                &gt; 1,000,000
              </h3>
              <p className="text-gray-200 text-[10px] md:text-xs lg:text-sm 2xl:text-sm 3xl:text-sm">
                SQ.M FLOORING AREA
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-cyan-400 text-[15px] md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-5xl font-bold mb-2 lg:mb-3 2xl:mb-3 3xl:mb-3">
                &gt; 100
              </h3>
              <p className="text-gray-200 text-[10px] md:text-xs lg:text-sm 2xl:text-sm 3xl:text-sm">
                PROJECTS COMPLETED
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-cyan-400 text-[15px] md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-5xl font-bold mb-2 lg:mb-3 2xl:mb-3 3xl:mb-3">
                &gt; 10
              </h3>
              <p className="text-gray-200 text-[10px] md:text-xs lg:text-sm 2xl:text-sm 3xl:text-sm">
                YEARS EXPERIENCES
              </p>
            </div>
          </div>
        </section>
      </hero>

      {/* Mobile/Tablet Swiper - Show only below lg */}
      <div className="block lg:hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          loop={true}
        >
          <SwiperSlide>
            {/* About Us Slide */}
            <div className="py-12 px-6" style={{ backgroundColor: "#222E3B" }}>
              <div className="mt-2 ml-0">
                <div className="flex flex-row items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white  flex items-center justify-center">
                    About Us
                  </h2>
                  <img
                    src="/images/logo.png"
                    alt="DUCTIL"
                    className="h-12 mb-4"
                  />
                </div>
                <div className="mb-3">
                  <h3 className="text-white text-base md:text-lg lg:text-xl 2xl:text-xl 3xl:text-3xl font-bold mb-2 text-center">
                    CMS is a leading specialist in industrial flooring in
                    Thailand.
                  </h3>
                </div>
                <p className="text-white text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-3xl 3xl:text-4xl leading-relaxed text-justify">
                  Founded with a vision to provide durable, safe, and
                  high-performance flooring systems, we have grown into a
                  trusted partner for factories, warehouses, logistics centers,
                  and commercial facilities. Our success comes from engineering
                  smarter solutions, not just selling products. We deliver
                  world-class, tested materials with expert guidance from design
                  to on-site supervision. With custom-fit solutions and a
                  reputation built on trust, we help industries build stronger
                  foundations for the future.
                 
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            {/* Announcement Slide */}
            <div className="py-12 px-5 bg-white">
              <div className="flex items-center justify-between mb-4">
                <img
                  src="/images/ductil-logo.png"
                  alt="DUCTIL"
                  className="h-16"
                />
                <h2 className="text-2xl sm:text-xl -ml-1 font-bold text-gray-900 text-center">
                  Announcement
                </h2>
              </div>
              <div className="mb-3">
                <h3 className="text-base font-bold text-gray-900 mb-2 text-center">
                  CMS has officially partnered with Ductil GmbH.
                </h3>
              </div>
              <p className="text-gray-600 text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-3xl 3xl:text-4xl leading-relaxed text-justify">
                Through this collaboration, we are joining forces with Ductil
                GmbH, a German company led by Dr. Ralf Winterberg, who brings
                nearly 30 years of expertise in fiber technology. This
                partnership combines CMS's deep understanding of the local
                market with Ductil's cutting-edge German engineering and
                innovation. Together, we will deliver international-quality,
                next-generation steel fiber solutions tailored to the unique
                demands of Thailand's industrial sector.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Desktop Section - Show only lg and above */}
<section className="hidden lg:grid grid-cols-1 lg:grid-cols-2">

  {/* LEFT : About Us */}
  <div
    className="bg-[#222E3B] px-8 xl:px-16 py-16"
  >
    {/* Header block (fixed height for alignment) */}
    <div className="min-h-[100px] flex flex-col justify-end">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl xl:text-4xl font-bold text-white">
          About Us
        </h2>

        <img
          src="/images/logo.png"
          alt="CMS"
          className="h-14 xl:h-16"
        />
      </div>

      <h3 className="mt-6 mb-8 text-lg xl:text-xl font-bold text-white">
        CMS is a leading specialist in industrial flooring in Thailand.
      </h3>
    </div>

    {/* Paragraph */}
    <p className="text-white text-base xl:text-lg leading-relaxed text-justify">
      Founded with a vision to provide durable, safe, and high-performance
      flooring systems, we have grown into a trusted partner for factories,
      warehouses, logistics centers, and commercial facilities. Our success
      comes from engineering smarter solutions, not just selling products.
      We deliver world-class, tested materials with expert guidance from
      design to on-site supervision. With custom-fit solutions and a
      reputation built on trust, we help industries build stronger
      foundations for the future.
    </p>
  </div>

  {/* RIGHT : Announcement */}
  <div
    className="bg-white px-8 xl:px-16 py-16"
  >
    {/* Header block (same height as left) */}
    <div className="min-h-[100px] flex flex-col justify-end">
      <div className="flex items-center justify-between">
        <img
          src="/images/ductil-logo.png"
          alt="DUCTIL"
          className="h-16 xl:h-20"
        />

        <h2 className="text-3xl xl:text-4xl font-bold text-gray-900">
          Announcement
        </h2>
      </div>

      <h3 className="mt-6 mb-8 text-lg xl:text-xl font-bold text-gray-900">
        CMS has officially partnered with Ductil GmbH.
      </h3>
    </div>

    {/* Paragraph */}
    <p className="text-gray-600 text-base xl:text-lg leading-relaxed text-justify">
      Through this collaboration, we are joining forces with Ductil GmbH, a
      German company led by Dr. Ralf Winterberg, who brings nearly 30 years
      of expertise in fiber technology. This partnership combines CMS’s deep
      understanding of the local market with Ductil’s cutting-edge German
      engineering and innovation. Together, we will deliver
      international-quality, next-generation steel fiber solutions tailored
      to the unique demands of Thailand’s industrial sector.
    </p>
  </div>

</section>

      {/* Services Section */}
      <section
        className="py-12 lg:py-14 xl:py-16 2xl:py-16 3xl:py-16"
        style={{ backgroundColor: "#000A14" }}
      >
        <div className="max-w-[1370px] mx-auto px-4 lg:px-6 xl:px-[85px] 2xl:px-8 3xl:px-8">
          <h2 className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-4xl 3xl:text-4xl font-bold text-white mb-8 lg:mb-10 xl:mb-12 2xl:mb-12 3xl:mb-12">
            OUR SERVICES
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 2xl:gap-20 3xl:gap-20">
            {/* On-Site Supervision */}
            <div className="relative">
              <div
                className="h-64 lg:h-80 xl:h-96 2xl:h-96 3xl:h-96 bg-cover bg-center relative"
                style={{
                  backgroundImage: "url('/images/services/service2.png')",
                }}
              >
                <div className="absolute bottom-4 lg:bottom-5 xl:bottom-6 2xl:bottom-6 3xl:bottom-6 left-4 lg:left-5 xl:left-6 2xl:left-6 3xl:left-6">
                  <h3 className="text-xl lg:text-2xl xl:text-3xl 2xl:text-3xl 3xl:text-3xl font-bold text-white -mb-4">
                    ON-SITE SUPERVISION
                  </h3>
                </div>
              </div>
              <div className="p-4 lg:p-5 xl:p-6 2xl:p-6 3xl:p-6 bg-gray-800">
                <p className="text-white sm:text-xs md:text-sm lg:text-base 2xl:text-xl 3xl:text-xl 2xl:mb-[20px] leading-relaxed text-justify">
                  Our specialists offer on-site supervision to guarantee that
                  floor installation and construction processes meet high
                  quality standards. We oversee every step to ensure quality,
                  safety, and efficiency, delivering results that exceed client
                  expectations.
                  <br />
                  <br />
                  
                </p>
              </div>
            </div>

            {/* Consultancy */}
            <div className="relative">
              <div
                className="h-64 lg:h-80 xl:h-96 2xl:h-96 3xl:h-96 bg-cover bg-center relative"
                style={{
                  backgroundImage: "url('/images/services/service.png')",
                }}
              >
                <div className="absolute bottom-4 lg:bottom-5 xl:bottom-6 2xl:bottom-6 3xl:bottom-6 left-4 lg:left-5 xl:left-6 2xl:left-6 3xl:left-6">
                  <h3 className="text-xl lg:text-2xl xl:text-3xl 2xl:text-3xl 3xl:text-3xl font-bold text-white -mb-4">
                    CONSULTATION
                  </h3>
                </div>
              </div>
              <div className="p-4 lg:p-5 lg:pb-[44px] xl:p-6 2xl:pb-[45px] 2xl:p-6 3xl:pb-[45px] 3xl:p-6 bg-gray-800">
                <p className="text-white sm:text-xs md:text-sm lg:text-base 2xl:text-xl 3xl:text-xl leading-relaxed text-justify">
                  We provide expert consultation to help clients select the most
                  suitable industrial floor solutions. From assessing site
                  conditions to recommending materials and techniques, our team
                  ensures every project starts with the right strategy for
                  long-lasting performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project References Section */}
      <HeroProjectReference />

      {/* Partners Section */}
      <section className="bg-gray-900 py-3 " style={{ overflow: "hidden" }}>
        <div
          className="max-w-[1330px] mx-auto px-4 lg:px-6 xl:px-[85px] 2xl:px-8 3xl:px-8"
          style={{ overflow: "hidden" }}
        >
          <h2 className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-4xl 3xl:text-4xl font-bold text-white text-center mb-3 lg:mb-4 2xl:mb-4 3xl:mb-4">
            {t('home.partners')}
          </h2>

          {isLoading ? (
            <div className="text-center text-white mb-8 lg:mb-10 xl:mb-12 2xl:mb-12 3xl:mb-12">
              {t('common.loading')}
            </div>
          ) : error ? (
            <div className="text-center text-red-400 mb-8 lg:mb-10 xl:mb-12 2xl:mb-12 3xl:mb-12">
              {error?.message || 'Failed to load partnerships'}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6 xl:gap-8 2xl:gap-8 3xl:gap-8 mb-4 lg:mb-5 2xl:mb-5 3xl:mb-5">
              {transformedPartners.slice(0, 8).map((partner, index) => (
                <div key={index} className="flex justify-center">
                  {partner.node}
                </div>
              ))}
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

export default Home;
