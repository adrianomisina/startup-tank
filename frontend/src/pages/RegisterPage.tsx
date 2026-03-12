import { ChevronRight, Rocket, Target, Users } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterPage: React.FC = () => {
  const [role, setRole] = useState<'founder' | 'mentor' | 'investor'>('founder')
  const navigate = useNavigate()

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 flex items-center justify-center transition-colors duration-300">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-4xl shadow-2xl shadow-slate-300 overflow-hidden border border-slate-200">
        {/* Progress Sidebar */}
        <div className="bg-slate-900 p-12 text-white hidden md:flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-12">
              <Rocket className="text-blue-400" />
              <span className="text-xl font-bold">StartupTank</span>
            </div>
            <h2 className="text-4xl font-bold mb-6">Comece sua jornada hoje.</h2>
            <p className="text-slate-300 leading-relaxed mb-8">
              Junte-se à maior rede de inovação do Brasil e conecte-se com quem faz a diferença.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
                  1
                </div>
                <span className="font-medium">Escolha seu papel</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300">
                  2
                </div>
                <span className="font-medium opacity-60">Complete o perfil</span>
              </div>
            </div>
          </div>
          <div className="text-sm opacity-60">
            © 2026 StartupTank. Todos os direitos reservados.
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8 md:p-12 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Quem é você?</h3>

            <div className="grid grid-cols-1 gap-4 mb-8">
              {/* Founder Button */}
              <button
                onClick={() => setRole('founder')}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                  role === 'founder'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    role === 'founder' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Rocket size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Founder</div>
                  <div className="text-sm text-slate-600">Tenho uma startup e busco crescer</div>
                </div>
              </button>

              {/* Mentor Button */}
              <button
                onClick={() => setRole('mentor')}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                  role === 'mentor'
                    ? 'border-emerald-600 bg-emerald-50'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    role === 'mentor' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Users size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Mentor</div>
                  <div className="text-sm text-slate-600">Quero ajudar outros founders</div>
                </div>
              </button>

              {/* Investor Button */}
              <button
                onClick={() => setRole('investor')}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                  role === 'investor'
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    role === 'investor' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Target size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Investidor</div>
                  <div className="text-sm text-slate-600">Busco boas oportunidades de negócio</div>
                </div>
              </button>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="Adriano Misina"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="adriano@gmail.com"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 mt-6"
              >
                Criar Conta <ChevronRight size={20} />
              </button>
            </form>

            <p className="text-center text-slate-600 mt-6">
              Já tem uma conta?{' '}
              <a
                href="/login"
                className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors"
              >
                Faça login
              </a>
            </p>
          </div>

          {/* Link Voltar para Home - Rodapé */}
          <div className="text-center pt-6 border-t border-slate-200 mt-8">
            <button
              onClick={() => navigate('/')}
              className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors"
            >
              ← Voltar para Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
