import Header from "../components/Header";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Users, Headphones } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setFormData({ name: "", email: "", subject: "", message: "", type: "general" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "contato@timefocus.com",
      description: "Resposta em até 24 horas",
      color: "teal"
    },
    {
      icon: Phone,
      title: "Telefone",
      value: "+55 (11) 9999-9999",
      description: "Seg-Sex, 9h às 18h",
      color: "blue"
    },
    {
      icon: MapPin,
      title: "Endereço",
      value: "São Paulo, SP - Brasil",
      description: "Atendimento remoto",
      color: "purple"
    },
    {
      icon: Clock,
      title: "Horário",
      value: "24/7 Online",
      description: "Suporte sempre disponível",
      color: "green"
    }
  ];

  const supportTypes = [
    {
      icon: MessageCircle,
      title: "Suporte Técnico",
      description: "Problemas com a plataforma, bugs ou dificuldades técnicas",
      color: "bg-red-50 border-red-200 text-red-700"
    },
    {
      icon: Users,
      title: "Vendas & Planos",
      description: "Informações sobre preços, planos e funcionalidades premium",
      color: "bg-blue-50 border-blue-200 text-blue-700"
    },
    {
      icon: Headphones,
      title: "Suporte Geral",
      description: "Dúvidas sobre uso, tutoriais e melhores práticas",
      color: "bg-green-50 border-green-200 text-green-700"
    }
  ];

  const faqItems = [
    {
      question: "Como posso resetar minha senha?",
      answer: "Acesse a página de login e clique em 'Esqueci minha senha'. Você receberá um email com instruções."
    },
    {
      question: "O TimeFocus funciona offline?",
      answer: "Algumas funcionalidades básicas funcionam offline, mas para sincronização e IA é necessária conexão."
    },
    {
      question: "Posso cancelar minha assinatura a qualquer momento?",
      answer: "Sim, você pode cancelar sua assinatura a qualquer momento sem taxas de cancelamento."
    },
    {
      question: "Como funciona a geração de exercícios com IA?",
      answer: "Nossa IA analisa seu histórico de estudos e gera exercícios personalizados baseados no seu nível e matérias."
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      teal: { bg: "bg-teal-50", icon: "text-teal-600", iconBg: "bg-teal-100" },
      blue: { bg: "bg-blue-50", icon: "text-blue-600", iconBg: "bg-blue-100" },
      purple: { bg: "bg-purple-50", icon: "text-purple-600", iconBg: "bg-purple-100" },
      green: { bg: "bg-green-50", icon: "text-green-600", iconBg: "bg-green-100" }
    };
    return colors[color as keyof typeof colors] || colors.teal;
  };

  return (
    <div className="contact-page min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-6">
            <MessageCircle className="w-4 h-4 mr-2" />
            Fale Conosco
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Entre em{" "}
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Contato
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Estamos aqui para ajudar! Entre em contato conosco para tirar dúvidas, 
            dar sugestões ou solicitar suporte técnico.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            const colors = getColorClasses(info.color);
            
            return (
              <div key={index} className={`${colors.bg} rounded-xl p-6 text-center hover:shadow-md transition-shadow`}>
                <div className={`w-16 h-16 ${colors.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className={`w-8 h-8 ${colors.icon}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                <p className="font-medium text-gray-800 mb-1">{info.value}</p>
                <p className="text-sm text-gray-600">{info.description}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envie uma Mensagem</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Seu nome"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Contato
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="general">Suporte Geral</option>
                  <option value="technical">Suporte Técnico</option>
                  <option value="sales">Vendas & Planos</option>
                  <option value="feedback">Feedback & Sugestões</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assunto *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Resumo do seu contato"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="Descreva sua dúvida, problema ou sugestão..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar Mensagem</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Support Types & FAQ */}
          <div className="space-y-8">
            {/* Support Types */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tipos de Suporte</h2>
              <div className="space-y-4">
                {supportTypes.map((type, index) => {
                  const IconComponent = type.icon;
                  return (
                    <div key={index} className={`${type.color} border-2 rounded-xl p-6`}>
                      <div className="flex items-start space-x-4">
                        <IconComponent className="w-6 h-6 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-2">{type.title}</h3>
                          <p className="text-sm opacity-80">{type.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Perguntas Frequentes</h2>
              <div className="space-y-4">
                {faqItems.map((faq, index) => (
                  <details key={index} className="bg-white rounded-lg border border-gray-200 p-4">
                    <summary className="font-medium text-gray-900 cursor-pointer hover:text-teal-600 transition-colors">
                      {faq.question}
                    </summary>
                    <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Response Time */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl border border-teal-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tempo de Resposta</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-teal-600 mb-2">{'< 2h'}</div>
              <div className="text-sm text-gray-600">Suporte Técnico Urgente</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{'< 24h'}</div>
              <div className="text-sm text-gray-600">Dúvidas Gerais</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">{'< 48h'}</div>
              <div className="text-sm text-gray-600">Solicitações Comerciais</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
