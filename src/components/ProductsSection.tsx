import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Filter, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  image: string;
  temperature?: string;
  certification?: string[];
  applications: string[];
}

interface ProductsSectionProps {
  onProductClick: (product: Product) => void;
}

const products: Product[] = [
  {
    id: '1',
    title: 'Mangueira Térmica Industrial',
    category: 'Industrial',
    description: 'Mangueira térmica de alta performance para aplicações industriais extremas',
    features: [
      'Resistente a altas temperaturas (-40°C a +200°C)',
      'Alta flexibilidade e durabilidade',
      'Certificação ISO 9001',
      'Isolamento térmico superior'
    ],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
    temperature: '-40°C a +200°C',
    certification: ['ISO 9001'],
    applications: ['Petroquímica', 'Siderurgia', 'Metalurgia', 'Caldeiras']
  },
  {
    id: '2',
    title: 'Mangueira para Vapor Alimentícia',
    category: 'Alimentícia',
    description: 'Mangueira especial para vapor com certificação alimentícia FDA',
    features: [
      'Certificação FDA e ANVISA',
      'Atóxica e sem odor',
      'Resistente a vapor saturado',
      'Fácil higienização'
    ],
    image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=600&h=400&fit=crop',
    temperature: 'Até +150°C',
    certification: ['FDA', 'ANVISA'],
    applications: ['Indústria Alimentícia', 'Laticínios', 'Cervejarias', 'Frigoríficos']
  },
  {
    id: '3',
    title: 'Mangueira Criogênica',
    category: 'Criogênica',
    description: 'Mangueira especializada para transferência de gases liquefeitos',
    features: [
      'Isolamento térmico avançado',
      'Resistente a temperaturas criogênicas',
      'Baixa permeabilidade',
      'Construção multicamadas'
    ],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop',
    temperature: '-196°C a +80°C',
    certification: ['CE', 'ASME'],
    applications: ['GNL', 'Oxigênio Líquido', 'Nitrogênio Líquido', 'Argônio Líquido']
  },
  {
    id: '4',
    title: 'Mangueira para Aquecimento Solar',
    category: 'Solar',
    description: 'Mangueira específica para sistemas de aquecimento solar residencial',
    features: [
      'Resistente a UV',
      'Isolamento térmico otimizado',
      'Longa durabilidade',
      'Fácil instalação'
    ],
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop',
    temperature: '-10°C a +120°C',
    certification: ['INMETRO'],
    applications: ['Residencial', 'Hotéis', 'Piscinas', 'Hospitais']
  },
  {
    id: '5',
    title: 'Mangueira Hospitalar',
    category: 'Hospitalar',
    description: 'Mangueira para uso médico e hospitalar com certificações sanitárias',
    features: [
      'Grau médico',
      'Biocompatível',
      'Esterilizável',
      'Flexibilidade superior'
    ],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
    temperature: '-20°C a +80°C',
    certification: ['ANVISA', 'ISO 13485'],
    applications: ['Hospitais', 'Clínicas', 'Laboratórios', 'UTIs']
  },
  {
    id: '6',
    title: 'Mangueira Flexível Metálica',
    category: 'Industrial',
    description: 'Mangueira metálica flexível para alta pressão e temperatura',
    features: [
      'Construção em aço inox',
      'Alta pressão de trabalho',
      'Resistente à corrosão',
      'Vida útil prolongada'
    ],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
    temperature: '-200°C a +600°C',
    certification: ['ASME', 'ISO 9001'],
    applications: ['Refinarias', 'Químicas', 'Farmacêuticas', 'Energia']
  }
];

const categories = ['Todos', 'Industrial', 'Alimentícia', 'Criogênica', 'Solar', 'Hospitalar'];

export default function ProductsSection({ onProductClick }: ProductsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-normal text-gray-900 mb-6">
            Produtos em Destaque
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conheça nossa linha completa de mangueiras térmicas, desenvolvidas com tecnologia de ponta para atender às necessidades mais exigentes do mercado.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row gap-6 mb-12"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-blue-500 hover:bg-blue-600" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                    onClick={() => onProductClick(product)}>
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-gray-100">
                        {product.category}
                      </Badge>
                    </div>
                    {product.certification && (
                      <div className="absolute top-4 right-4 flex flex-wrap gap-1">
                        {product.certification.slice(0, 2).map((cert) => (
                          <Badge key={cert} className="bg-green-500 text-white text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <CardTitle className="mb-2 text-xl group-hover:text-blue-500 transition-colors">
                    {product.title}
                  </CardTitle>
                  <CardDescription className="mb-4 text-gray-600">
                    {product.description}
                  </CardDescription>

                  {/* Temperature Range */}
                  {product.temperature && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm font-medium text-blue-700">Faixa de Temperatura</div>
                      <div className="text-lg font-bold text-blue-600">{product.temperature}</div>
                    </div>
                  )}

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {product.features.slice(0, 2).map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                        <Check className="size-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center space-x-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      onProductClick(product);
                    }}
                  >
                    <span>Saiba Mais</span>
                    <ArrowRight className="size-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Products Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button 
            size="lg"
            variant="outline" 
            className="hover:bg-blue-50 hover:border-blue-500 hover:text-blue-500"
          >
            Ver Todos os Produtos
          </Button>
        </motion.div>
      </div>
    </section>
  );
}