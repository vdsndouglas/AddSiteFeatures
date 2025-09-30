import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  onContactClick: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ onContactClick, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navigationItems = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Sobre Nós' },
    { 
      id: 'produtos', 
      label: 'Produtos',
      hasDropdown: true,
      dropdownItems: [
        'Mangueiras Industriais',
        'Mangueiras Alimentícias',
        'Mangueiras Criogênicas',
        'Aquecimento Solar',
        'Mangueiras Hospitalares'
      ]
    },
    { 
      id: 'servicos', 
      label: 'Serviços',
      hasDropdown: true,
      dropdownItems: [
        'Instalação e Manutenção',
        'Consultoria Técnica',
        'Manutenção Preventiva'
      ]
    },
    { id: 'faq', label: 'FAQ' },
    { id: 'contato', label: 'Contatos' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-500 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="size-4" />
              <span>(11) 99999-9999</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="size-4" />
              <span>contato@ysomelt.com.br</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Especialistas em Mangueiras Térmicas</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-40 mt-9">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 text-white rounded-lg p-2">
                <span className="font-bold text-lg">YSO</span>
              </div>
              <div>
                <h1 className="text-xl font-normal text-blue-500">YSO Melt</h1>
                <p className="text-sm text-gray-600">Mangueiras Térmicas</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.id} className="relative">
                  {item.hasDropdown ? (
                    <div
                      className="flex items-center space-x-1 cursor-pointer hover:text-blue-500 transition-colors"
                      onMouseEnter={() => setActiveDropdown(item.id)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="size-4" />
                      
                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {activeDropdown === item.id && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border py-2 z-50"
                          >
                            {item.dropdownItems?.map((dropdownItem, index) => (
                              <button
                                key={index}
                                onClick={() => handleNavClick(item.id)}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                              >
                                {dropdownItem}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className="hover:text-blue-500 transition-colors"
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button and Mobile Menu Toggle */}
            <div className="flex items-center space-x-4">
              <Button
                onClick={onContactClick}
                className="hidden md:inline-flex bg-blue-500 hover:bg-blue-600 text-white"
              >
                Solicitar Orçamento
              </Button>
              
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden"
              >
                {isMobileMenuOpen ? (
                  <X className="size-6" />
                ) : (
                  <Menu className="size-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="px-4 py-6 space-y-4">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="block w-full text-left py-2 hover:text-blue-500 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <Button
                  onClick={() => {
                    onContactClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-4"
                >
                  Solicitar Orçamento
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}