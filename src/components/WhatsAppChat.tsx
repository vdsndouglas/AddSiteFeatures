import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, User, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const quickMessages = [
  'Olá! Gostaria de um orçamento',
  'Preciso de informações sobre produtos',
  'Tenho uma emergência técnica',
  'Quero agendar uma visita'
];

const supportTeam = [
  {
    name: 'Carlos Silva',
    role: 'Especialista Técnico',
    status: 'online',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    name: 'Maria Santos',
    role: 'Consultora Comercial',
    status: 'online',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
  }
];

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(supportTeam[0]);

  const handleSendWhatsApp = (text: string) => {
    const phoneNumber = '5511999999999'; // Replace with actual WhatsApp number
    const encodedMessage = encodeURIComponent(`Olá! ${text}`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const handleQuickMessage = (quickMessage: string) => {
    handleSendWhatsApp(quickMessage);
  };

  const handleCustomMessage = () => {
    if (message.trim()) {
      handleSendWhatsApp(message);
      setMessage('');
    }
  };

  return (
    <>
      {/* WhatsApp Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 left-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="size-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle className="size-6" />
        </Button>
        
        {/* Notification Badge */}
        <div className="absolute -top-2 -right-2 size-6 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-bold">1</span>
        </div>
        
        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 left-6 z-50 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-green-500 text-white p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="size-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">YSO Melt</h3>
                    <div className="flex items-center space-x-1 text-xs text-green-100">
                      <div className="size-2 bg-green-300 rounded-full" />
                      <span>Online</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="size-4" />
                </Button>
              </div>
              
              <p className="text-sm text-green-100">
                Olá! Como podemos ajudar você hoje?
              </p>
            </div>

            {/* Support Team */}
            <div className="p-4 border-b bg-gray-50">
              <div className="text-xs text-gray-500 mb-2">Escolha um especialista:</div>
              <div className="space-y-2">
                {supportTeam.map((agent) => (
                  <div
                    key={agent.name}
                    onClick={() => setSelectedAgent(agent)}
                    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      selectedAgent.name === agent.name ? 'bg-green-100' : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={agent.avatar}
                        alt={agent.name}
                        className="size-8 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-green-500 rounded-full border-2 border-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                      <div className="text-xs text-gray-500">{agent.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Messages */}
            <div className="p-4 space-y-3 max-h-60 overflow-y-auto">
              <div className="text-sm font-medium text-gray-900 mb-3">Mensagens rápidas:</div>
              {quickMessages.map((quickMessage, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleQuickMessage(quickMessage)}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
                >
                  {quickMessage}
                </motion.button>
              ))}
            </div>

            {/* Custom Message Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  onKeyPress={(e) => e.key === 'Enter' && handleCustomMessage()}
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={handleCustomMessage}
                  disabled={!message.trim()}
                  size="icon"
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Send className="size-4" />
                </Button>
              </div>
              
              {/* Business Hours */}
              <div className="flex items-center space-x-1 mt-2 text-xs text-gray-500">
                <Clock className="size-3" />
                <span>Atendimento: Seg-Sex 8h-18h, Sáb 8h-12h</span>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-gray-50 border-t">
              <div className="text-xs text-gray-500 text-center">
                Powered by WhatsApp Business
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}