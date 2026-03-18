import React, { useState } from 'react'
import { CheckCircle, CreditCard } from 'lucide-react'
import Navbar from '../components/Navbar'

const SubscriptionPage: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async (planName: string, amount: number) => {
    setLoading(true)
    const token = localStorage.getItem('token')
    try {
      const response = await fetch('http://localhost:5000/api/payments/pagseguro/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ amount, productName: planName })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        // Redirecionar para URL de checkout retornada (Mockada ou Real)
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl
        } else {
          alert('Integração de pagamento simulada com sucesso! (Falta link de redirecionamento PagSeguro)')
        }
      } else {
        alert(data.message || 'Erro ao processar pagamento.')
      }
    } catch (error) {
      alert('Erro de conexão com o servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans">
      <Navbar />
      <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-outfit text-white">
            Escolha seu Plano
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-light">
            Tenha acesso completo à rede StartupTank e acelere o crescimento do seu negócio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plano Básico */}
          <div className="bg-neutral-800 rounded-2xl p-8 border border-neutral-700 hover:border-emerald-500/50 transition-colors">
            <h3 className="text-2xl font-semibold mb-2">Plano Starter</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">R$ 49</span>
              <span className="text-neutral-400">/mês</span>
            </div>
            <ul className="space-y-4 mb-8">
               <li className="flex items-center text-neutral-300">
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                Acesso à base de Mentores
              </li>
              <li className="flex items-center text-neutral-300">
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                Criar 1 Perfil de Startup
              </li>
            </ul>
            <button 
              onClick={() => handleCheckout('Plano Starter', 49)}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-neutral-700 hover:bg-neutral-600 text-white font-medium transition-colors"
            >
              {loading ? 'Processando...' : 'Assinar Starter'}
            </button>
          </div>

          {/* Plano Pro */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-900 rounded-2xl p-8 border border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <h3 className="text-2xl font-semibold mb-2 text-white">Plano Pro</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">R$ 149</span>
              <span className="text-emerald-200">/mês</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-emerald-100">
                <CheckCircle className="w-5 h-5 text-emerald-300 mr-3" />
                Acesso Ilimitado a Mentores/Investidores
              </li>
              <li className="flex items-center text-emerald-100">
                <CheckCircle className="w-5 h-5 text-emerald-300 mr-3" />
                Destaque na vitrine de Startups
              </li>
              <li className="flex items-center text-emerald-100">
                <CheckCircle className="w-5 h-5 text-emerald-300 mr-3" />
                Acesso direto por Chat
              </li>
            </ul>
            <button 
              onClick={() => handleCheckout('Plano Pro', 149)}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 font-bold flex items-center justify-center transition-colors"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              {loading ? 'Processando...' : 'Assinar Pro'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPage
