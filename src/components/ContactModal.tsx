import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Check, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  productInterest: string;
  urgency: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: '',
  productInterest: '',
  urgency: 'normal'
};

const productOptions = [
  'Mangueira Térmica Industrial',
  'Mangueira para Vapor Alimentícia',
  'Mangueira Criogênica',
  'Mangueira para Aquecimento Solar',
  'Mangueira Hospitalar',
  'Mangueira Flexível Metálica',
  'Consultoria Técnica',
  'Instalação e Manutenção',
  'Manutenção Preventiva',
  'Outro'
];

const urgencyOptions = [
  { value: 'low', label: 'Baixa - Posso aguardar alguns dias' },
  { value: 'normal', label: 'Normal - Dentro de 24-48 horas' },
  { value: 'high', label: 'Alta - Preciso de resposta hoje' },
  { value: 'urgent', label: 'Urgente - É uma emergência' }
];

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
    if (!formData.subject.trim()) newErrors.subject = 'Assunto é obrigatório';
    if (!formData.message.trim()) newErrors.message = 'Mensagem é obrigatória';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      setFormData(initialFormData);
      onClose();
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          <div className="flex h-full">
            {/* Left Side - Contact Info */}
            <div className="hidden lg:flex flex-col bg-blue-500 text-white p-8 w-1/3">
              <div className="mb-8">
                <h3 className="text-2xl font-normal mb-4">Entre em Contato</h3>
                <p className="text-blue-100 leading-relaxed">
                  Nossa equipe especializada está pronta para atender suas necessidades e oferecer as melhores soluções em mangueiras térmicas.
                </p>
              </div>

              <div className="space-y-6 mb-8">
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
              </div>

              <div className="mt-auto">
                <div className="text-sm text-blue-100">
                  Horário de Atendimento
                </div>
                <div className="text-sm">
                  Segunda à Sexta: 8h às 18h<br />
                  Sábado: 8h às 12h
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h2 className="text-2xl font-normal text-gray-900">Solicitar Orçamento</h2>
                  <p className="text-gray-600">Preencha o formulário e entraremos em contato</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-gray-100"
                >
                  <X className="size-5" />
                </Button>
              </div>

              {/* Form */}
              <div className="flex-1 overflow-y-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={errors.name ? 'border-red-500' : ''}
                        placeholder="Seu nome completo"
                      />
                      {errors.name && (
                        <div className="flex items-center space-x-1 text-red-500 text-sm">
                          <AlertCircle className="size-4" />
                          <span>{errors.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={errors.email ? 'border-red-500' : ''}
                        placeholder="seu@email.com"
                      />
                      {errors.email && (
                        <div className="flex items-center space-x-1 text-red-500 text-sm">
                          <AlertCircle className="size-4" />
                          <span>{errors.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={errors.phone ? 'border-red-500' : ''}
                        placeholder="(11) 99999-9999"
                      />
                      {errors.phone && (
                        <div className="flex items-center space-x-1 text-red-500 text-sm">
                          <AlertCircle className="size-4" />
                          <span>{errors.phone}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Empresa</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Nome da empresa"
                      />
                    </div>
                  </div>

                  {/* Product Interest */}
                  <div className="space-y-2">
                    <Label>Produto/Serviço de Interesse</Label>
                    <Select value={formData.productInterest} onValueChange={(value) => handleInputChange('productInterest', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um produto ou serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        {productOptions.map((product) => (
                          <SelectItem key={product} value={product}>
                            {product}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Urgency */}
                  <div className="space-y-2">
                    <Label>Urgência</Label>
                    <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Assunto *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className={errors.subject ? 'border-red-500' : ''}
                      placeholder="Resumo da sua solicitação"
                    />
                    {errors.subject && (
                      <div className="flex items-center space-x-1 text-red-500 text-sm">
                        <AlertCircle className="size-4" />
                        <span>{errors.subject}</span>
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className={`min-h-[120px] ${errors.message ? 'border-red-500' : ''}`}
                      placeholder="Descreva suas necessidades, especificações técnicas, quantidade, prazo, etc."
                    />
                    {errors.message && (
                      <div className="flex items-center space-x-1 text-red-500 text-sm">
                        <AlertCircle className="size-4" />
                        <span>{errors.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <>
                          <Send className="size-4" />
                          <span>Enviar Solicitação</span>
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="flex-1 sm:flex-none"
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}