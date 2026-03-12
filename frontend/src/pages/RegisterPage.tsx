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
    <div className="min-h-screen bg-slate-950slate-50 py-12 px-4 flex items-center justify-center transition-colors duration-300">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-slate-950white rounded-4xl shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100">
        {/* Progress Sidebar */}
        <div className="bg-slate-950bg-slate-950slate-950 p-12 text-white hidden md:flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-12">
              <Rocket className="text-secondary" />
              <span className="text-xl font-bold">StartupTank</span>
            </div>
            <h2 className="text-4xl font-bold mb-6">Comece sua jornada hoje.</h2>
            <p className="text-slate-500 opacity-80 leading-relaxed mb-8">
              Junte-se à maior rede de inovação do Brasil e conecte-se com quem faz a diferença.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold">
                  1
                </div>
                <span className="font-medium">Escolha seu papel</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-950slate-700 flex items-center justify-center font-bold">
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
        <div className="p-8 md:p-12">
          <h3 className="text-2xl font-bold text-bg-slate-950slate-950 mb-8">Quem é você?</h3>

          <div className="grid grid-cols-1 gap-4 mb-8">
            <button
              onClick={() => setRole('founder')}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${role === 'founder' ? 'border-secondary bg-slate-950slate-100' : 'border-slate-100 hover:border-slate-200'}`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${role === 'founder' ? 'bg-primary text-white' : 'bg-slate-950slate-100 text-slate-500'}`}
              >
                <Rocket size={24} />
              </div>
              <div>
                <div className="font-bold text-bg-slate-950slate-950">Founder</div>
                <div className="text-sm text-slate-500">Tenho uma startup e busco crescer</div>
              </div>
            </button>

            <button
              onClick={() => setRole('mentor')}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${role === 'mentor' ? 'border-secondary bg-slate-950slate-100' : 'border-slate-100 hover:border-slate-200'}`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${role === 'mentor' ? 'bg-primary text-white' : 'bg-slate-950slate-100 text-slate-500'}`}
              >
                <Users size={24} />
              </div>
              <div>
                <div className="font-bold text-bg-slate-950slate-950">Mentor</div>
                <div className="text-sm text-slate-500">Quero ajudar outros founders</div>
              </div>
            </button>

            <button
              onClick={() => setRole('investor')}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${role === 'investor' ? 'border-secondary bg-slate-950slate-100' : 'border-slate-100 hover:border-slate-200'}`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${role === 'investor' ? 'bg-primary text-white' : 'bg-slate-950slate-100 text-slate-500'}`}
              >
                <Target size={24} />
              </div>
              <div>
                <div className="font-bold text-bg-slate-950slate-950">Investidor</div>
                <div className="text-sm text-slate-500">Busco boas oportunidades de negócio</div>
              </div>
            </button>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-300"
                placeholder="Adriano Misina"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-300"
                placeholder="adriano@gmail.com"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-slate-950blue-500 transition-all shadow-lg shadow-slate-300 flex items-center justify-center gap-2 mt-6"
            >
              Criar Conta <ChevronRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
