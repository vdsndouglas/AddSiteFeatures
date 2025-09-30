import { motion } from 'motion/react';
import { ArrowRight, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface ContactCTAProps {
  onContactClick: () => void;
}

export default function ContactCTA({ onContactClick }: ContactCTAProps) {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-500 to-blue-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-white space-y-6"
          >
            <h2 className="text-4xl font-normal">
              Pronto para Começar?
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Entre em contato conosco e descubra como nossas soluções térmicas podem otimizar seus processos e reduzir custos operacionais.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-4">
                <div className="size-12 bg-blue-400 rounded-lg flex items-center justify-center">
                  <Phone className="size-6" />
                </div>
                <div>
                  <div className="font-medium">Telefone</div>
                  <div className="text-blue-100">(11) 99999-9999</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="size-12 bg-blue-400 rounded-lg flex items-center justify-center">
                  <Mail className="size-6" />
                </div>
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-blue-100">contato@ysomelt.com.br</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="size-12 bg-blue-400 rounded-lg flex items-center justify-center">
                  <MapPin className="size-6" />
                </div>
                <div>
                  <div className="font-medium">Localização</div>
                  <div className="text-blue-100">São Paulo, SP - Brasil</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="size-12 bg-blue-400 rounded-lg flex items-center justify-center">
                  <Clock className="size-6" />
                </div>
                <div>
                  <div className="font-medium">Horário de Atendimento</div>
                  <div className="text-blue-100 text-sm">
                    Segunda à Sexta: 8h às 18h<br />
                    Sábado: 8h às 12h
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-2xl"
          >
            <div className="text-center space-y-6">
              <div>
                <h3 className="text-2xl font-medium text-gray-900 mb-3">
                  Solicite seu Orçamento
                </h3>
                <p className="text-gray-600">
                  Preencha nosso formulário e receba uma proposta personalizada em até 24 horas.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <div className="size-2 bg-green-500 rounded-full" />
                  <span className="text-gray-600">Resposta em até 24 horas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="size-2 bg-green-500 rounded-full" />
                  <span className="text-gray-600">Consultoria técnica gratuita</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="size-2 bg-green-500 rounded-full" />
                  <span className="text-gray-600">Soluções personalizadas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="size-2 bg-green-500 rounded-full" />
                  <span className="text-gray-600">Sem compromisso</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-4 pt-4">
                <Button 
                  size="lg"
                  onClick={onContactClick}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center space-x-2"
                >
                  <span>Solicitar Orçamento</span>
                  <ArrowRight className="size-5" />
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="w-full hover:bg-blue-50 hover:border-blue-300"
                  onClick={() => window.open('tel:+5511999999999')}
                >
                  Ligar Agora
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-500">20+</div>
                    <div className="text-xs text-gray-500">Anos</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-500">1000+</div>
                    <div className="text-xs text-gray-500">Clientes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-500">98%</div>
                    <div className="text-xs text-gray-500">Satisfação</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Additional CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
              <h4 className="font-medium text-white mb-2">Emergência 24/7</h4>
              <p className="text-blue-100 text-sm mb-4">
                Suporte técnico para situações urgentes
              </p>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-500"
                onClick={() => window.open('tel:+5511999999999')}
              >
                Ligar Emergência
              </Button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
              <h4 className="font-medium text-white mb-2">Visita Técnica</h4>
              <p className="text-blue-100 text-sm mb-4">
                Agende uma avaliação gratuita no local
              </p>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-500"
                onClick={onContactClick}
              >
                Agendar Visita
              </Button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
              <h4 className="font-medium text-white mb-2">Catálogo Digital</h4>
              <p className="text-blue-100 text-sm mb-4">
                Download do catálogo completo de produtos
              </p>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-500"
              >
                Baixar Catálogo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}