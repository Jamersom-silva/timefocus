import Header from "../components/Header";
import { Check, X, Star, Zap, Crown, Users } from "lucide-react";
import { useState } from "react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: "Gratuito",
      description: "Perfeito para começar seus estudos",
      price: { monthly: 0, yearly: 0 },
      icon: Users,
      color: "gray",
      popular: false,
      features: [
        { name: "Timer Pomodoro básico", included: true },
        { name: "Até 3 matérias", included: true },
        { name: "Relatórios básicos", included: true },
        { name: "5 exercícios IA por mês", included: true },
        { name: "Sincronização entre dispositivos", included: false },
        { name: "Relatórios avançados", included: false },
        { name: "Exercícios IA ilimitados", included: false },
        { name: "Suporte prioritário", included: false },
        { name: "Temas personalizados", included: false }
      ]
    },
    {
      name: "Pro",
      description: "Para estudantes sérios e focados",
      price: { monthly: 19.90, yearly: 199.90 },
      icon: Zap,
      color: "teal",
      popular: true,
      features: [
        { name: "Timer Pomodoro avançado", included: true },
        { name: "Matérias ilimitadas", included: true },
        { name: "Relatórios completos", included: true },
        { name: "50 exercícios IA por mês", included: true },
        { name: "Sincronização entre dispositivos", included: true },
        { name: "Estatísticas detalhadas", included: true },
        { name: "Metas personalizadas", included: true },
        { name: "Suporte por email", included: true },
        { name: "Temas personalizados", included: false }
      ]
    },
    {
      name: "Premium",
      description: "Máximo desempenho para estudantes avançados",
      price: { monthly: 39.90, yearly: 399.90 },
      icon: Crown,
      color: "purple",
      popular: false,
      features: [
        { name: "Todos os recursos Pro", included: true },
        { name: "Exercícios IA ilimitados", included: true },
        { name: "Análises preditivas", included: true },
        { name: "Coaching personalizado", included: true },
        { name: "Relatórios exportáveis", included: true },
        { name: "Integração com calendários", included: true },
        { name: "Temas personalizados", included: true },
        { name: "Suporte prioritário", included: true },
        { name: "Acesso antecipado a novidades", included: true }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      gray: {
        bg: "bg-gray-50",
        border: "border-gray-200",
        button: "bg-gray-600 hover:bg-gray-700",
        icon: "text-gray-600",
        iconBg: "bg-gray-100"
      },
      teal: {
        bg: "bg-teal-50",
        border: "border-teal-200",
        button: "bg-teal-500 hover:bg-teal-600",
        icon: "text-teal-600",
        iconBg: "bg-teal-100"
      },
      purple: {
        bg: "bg-purple-50",
        border: "border-purple-200",
        button: "bg-purple-500 hover:bg-purple-600",
        icon: "text-purple-600",
        iconBg: "bg-purple-100"
      }
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  const formatPrice = (price: number) => {
    return price === 0 ? "Grátis" : `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  const getYearlyDiscount = (monthly: number, yearly: number) => {
    if (monthly === 0) return 0;
    const monthlyTotal = monthly * 12;
    const discount = ((monthlyTotal - yearly) / monthlyTotal) * 100;
    return Math.round(discount);
  };

  return (
    <div className="pricing-page min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" />
            Planos e Preços
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Escolha o plano{" "}
            <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              perfeito para você
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comece gratuitamente e evolua conforme suas necessidades. 
            Todos os planos incluem 14 dias de teste grátis dos recursos premium.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-teal-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors relative ${
                  billingCycle === 'yearly'
                    ? 'bg-teal-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Anual
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  -17%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            const colors = getColorClasses(plan.color);
            const yearlyDiscount = getYearlyDiscount(plan.price.monthly, plan.price.yearly);
            
            return (
              <div 
                key={index} 
                className={`relative ${colors.bg} ${colors.border} border-2 rounded-2xl p-8 ${
                  plan.popular ? 'ring-4 ring-teal-200 scale-105' : ''
                } hover:shadow-lg transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-teal-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Mais Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`w-16 h-16 ${colors.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`w-8 h-8 ${colors.icon}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-gray-900 mb-1">
                      {formatPrice(plan.price[billingCycle])}
                    </div>
                    {plan.price[billingCycle] > 0 && (
                      <div className="text-gray-600">
                        /{billingCycle === 'monthly' ? 'mês' : 'ano'}
                        {billingCycle === 'yearly' && yearlyDiscount > 0 && (
                          <span className="ml-2 text-green-600 font-medium">
                            (economize {yearlyDiscount}%)
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <button className={`w-full ${colors.button} text-white py-3 px-6 rounded-lg font-semibold transition-colors`}>
                    {plan.price[billingCycle] === 0 ? 'Começar Grátis' : 'Iniciar Teste Grátis'}
                  </button>
                </div>

                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-gray-900' : 'text-gray-500'}`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Perguntas Frequentes</h2>
            <p className="text-gray-600">Tire suas dúvidas sobre nossos planos</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Posso cancelar a qualquer momento?
                </h3>
                <p className="text-gray-600 text-sm">
                  Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas de cancelamento. 
                  Seus dados ficam salvos por 30 dias após o cancelamento.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Como funciona o teste grátis?
                </h3>
                <p className="text-gray-600 text-sm">
                  Todos os planos pagos incluem 14 dias de teste grátis com acesso completo aos recursos. 
                  Não cobramos nada até o final do período de teste.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Posso mudar de plano depois?
                </h3>
                <p className="text-gray-600 text-sm">
                  Claro! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. 
                  Ajustamos a cobrança proporcionalmente.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Quais formas de pagamento vocês aceitam?
                </h3>
                <p className="text-gray-600 text-sm">
                  Aceitamos cartões de crédito (Visa, Mastercard, Elo), PIX, boleto bancário e PayPal. 
                  Todos os pagamentos são processados com segurança.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Há desconto para estudantes?
                </h3>
                <p className="text-gray-600 text-sm">
                  Sim! Oferecemos 50% de desconto para estudantes com comprovação acadêmica válida. 
                  Entre em contato para mais informações.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Os dados ficam seguros?
                </h3>
                <p className="text-gray-600 text-sm">
                  Absolutamente! Utilizamos criptografia de ponta e seguimos as melhores práticas 
                  de segurança. Seus dados estão protegidos e nunca são compartilhados.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comparação Detalhada</h2>
            <p className="text-gray-600">Veja todos os recursos de cada plano</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Recursos</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Gratuito</th>
                  <th className="text-center py-4 px-6 font-semibold text-teal-600">Pro</th>
                  <th className="text-center py-4 px-6 font-semibold text-purple-600">Premium</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Timer Pomodoro", free: "Básico", pro: "Avançado", premium: "Avançado" },
                  { feature: "Número de matérias", free: "3", pro: "Ilimitadas", premium: "Ilimitadas" },
                  { feature: "Exercícios IA/mês", free: "5", pro: "50", premium: "Ilimitados" },
                  { feature: "Relatórios", free: "Básicos", pro: "Completos", premium: "Avançados" },
                  { feature: "Sincronização", free: "❌", pro: "✅", premium: "✅" },
                  { feature: "Suporte", free: "Comunidade", pro: "Email", premium: "Prioritário" },
                  { feature: "Temas personalizados", free: "❌", pro: "❌", premium: "✅" },
                  { feature: "Análises preditivas", free: "❌", pro: "❌", premium: "✅" }
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4 px-6 font-medium text-gray-900">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-gray-600">{row.free}</td>
                    <td className="py-4 px-6 text-center text-gray-900">{row.pro}</td>
                    <td className="py-4 px-6 text-center text-gray-900">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-teal-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para Transformar seus Estudos?</h2>
          <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
            Junte-se a mais de 50.000 estudantes que já melhoraram sua produtividade com o TimeFocus. 
            Comece seu teste grátis hoje mesmo!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors">
              Começar Teste Grátis
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
              Falar com Vendas
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}