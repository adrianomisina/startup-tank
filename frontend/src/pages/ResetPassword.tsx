/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeft, Lock, Save } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({})
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors: { password?: string; confirmPassword?: string } = {}

    if (!password.trim()) {
      newErrors.password = 'Senha é obrigatória'
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres'
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirme sua senha'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setMessage(null)

    try {
      await api.post(`/auth/reset-password/${token}`, { password })
      setMessage({
        type: 'success',
        text: 'Senha redefinida com sucesso! Redirecionando...'
      })
      setTimeout(() => navigate('/login'), 2000)
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Token inválido ou expirado.'
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
                <Lock size={24} />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2">Nova Senha</h2>
            <p className="text-slate-300 text-sm">Defina uma senha forte e segura.</p>
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

            {/* Nova Senha */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Nova Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-slate-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value)
                    if (errors.password) setErrors({ ...errors, password: undefined })
                  }}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-white text-slate-900 placeholder-slate-400 focus:outline-none transition-all ${
                    errors.password
                      ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                  }`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
              {errors.password && (
                <p className="text-red-600 text-xs font-medium mt-1.5">{errors.password}</p>
              )}
            </div>

            {/* Confirmar Senha */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Confirmar Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-slate-400" size={20} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => {
                    setConfirmPassword(e.target.value)
                    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined })
                  }}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-white text-slate-900 placeholder-slate-400 focus:outline-none transition-all ${
                    errors.confirmPassword
                      ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                  }`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-xs font-medium mt-1.5">{errors.confirmPassword}</p>
              )}
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
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>Redefinir Senha</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
