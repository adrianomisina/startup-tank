// src/pages/LoginPage.tsx
import { Lock, LogIn, Mail, ArrowLeft } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!validateEmail(email)) {
      newErrors.email = 'Email inválido'
    }

    if (!password.trim()) {
      newErrors.password = 'Senha é obrigatória'
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (error) {
      setErrors({ email: 'Email ou senha incorretos' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4 transition-colors duration-300">
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium px-4 py-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm hover:shadow-md"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="hidden sm:inline">Voltar</span>
      </button>

      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl shadow-slate-400/20 dark:shadow-black/40 overflow-hidden border border-slate-200 dark:border-slate-700">
          <div className="p-8 bg-linear-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 text-white text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                <LogIn size={24} />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2">Bem-vindo</h2>
            <p className="text-slate-300 text-sm">Entre para continuar no StartupTank</p>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-3.5 text-slate-400 dark:text-slate-500"
                  size={20}
                />
                <input
                  type="email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value)
                    if (errors.email) setErrors({ ...errors, email: undefined })
                  }}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all ${
                    errors.email
                      ? 'border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-800'
                      : 'border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800'
                  }`}
                  placeholder="exemplo@gmail.com"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-red-600 dark:text-red-400 text-xs font-medium mt-1.5">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-3.5 text-slate-400 dark:text-slate-500"
                  size={20}
                />
                <input
                  type="password"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value)
                    if (errors.password) setErrors({ ...errors, password: undefined })
                  }}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all ${
                    errors.password
                      ? 'border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-800'
                      : 'border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800'
                  }`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
              {errors.password && (
                <p className="text-red-600 dark:text-red-400 text-xs font-medium mt-1.5">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 cursor-pointer"
                  disabled={isLoading}
                />
                <span className="text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  Lembrar-me
                </span>
              </label>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-200 dark:shadow-blue-900/30 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Entrando...</span>
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Entrar</span>
                </>
              )}
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300 dark:border-slate-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase font-medium text-xs">
                  Ou entre com
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={isLoading}
              className="w-full bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white py-3 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-slate-400 dark:hover:border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
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
              <span>Google</span>
            </button>

            <p className="text-center text-slate-700 dark:text-slate-300">
              Não tem uma conta?{' '}
              <a
                href="/register"
                className="text-blue-600 dark:text-blue-400 font-bold hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors"
              >
                Cadastre-se
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
