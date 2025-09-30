import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp } from 'lucide-react';
import { Button } from './components/ui/button';
import { Toaster } from 'sonner@2.0.3';

// Import critical components immediately
import Header from './components/Header';
import Hero from './components/Hero';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load non-critical components
const ProductsSection = lazy(() => import('./components/ProductsSection'));
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'));
const FAQ = lazy(() => import('./components/FAQ'));
const ContactCTA = lazy(() => import('./components/ContactCTA'));
const Footer = lazy(() => import('./components/Footer'));
const ContactModal = lazy(() => import('./components/ContactModal'));
const ProductModal = lazy(() => import('./components/ProductModal'));
const WhatsAppChat = lazy(() => import('./components/WhatsAppChat'));

export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Performance optimization: preload critical resources
  useEffect(() => {
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop&auto=format&q=75';
    document.head.appendChild(preloadLink);

    return () => {
      document.head.removeChild(preloadLink);
    };
  }, []);

  // Handle scroll to show scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Smooth scroll to section with error handling
  const scrollToSection = (sectionId: string) => {
    try {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 120; // Account for fixed header
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    } catch (error) {
      console.warn('Error scrolling to section:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ willChange: 'auto' }}>
      {/* Header */}
      <Header 
        onContactClick={() => setIsContactModalOpen(true)}
        onNavigate={scrollToSection}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="inicio">
          <Hero onContactClick={() => setIsContactModalOpen(true)} />
        </section>

        {/* Lazy loaded sections with fallback */}
        <Suspense fallback={<LoadingSpinner />}>
          {/* Products Section */}
          <section id="produtos">
            <ProductsSection onProductClick={setSelectedProduct} />
          </section>

          {/* Services Section */}
          <section id="servicos">
            <ServicesSection />
          </section>

          {/* Why Choose Us Section */}
          <section id="sobre">
            <WhyChooseUs />
          </section>

          {/* FAQ Section */}
          <section id="faq">
            <FAQ />
          </section>

          {/* Contact CTA Section */}
          <section id="contato">
            <ContactCTA onContactClick={() => setIsContactModalOpen(true)} />
          </section>
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={<div className="h-32 bg-gray-100"></div>}>
        <Footer onNavigate={scrollToSection} />
      </Suspense>

      {/* Modals - Only render when needed */}
      <Suspense fallback={null}>
        {isContactModalOpen && (
          <ContactModal
            isOpen={isContactModalOpen}
            onClose={() => setIsContactModalOpen(false)}
          />
        )}

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}

        {/* WhatsApp Chat */}
        <WhatsAppChat />
      </Suspense>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={scrollToTop}
              size="icon"
              className="rounded-full shadow-lg bg-blue-500 hover:bg-blue-600 text-white"
            >
              <ChevronUp className="size-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'white',
            color: '#374151',
            border: '1px solid #e5e7eb',
          },
        }}
      />
    </div>
  );
}