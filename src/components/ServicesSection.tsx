import { motion } from 'motion/react';
import { Wrench, Users, ClipboardCheck, ArrowRight, Clock, Award, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

const services = [
  {
    id: '1',
    title: 'Instalação e Manutenção',
    category: 'Manutenção',
    description: 'Serviço completo de instalação e manutenção preventiva/corretiva de sistemas térmicos',
    icon: Wrench,
    features: [
      'Equipe técnica certificada',
      'Atendimento 24/7 para emergências',
      'Garantia de 2 anos',
      'Relatórios técnicos detalhados'
    ],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
    benefits: [
      'Redução de paradas não programadas',
      'Aumento da vida útil dos equipamentos',
      'Otimização da eficiência energética',
      'Conformidade com normas de segurança'
    ]
  },
  {
    id: '2',
    title: 'Consultoria Técnica',
    category: 'Consultoria',
    description: 'Consultoria especializada em sistemas térmicos e otimização de processos',
    icon: Users,
    features: [
      'Engenheiros especializados',
      'Análise de eficiência energética',
      'Projetos customizados',
      'Suporte técnico contínuo'
    ],
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
    benefits: [
      'Redução de custos operacionais',
      'Melhoria na eficiência dos processos',
      'Adequação às normas vigentes',
      'ROI comprovado'
    ]
  },
  {
    id: '3',
    title: 'Manutenção Preventiva',
    category: 'Manutenção',
    description: 'Programa de manutenção preventiva para sistemas térmicos industriais',
    icon: ClipboardCheck,
    features: [
      'Cronograma personalizado',
      'Inspeções termográficas',
      'Troca programada de componentes',
      'Monitoramento remoto'
    ],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop',
    benefits: [
      'Prevenção de falhas catastróficas',
      'Maior disponibilidade dos equipamentos',
      'Redução de custos de manutenção',
      'Segurança operacional'
    ]
  }
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white">
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
            Nossos Serviços
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Oferecemos soluções completas para suas necessidades térmicas, desde consultoria técnica até manutenção especializada.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 group border-0 shadow-md">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gray-100 text-blue-800">
                        {service.category}
                      </Badge>
                    </div>

                    {/* Icon */}
                    <div className="absolute bottom-4 right-4 bg-blue-500 p-3 rounded-full">
                      <service.icon className="size-6 text-white" />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <CardTitle className="mb-3 text-xl group-hover:text-blue-500 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="mb-6 text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3 text-sm text-gray-600">
                        <div className="size-2 bg-green-500 rounded-full flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center space-x-2">
                    <span>Saiba Mais</span>
                    <ArrowRight className="size-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Service Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-blue-50 rounded-2xl p-8 mb-16"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="size-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="size-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600">Suporte Técnico</div>
            </div>
            <div className="space-y-2">
              <div className="size-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="size-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600">Técnicos Especializados</div>
            </div>
            <div className="space-y-2">
              <div className="size-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="size-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-600">98%</div>
              <div className="text-gray-600">Satisfação dos Clientes</div>
            </div>
            <div className="space-y-2">
              <div className="size-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="size-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-600">2 Anos</div>
              <div className="text-gray-600">Garantia Completa</div>
            </div>
          </div>
        </motion.div>

        {/* Why Choose Our Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h3 className="text-3xl font-normal text-gray-900 mb-6">
              Por que escolher nossos serviços?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="size-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="size-2 bg-white rounded-full" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Experiência Comprovada</h4>
                  <p className="text-gray-600">Mais de 20 anos atendendo os mais diversos segmentos industriais.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="size-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="size-2 bg-white rounded-full" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Tecnologia Avançada</h4>
                  <p className="text-gray-600">Utilizamos equipamentos de última geração para diagnósticos precisos.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="size-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="size-2 bg-white rounded-full" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Atendimento Personalizado</h4>
                  <p className="text-gray-600">Cada projeto é único e merece uma solução sob medida.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop"
              alt="Equipe técnica especializada"
              className="w-full h-80 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent rounded-2xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}