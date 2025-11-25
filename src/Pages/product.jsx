import React, { useState, useEffect } from "react";
import Nav from "../Component/nav";
import ProductCard from "../Component/product_card";
import Footer from "../Component/footer";
import ChatBot from "../Component/ChatBot";
import { apiService } from "../services/api";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiService.products.getAll();

        // Sort products by position (ascending order)
        const sortedProducts = response.data.sort(
          (a, b) => (a.position || 999) - (b.position || 999)
        );

        // Transform API data to match the expected format
        const transformedProducts = sortedProducts.map((product, index) => ({
          title: product.product_name,
          description: product.product_description,
          main_applicationPoints: product.main_application || [],
          benefit: product.benefit || [],
          performance: product.performance || [],
          images: product.product_image || [],
          imagePosition: index % 2 === 0 ? "left" : "right", // Alternate positioning
          theme: index % 2 === 0 ? "dark" : "light", // Alternate themes
        }));

        setProducts(transformedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#000A14" }}>
        <Nav />
        <div className="flex items-center justify-center h-64">
          <div className="text-white text-xl">Loading products...</div>
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#000A14" }}>
      <Nav />

      {/* Hero Section */}
      <section
        className="text-white py-16"
        style={{ backgroundColor: "#000A14" }}
      >
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-bold mb-8 3xl:text-7xl">
            <span className="text-cyan-400">Civil Master Solution</span>(CMS)
          </h1>
          <p className="md:text-gray-300 sm:text-sm md:text-lg lg-text-xl md:max-w-6xl md:mx-auto md:leading-relaxed xl:text-xl  lg:text-center 2xl:text-2xl 3xl:text-2xl">
            We go beyond simply selling flooring materials, we enhance complete
            solutions. As structural design engineers, our focus is to
            understand your projects requirements and select the right products
            for the right application, ensuring performance, safety, and
            long-term value. Our products meet international quality standards
            and have been carefully selected and tested to ensure it can be
            designed, applied, and perform effectively in real projects.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section style={{ backgroundColor: "#000A14" }}>
        <div className="w-full ">
          {products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard
                key={index}
                title={product.title}
                description={product.description}
                main_applicationPoints={product.main_applicationPoints}
                benefit={product.benefit}
                performance={product.performance}
                images={product.images}
                imagePosition={product.imagePosition}
                theme={product.theme}
                layout={index % 2 === 0 ? 1 : 2} // Alternate layouts
              />
            ))
          ) : (
            <div className="text-center text-gray-600">
              No products available at the moment.
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

export default Product;
