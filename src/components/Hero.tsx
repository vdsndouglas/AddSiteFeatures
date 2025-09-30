import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { memo } from 'react';

interface HeroProps {
  onContactClick: () => void;
}

const Hero = memo(function Hero({ onContactClick }: HeroProps) {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-blue-700 min-h-screen flex items-center pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-blue-100/20 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-100/30"
            >
              <Star className="size-4 text-blue-100" />
              <span className="text-blue-100 text-sm">Especialistas em Mangueiras Térmicas</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-6xl font-normal leading-tight"
            >
              YSO Melt
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-blue-100 leading-relaxed"
            >
              Soluções térmicas de alta performance para sua empresa
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-blue-50 text-lg leading-relaxed max-w-2xl"
            >
              Há mais de 20 anos fornecendo mangueiras térmicas de qualidade superior para os mais diversos segmentos industriais. Tecnologia, segurança e eficiência em cada produto.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button 
                size="lg"
                className="bg-white text-blue-500 hover:bg-blue-50 font-medium flex items-center space-x-2"
                onClick={() => document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Ver Produtos</span>
                <ArrowRight className="size-5" />
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-500 font-medium bg-[rgba(21,25,245,1)]"
                onClick={onContactClick}
              >
                Solicitar Orçamento
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-8 pt-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white">20+</div>
                <div className="text-blue-100 text-sm">Anos de Experiência</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">1000+</div>
                <div className="text-blue-100 text-sm">Projetos Realizados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-blue-100 text-sm">Suporte Técnico</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop&auto=format&q=75"
                alt="Mangueiras térmicas industriais"
                className="w-full h-96 lg:h-[500px] object-cover"
                loading="eager"
              />
              
              {/* Overlay with floating elements */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              {/* Floating Quality Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">ISO</div>
                  <div className="text-xs text-gray-600">9001</div>
                </div>
              </motion.div>

              {/* Temperature Range Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg"
              >
                <div className="text-sm font-medium text-gray-800">Temperatura</div>
                <div className="text-lg font-bold text-blue-500">-40°C a +200°C</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default Hero;