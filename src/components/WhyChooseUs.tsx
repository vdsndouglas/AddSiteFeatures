import { motion } from 'motion/react';
import { Award, Users, Shield, Zap, Star, CheckCircle, Phone, Globe } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Qualidade Superior',
    description: 'Produtos certificados com os mais altos padrões de qualidade internacional.',
    stats: 'ISO 9001',
    color: 'bg-blue-500'
  },
  {
    icon: Users,
    title: 'Equipe Especializada',
    description: 'Profissionais altamente qualificados com mais de 20 anos de experiência.',
    stats: '50+ Técnicos',
    color: 'bg-green-500'
  },
  {
    icon: Shield,
    title: 'Certificações',
    description: 'Certificados ISO 9001, FDA e ANVISA para garantir máxima segurança.',
    stats: '5+ Certificações',
    color: 'bg-purple-500'
  },
  {
    icon: Zap,
    title: 'Atendimento Rápido',
    description: 'Suporte técnico 24/7 e entrega rápida para todo o Brasil.',
    stats: '24/7 Suporte',
    color: 'bg-orange-500'
  }
];

const achievements = [
  {
    number: '20+',
    label: 'Anos de Experiência',
    description: 'Consolidados no mercado'
  },
  {
    number: '1000+',
    label: 'Projetos Entregues',
    description: 'Em todo o Brasil'
  },
  {
    number: '98%',
    label: 'Satisfação',
    description: 'Dos nossos clientes'
  },
  {
    number: '50+',
    label: 'Cidades Atendidas',
    description: 'Cobertura nacional'
  }
];

const testimonials = [
  {
    name: 'João Silva',
    company: 'Petroquímica ABC',
    role: 'Gerente de Manutenção',
    content: 'A YSO Melt superou nossas expectativas. Qualidade excepcional e suporte técnico incomparável.',
    rating: 5
  },
  {
    name: 'Maria Santos',
    company: 'Indústria XYZ',
    role: 'Engenheira de Processos',
    content: 'Parceria sólida há mais de 10 anos. Produtos confiáveis e equipe altamente capacitada.',
    rating: 5
  },
  {
    name: 'Carlos Oliveira',
    company: 'Grupo Industrial DEF',
    role: 'Diretor Técnico',
    content: 'Soluções inovadoras e personalizadas. A YSO Melt é referência em mangueiras térmicas.',
    rating: 5
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-blue-50">
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
            Por que Escolher a YSO Melt?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nossos diferenciais fazem toda a diferença na qualidade e performance dos nossos produtos e serviços.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              {/* Icon Container */}
              <div className="relative mb-6">
                <div className={`size-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="size-8 text-white" />
                </div>
                {/* Stats Badge */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-600 shadow-md">
                  {feature.stats}
                </div>
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-blue-500 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-20"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <div className="text-4xl font-bold text-blue-500 mb-2">
                  {achievement.number}
                </div>
                <div className="text-lg font-medium text-gray-900">
                  {achievement.label}
                </div>
                <div className="text-sm text-gray-600">
                  {achievement.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-normal text-gray-900 text-center mb-12">
            O que nossos clientes dizem
          </h3>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Stars */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div>
                  <div className="font-medium text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                  <div className="text-sm text-blue-500 font-medium">{testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications and Partnerships */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-medium text-gray-900 mb-8">
            Certificações e Parcerias
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
            {/* Certification badges (placeholder) */}
            <div className="flex flex-col items-center space-y-2">
              <div className="size-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <Shield className="size-8 text-gray-400" />
              </div>
              <span className="text-sm font-medium">ISO 9001</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="size-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <CheckCircle className="size-8 text-gray-400" />
              </div>
              <span className="text-sm font-medium">FDA</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="size-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <Award className="size-8 text-gray-400" />
              </div>
              <span className="text-sm font-medium">ANVISA</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="size-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <Globe className="size-8 text-gray-400" />
              </div>
              <span className="text-sm font-medium">CE</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="size-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <CheckCircle className="size-8 text-gray-400" />
              </div>
              <span className="text-sm font-medium">ASME</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}