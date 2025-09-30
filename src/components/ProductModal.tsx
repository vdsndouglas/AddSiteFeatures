import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Download, Share2, ShoppingCart, Thermometer, Award, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
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

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  if (!product) return null;

  const specifications = [
    { label: 'Faixa de Temperatura', value: product.temperature || 'Consulte' },
    { label: 'Pressão de Trabalho', value: '10-50 bar' },
    { label: 'Diâmetro Interno', value: '1/4" a 4"' },
    { label: 'Comprimento Padrão', value: '1m a 50m' },
    { label: 'Material Interno', value: 'PTFE/Borracha' },
    { label: 'Revestimento', value: 'Aço Inox/Malha Têxtil' }
  ];

  const advantages = [
    'Alta resistência térmica',
    'Flexibilidade superior',
    'Longa durabilidade',
    'Fácil instalação',
    'Baixa manutenção',
    'Certificações internacionais'
  ];

  const relatedProducts = [
    { name: 'Conexões Especiais', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=150&fit=crop' },
    { name: 'Válvulas Térmicas', image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=200&h=150&fit=crop' },
    { name: 'Isolamento Térmico', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=150&fit=crop' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gray-50">
              <div className="flex items-center space-x-4">
                <Badge className="bg-blue-100 text-blue-800">
                  {product.category}
                </Badge>
                <h2 className="text-2xl font-normal text-gray-900">
                  {product.title}
                </h2>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="hover:bg-gray-200">
                  <Share2 className="size-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-gray-200">
                  <Download className="size-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-gray-200"
                >
                  <X className="size-5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid lg:grid-cols-2 gap-8 p-6">
                {/* Left Side - Image and Info */}
                <div className="space-y-6">
                  {/* Main Image */}
                  <div className="relative rounded-2xl overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.title}
                      className="w-full h-80 object-cover"
                    />
                    
                    {/* Temperature Badge */}
                    {product.temperature && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <Thermometer className="size-5 text-blue-500" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">Temperatura</div>
                            <div className="text-lg font-bold text-blue-600">{product.temperature}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Certifications */}
                    {product.certification && product.certification.length > 0 && (
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        {product.certification.map((cert) => (
                          <Badge key={cert} className="bg-green-500 text-white">
                            <Award className="size-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quick Info Cards */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <Thermometer className="size-8 text-blue-500 mx-auto mb-2" />
                      <div className="text-sm font-medium text-gray-900">Térmica</div>
                      <div className="text-xs text-gray-600">Alta Performance</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <Award className="size-8 text-green-500 mx-auto mb-2" />
                      <div className="text-sm font-medium text-gray-900">Certificada</div>
                      <div className="text-xs text-gray-600">Normas Internacionais</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <Zap className="size-8 text-purple-500 mx-auto mb-2" />
                      <div className="text-sm font-medium text-gray-900">Eficiente</div>
                      <div className="text-xs text-gray-600">Longa Durabilidade</div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Details */}
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Tabs */}
                  <Tabs defaultValue="features" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="features">Características</TabsTrigger>
                      <TabsTrigger value="specs">Especificações</TabsTrigger>
                      <TabsTrigger value="applications">Aplicações</TabsTrigger>
                      <TabsTrigger value="advantages">Vantagens</TabsTrigger>
                    </TabsList>

                    <TabsContent value="features" className="space-y-4">
                      <h4 className="font-medium text-gray-900">Principais Características</h4>
                      <div className="space-y-3">
                        {product.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <Check className="size-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="specs" className="space-y-4">
                      <h4 className="font-medium text-gray-900">Especificações Técnicas</h4>
                      <div className="space-y-3">
                        {specifications.map((spec, index) => (
                          <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">{spec.label}</span>
                            <span className="font-medium text-gray-900">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 mt-4">
                        * Especificações podem variar conforme aplicação. Consulte nossa equipe técnica.
                      </div>
                    </TabsContent>

                    <TabsContent value="applications" className="space-y-4">
                      <h4 className="font-medium text-gray-900">Aplicações Recomendadas</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {product.applications.map((application, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                            <div className="font-medium text-gray-900">{application}</div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="advantages" className="space-y-4">
                      <h4 className="font-medium text-gray-900">Vantagens Competitivas</h4>
                      <div className="space-y-3">
                        {advantages.map((advantage, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className="size-2 bg-blue-500 rounded-full flex-shrink-0" />
                            <span className="text-gray-600">{advantage}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button size="lg" className="flex-1 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center space-x-2">
                      <ShoppingCart className="size-5" />
                      <span>Solicitar Orçamento</span>
                    </Button>
                    <Button size="lg" variant="outline" className="flex-1 flex items-center justify-center space-x-2">
                      <Download className="size-5" />
                      <span>Baixar Ficha Técnica</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Related Products */}
              <div className="border-t bg-gray-50 p-6">
                <h4 className="font-medium text-gray-900 mb-4">Produtos Relacionados</h4>
                <div className="grid grid-cols-3 gap-4">
                  {relatedProducts.map((relatedProduct, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <ImageWithFallback
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-20 object-cover rounded-lg mb-3"
                      />
                      <div className="text-sm font-medium text-gray-900 text-center">
                        {relatedProduct.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}