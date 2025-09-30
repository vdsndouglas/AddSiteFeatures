import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';

const faqs = [
  {
    id: '1',
    question: 'Qual a vida útil das mangueiras térmicas?',
    answer: 'A vida útil das mangueiras térmicas varia conforme o tipo de aplicação e condições de uso. Em média, nossas mangueiras industriais têm durabilidade de 5 a 10 anos com manutenção adequada. Oferecemos garantia de 2 anos contra defeitos de fabricação.'
  },
  {
    id: '2',
    question: 'Vocês fazem instalação e manutenção?',
    answer: 'Sim, oferecemos serviço completo de instalação e manutenção. Nossa equipe técnica especializada atende em todo o Brasil, com suporte 24/7 para emergências. Também oferecemos programas de manutenção preventiva personalizados.'
  },
  {
    id: '3',
    question: 'Quais são as faixas de temperatura suportadas?',
    answer: 'Nossas mangueiras atendem diferentes faixas de temperatura: Industriais (-40°C a +200°C), Criogênicas (-196°C a +80°C), Alimentícias (até +150°C), Solares (-10°C a +120°C), e Hospitalares (-20°C a +80°C).'
  },
  {
    id: '4',
    question: 'Vocês atendem todo o Brasil?',
    answer: 'Sim, atendemos todo o território nacional. Temos representantes em mais de 50 cidades e nossa logística garante entrega rápida. Para projetos especiais, nossa equipe técnica pode se deslocar para qualquer localidade.'
  },
  {
    id: '5',
    question: 'Como solicitar um orçamento personalizado?',
    answer: 'Você pode solicitar orçamento através do nosso site, telefone (11) 99999-9999 ou email contato@ysomelt.com.br. Nossa equipe comercial analisará suas necessidades e apresentará a melhor solução técnica e comercial.'
  },
  {
    id: '6',
    question: 'Quais certificações vocês possuem?',
    answer: 'Possuímos certificações ISO 9001, FDA, ANVISA, CE e ASME. Nossos produtos atendem às principais normas nacionais e internacionais de qualidade e segurança, garantindo conformidade com os mais rigorosos padrões.'
  },
  {
    id: '7',
    question: 'Fazem mangueiras sob medida?',
    answer: 'Sim, desenvolvemos soluções customizadas conforme as especificações do cliente. Nossa equipe de engenharia trabalha junto com você para criar produtos que atendam exatamente às suas necessidades técnicas.'
  },
  {
    id: '8',
    question: 'Qual o prazo de entrega?',
    answer: 'O prazo varia conforme o produto e localização. Produtos em estoque: 5-10 dias úteis. Produtos customizados: 15-30 dias úteis. Para emergências, temos sistema de entrega expressa em até 48 horas para principais capitais.'
  }
];

const categories = [
  { id: 'all', label: 'Todas as Perguntas', count: faqs.length },
  { id: 'products', label: 'Produtos', keywords: ['mangueiras', 'temperatura', 'vida útil', 'customizadas'] },
  { id: 'services', label: 'Serviços', keywords: ['instalação', 'manutenção', 'atendimento'] },
  { id: 'commercial', label: 'Comercial', keywords: ['orçamento', 'prazo', 'entrega', 'Brasil'] },
  { id: 'technical', label: 'Técnico', keywords: ['certificações', 'normas', 'especificações'] }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeCategory === 'all') return matchesSearch;
    
    const category = categories.find(cat => cat.id === activeCategory);
    const matchesCategory = category?.keywords?.some(keyword => 
      faq.question.toLowerCase().includes(keyword) || 
      faq.answer.toLowerCase().includes(keyword)
    );
    
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="size-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="size-8 text-white" />
          </div>
          <h2 className="text-4xl font-normal text-gray-900 mb-6">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre nossos produtos e serviços.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar perguntas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <HelpCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-12 justify-center"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className={`transition-all ${
                activeCategory === category.id 
                  ? "bg-blue-500 hover:bg-blue-600 text-white" 
                  : "hover:bg-blue-50 hover:border-blue-300"
              }`}
            >
              {category.label}
              {category.count && (
                <span className="ml-2 text-xs opacity-75">({category.count})</span>
              )}
            </Button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4 mb-16">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="size-5 text-gray-500 flex-shrink-0" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openFAQ === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <HelpCircle className="size-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Nenhuma pergunta encontrada
            </h3>
            <p className="text-gray-600 mb-6">
              Tente ajustar sua busca ou entre em contato conosco diretamente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600">
                <Phone className="size-4" />
                <span>(11) 99999-9999</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2 hover:bg-blue-50">
                <Mail className="size-4" />
                <span>contato@ysomelt.com.br</span>
              </Button>
            </div>
          </motion.div>
        )}

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-blue-50 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-medium text-gray-900 mb-4">
            Não encontrou o que procurava?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Nossa equipe técnica está sempre disponível para esclarecer suas dúvidas e ajudar com soluções personalizadas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 flex items-center space-x-2">
              <Phone className="size-5" />
              <span>Falar com Especialista</span>
            </Button>
            <Button size="lg" variant="outline" className="hover:bg-white flex items-center space-x-2">
              <Mail className="size-5" />
              <span>Enviar Pergunta</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}