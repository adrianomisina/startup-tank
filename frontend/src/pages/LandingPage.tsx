import { ArrowRight, Rocket, TrendingUp, Users, Zap } from 'lucide-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'

const LandingPage: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/dashboard')
    }
  }, [navigate])

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-32">
        {/* Gradientes mais sutis e visíveis */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-40"></div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge com melhor contraste */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-semibold text-sm mb-8">
              <Zap size={16} />
              <span>A maior rede de startups do Brasil</span>
            </div>

            {/* Heading com cor sólida e legível */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 tracking-tight">
              Onde Grandes Ideias Encontram{' '}
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Grandes Investidores.
              </span>
            </h1>

            {/* Texto com melhor contraste */}
            <p className="text-xl text-slate-700 mb-12 leading-relaxed">
              Conectamos fundadores visionários com mentores experientes e investidores anjo para
              acelerar o crescimento das startups brasileiras.
            </p>

            {/* Botões com cores corretas */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/register"
                className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Começar como Founder <ArrowRight size={20} />
              </a>
              <a
                href="/investors"
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                Sou Investidor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {/* Card 1 */}
            <div className="bg-white rounded-4xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-slate-700 font-medium">Startups Cadastradas</div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-4xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="text-4xl font-bold text-emerald-600 mb-2">R$ 50M+</div>
              <div className="text-slate-700 font-medium">Investimentos Facilitados</div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-4xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="text-4xl font-bold text-purple-600 mb-2">200+</div>
              <div className="text-slate-700 font-medium">Mentores Atuais</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Recursos Feitos para Você</h2>
            <p className="text-lg text-slate-600">
              Tudo o que você precisa para crescer ou investir em um só lugar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-4xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="bg-blue-100 text-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Rocket size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Marketplace de Startups</h3>
              <p className="text-slate-600 leading-relaxed">
                Descubra as startups mais quentes por setor, estágio e localização. Navegue por
                perfis detalhados e pitch decks.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-4xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="bg-emerald-100 text-emerald-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Mentorias de Elite</h3>
              <p className="text-slate-600 leading-relaxed">
                Conecte-se com fundadores experientes e especialistas de mercado que já trilharam o
                caminho do sucesso.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-4xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="bg-purple-100 text-purple-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Fluxo de Investimento</h3>
              <p className="text-slate-600 leading-relaxed">
                Ferramentas integradas para investidores gerenciarem seu deal flow e entrarem em
                contato direto com fundadores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900 opacity-10"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Pronto para o Próximo Nível?
          </h2>
          <p className="text-slate-200 leading-relaxed mb-12 text-xl max-w-2xl mx-auto">
            Junte-se a milhares de empreendedores e investidores que já estão moldando o futuro das
            startups no Brasil.
          </p>
          <a
            href="/register"
            className="inline-flex bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 items-center justify-center gap-2"
          >
            Registrar-se Gratuitamente <ArrowRight size={24} />
          </a>
        </div>
      </section>
    </Layout>
  )
}

export default LandingPage
