import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Clock, ArrowUp } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner@2.0.3';
import { useState } from 'react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Obrigado! Você foi inscrito em nossa newsletter.');
    setEmail('');
    setIsSubscribing(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Início', id: 'inicio' },
    { label: 'Sobre Nós', id: 'sobre' },
    { label: 'Produtos', id: 'produtos' },
    { label: 'Serviços', id: 'servicos' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contato', id: 'contato' }
  ];

  const products = [
    'Mangueiras Industriais',
    'Mangueiras Alimentícias',
    'Mangueiras Criogênicas',
    'Aquecimento Solar',
    'Mangueiras Hospitalares'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 text-white rounded-lg p-2">
                <span className="font-bold text-lg">YSO</span>
              </div>
              <div>
                <h3 className="text-xl font-normal text-blue-400">YSO Melt</h3>
                <p className="text-gray-400 text-sm">Mangueiras Térmicas</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Especialistas em mangueiras térmicas de alta qualidade para aplicações industriais, hospitalares e residenciais. Mais de 20 anos de experiência no mercado.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-800 text-gray-400 hover:text-blue-400"
              >
                <Facebook className="size-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-800 text-gray-400 hover:text-blue-400"
              >
                <Instagram className="size-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-800 text-gray-400 hover:text-blue-400"
              >
                <Linkedin className="size-5" />
              </Button>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-lg font-medium">Links Rápidos</h4>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="block text-gray-300 hover:text-blue-400 transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-lg font-medium">Produtos</h4>
            <div className="space-y-3">
              {products.map((product) => (
                <button
                  key={product}
                  onClick={() => onNavigate('produtos')}
                  className="block text-gray-300 hover:text-blue-400 transition-colors text-left"
                >
                  {product}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-lg font-medium">Contato</h4>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="size-5 text-blue-400" />
                <span className="text-gray-300">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="size-5 text-blue-400" />
                <span className="text-gray-300">contato@ysomelt.com.br</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="size-5 text-blue-400 mt-1" />
                <div className="text-gray-300">
                  São Paulo, SP<br />
                  Brasil
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="pt-4 border-t border-gray-800">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="size-4 text-blue-400" />
                <span className="text-sm font-medium">Horário de Atendimento</span>
              </div>
              <div className="text-sm text-gray-400">
                Segunda à Sexta: 8h às 18h<br />
                Sábado: 8h às 12h
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-4">
              <h5 className="font-medium mb-3">Newsletter</h5>
              <p className="text-sm text-gray-400 mb-4">
                Receba novidades e dicas técnicas
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button 
                  type="submit"
                  disabled={isSubscribing}
                  className="w-full bg-blue-500 hover:bg-blue-600"
                >
                  {isSubscribing ? 'Inscrevendo...' : 'Inscrever-se'}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 YSO Melt. Todos os direitos reservados.
            </div>
            
            <div className="flex items-center space-x-6">
              <button className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Política de Privacidade
              </button>
              <button className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Termos de Uso
              </button>
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollToTop}
                className="hover:bg-gray-800 text-gray-400 hover:text-blue-400"
              >
                <ArrowUp className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact Float */}
      <div className="fixed bottom-6 right-24 z-40">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="bg-red-500 hover:bg-red-600 text-white rounded-full px-4 py-2 shadow-lg cursor-pointer transition-colors"
          onClick={() => window.open('tel:+5511999999999')}
        >
          <div className="flex items-center space-x-2">
            <Phone className="size-4" />
            <span className="text-sm font-medium">Emergência 24/7</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}