/* eslint-disable react-hooks/set-state-in-effect */
import { Bell, Lock, Mail, Moon, Save, Sun, User } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { useTheme } from '../contexts/ThemeContext'

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  const [user, setUser] = useState({
    name: '',
    email: '',
    notifications: true,
    newsletter: false
  })

  useEffect(() => {
    // Carregar dados do usuário do localStorage
    const userJson = localStorage.getItem('user')
    if (userJson) {
      setUser(JSON.parse(userJson))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(user))
    alert('Configurações salvas com sucesso!')
  }

  return (
    <Layout showSidebar={true}>
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen p-8 transition-colors">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-950 dark:text-white mb-8">Configurações</h1>

          {/* Profile Section */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 mb-6 shadow-sm transition-colors">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-6 flex items-center gap-2">
              <User className="text-blue-600 dark:text-blue-400" />
              Perfil
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  value={user.name}
                  onChange={e => setUser({ ...user, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 outline-none transition-colors"
                />
              </div>
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
                    value={user.email}
                    onChange={e => setUser({ ...user, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Appearance Section - NOVO */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 mb-6 shadow-sm transition-colors">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-6 flex items-center gap-2">
              {theme === 'dark' ? (
                <Moon className="text-blue-600 dark:text-blue-400" />
              ) : (
                <Sun className="text-blue-600 dark:text-blue-400" />
              )}
              Aparência
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-900 dark:text-white mb-1">
                  Modo {theme === 'dark' ? 'Escuro' : 'Claro'}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Alterne entre tema claro e escuro
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="relative inline-flex h-12 w-24 items-center rounded-full bg-slate-200 dark:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
              >
                <span
                  className={`inline-block h-10 w-10 transform rounded-full bg-white dark:bg-slate-900 shadow-lg transition-transform items-center justify-center ${
                    theme === 'dark' ? 'translate-x-12' : 'translate-x-1'
                  }`}
                >
                  {theme === 'dark' ? (
                    <Moon size={20} className="text-blue-500" />
                  ) : (
                    <Sun size={20} className="text-amber-500" />
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 mb-6 shadow-sm transition-colors">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-6 flex items-center gap-2">
              <Bell className="text-blue-600 dark:text-blue-400" />
              Notificações
            </h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  Notificações por email
                </span>
                <input
                  type="checkbox"
                  checked={user.notifications}
                  onChange={e => setUser({ ...user, notifications: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 bg-white dark:bg-slate-700 transition-colors"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  Newsletter semanal
                </span>
                <input
                  type="checkbox"
                  checked={user.newsletter}
                  onChange={e => setUser({ ...user, newsletter: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 bg-white dark:bg-slate-700 transition-colors"
                />
              </label>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 mb-6 shadow-sm transition-colors">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-6 flex items-center gap-2">
              <Lock className="text-blue-600 dark:text-blue-400" />
              Segurança
            </h2>
            <button className="px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all">
              Alterar Senha
            </button>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <Save size={20} />
            Salvar Alterações
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default SettingsPage
