import { Lock, LogIn, Mail, ArrowLeft } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('token', 'fake-jwt')
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-300 overflow-hidden border border-slate-200">
          {/* Header */}
          <div className="p-8 bg-slate-900 text-white text-center">
            <h2 className="text-3xl font-bold mb-2">Bem-vindo</h2>
            <p className="text-slate-300">Entre para continuar no StartupTank</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-slate-500" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="exemplo@gmail.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-slate-500" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
            >
              <LogIn size={20} />
              Entrar
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-600 uppercase font-medium">
                  Ou entre com
                </span>
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-white border-2 border-slate-300 text-slate-900 py-4 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-400 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M21.35 11.1h-9.17v2.73h6.51c-.33 1.56-1.56 2.85-3.21 3.42v2.88h5.18c3.02-2.79 4.76-6.9 4.76-11.75c0-.44-.04-.84-.07-1.28Z"
                />
                <path
                  fill="currentColor"
                  d="M12.18 21c3.01 0 5.54-1 7.39-2.71l-5.18-2.88c-1.16.8-2.65 1.27-4.21 1.27c-3.23 0-5.96-2.18-6.94-5.11H1.02v2.96C2.9 18.23 7.21 21 12.18 21Z"
                />
                <path
                  fill="currentColor"
                  d="M5.24 11.57a7.22 7.22 0 0 1 0-2.14V6.47H1.02a11.97 11.97 0 0 0 0 10.2l4.22-2.96c-.28-.35-.51-.77-.66-1.14Z"
                />
                <path
                  fill="currentColor"
                  d="M12.18 4.77c1.64 0 3.11.57 4.27 1.68l3.19-3.19C17.7 1.48 15.21 0 12.18 0C7.21 0 2.9 2.77 1.02 6.47l4.22 3.14c.98-2.93 3.71-5.11 6.94-5.11Z"
                />
              </svg>
              Google
            </button>

            <p className="text-center text-slate-700">
              Não tem uma conta?{' '}
              <a
                href="/register"
                className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors"
              >
                Cadastre-se
              </a>
            </p>
          </form>
        </div>

        {/* Link Voltar - Fora do Card */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Voltar para Home</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
