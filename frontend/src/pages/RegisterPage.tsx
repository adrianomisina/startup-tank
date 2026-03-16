import { ChevronRight, Rocket, Target, Users, Lock, Moon, Sun } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import api from '../services/api'

const RegisterPage: React.FC = () => {
  const [role, setRole] = useState<'founder' | 'mentor' | 'investor'>('founder')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/dashboard')
    }
  }, [navigate])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
        role
      })

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      const userRole = response.data.user.role
      if (userRole === 'startup_founder') {
        navigate('/register-startup')
      } else {
        navigate('/dashboard')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao realizar cadastro.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 flex items-center justify-center transition-colors duration-300 relative">
      {/* Theme Toggle Button - Floating */}
      <div className="absolute top-8 right-8">
        <button
          onClick={toggleTheme}
          className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-lg"
          title={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-slate-900 rounded-4xl shadow-2xl shadow-slate-300/50 dark:shadow-black/60 overflow-hidden border border-slate-200 dark:border-slate-800">
        {/* Progress Sidebar */}
        <div className="bg-slate-100 dark:bg-slate-950 p-12 text-slate-900 dark:text-white hidden md:flex flex-col justify-between border-r border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-12">
              <Rocket className="text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold">StartupTank</span>
            </div>
            <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Comece sua jornada hoje.</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
              Junte-se à maior rede de inovação do Brasil e conecte-se com quem faz a diferença.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center font-bold text-white">
                  1
                </div>
                <span className="font-bold">Escolha seu papel</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500 dark:text-slate-400">
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
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Quem é você?</h3>

            <div className="grid grid-cols-1 gap-4 mb-8">
              {/* Founder Button */}
              <button
                onClick={() => setRole('founder')}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                  role === 'founder'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    role === 'founder' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Rocket size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Founder</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Tenho uma startup e busco crescer</div>
                </div>
              </button>

              {/* Mentor Button */}
              <button
                onClick={() => setRole('mentor')}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                  role === 'mentor'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    role === 'mentor' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-none' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Users size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Mentor</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Quero ajudar outros founders</div>
                </div>
              </button>

              {/* Investor Button */}
              <button
                onClick={() => setRole('investor')}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                  role === 'investor'
                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    role === 'investor' ? 'bg-purple-600 text-white shadow-lg shadow-purple-200 dark:shadow-none' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Target size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Investidor</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Busco boas oportunidades de negócio</div>
                </div>
              </button>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-4 rounded-xl flex items-center gap-3">
                <p className="text-red-700 dark:text-red-400 font-medium text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="Adriano Misina"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="adriano@gmail.com"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-blue-900/20 flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Criando conta...' : (
                  <>Criar Conta <ChevronRight size={20} /></>
                )}
              </button>
            </form>

            <p className="text-center text-slate-600 dark:text-slate-400 mt-6">
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
          <div className="text-center pt-6 border-t border-slate-100 dark:border-slate-800 mt-8">
            <button
              onClick={() => navigate('/')}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-colors"
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
