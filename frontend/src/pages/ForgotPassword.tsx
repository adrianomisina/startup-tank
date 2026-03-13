/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeft, Mail, Send } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      await api.post('/auth/forgot-password', { email })
      setMessage({
        type: 'success',
        text: 'Email enviado! Verifique sua caixa de entrada.'
      })
      setEmail('')
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Erro ao enviar email. Tente novamente.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      {/* Botão Voltar */}
      <button
        onClick={() => navigate('/login')}
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-white transition-all shadow-sm hover:shadow-md"
      >
        <ArrowLeft size={18} />
        <span className="hidden sm:inline">Voltar</span>
      </button>

      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-400/20 overflow-hidden border border-slate-200">
          {/* Header */}
          <div className="p-8 bg-linear-to-r from-slate-900 to-slate-800 text-white text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                <Mail size={24} />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2">Esqueceu a senha?</h2>
            <p className="text-slate-300 text-sm">
              Sem problemas! Enviaremos um link de recuperação.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Mensagem de Sucesso/Erro */}
            {message && (
              <div
                className={`p-4 rounded-xl border-l-4 ${
                  message.type === 'success'
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : 'bg-red-50 border-red-500 text-red-700'
                }`}
              >
                <p className="font-medium text-sm">{message.text}</p>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Email cadastrado
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-slate-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                  placeholder="exemplo@gmail.com"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Enviar Link de Recuperação</span>
                </>
              )}
            </button>

            {/* Voltar para Login */}
            <p className="text-center text-slate-700 text-sm">
              Lembrou a senha?{' '}
              <a
                href="/login"
                className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors"
              >
                Fazer login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
