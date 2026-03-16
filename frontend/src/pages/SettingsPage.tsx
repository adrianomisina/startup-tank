import { Bell, Lock, User, Palette, Shield, CreditCard, LogOut, Save, Camera } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'

const SettingsPage: React.FC = () => {
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('profile')
  const navigate = useNavigate()

  useEffect(() => {
    const userJson = localStorage.getItem('user')
    if (userJson) {
      setUser(JSON.parse(userJson))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'security', label: 'Segurança', icon: Lock },
    { id: 'appearance', label: 'Aparência', icon: Palette },
    { id: 'privacy', label: 'Privacidade', icon: Shield },
    { id: 'billing', label: 'Assinatura', icon: CreditCard },
  ]

  return (
    <Layout showSidebar={true}>
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen p-4 sm:p-8 lg:p-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Configurações</h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">Gerencie sua conta e preferências da plataforma.</p>
            </div>
            <button 
              onClick={handleLogout}
              className="px-6 py-3 rounded-2xl bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-bold hover:bg-red-100 dark:hover:bg-red-900/20 transition-all flex items-center gap-2 border border-red-100 dark:border-red-900/30"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Sair da Conta</span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Tabs */}
            <div className="w-full lg:w-64 shrink-0">
              <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30 translate-x-1'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-blue-600'
                    }`}
                  >
                    <tab.icon size={20} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1">
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/40">
                {activeTab === 'profile' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Informações do Perfil</h2>
                      
                      {/* Avatar Upload */}
                      <div className="flex flex-col sm:flex-row items-center gap-8 mb-12 p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                        <div className="relative group">
                          <div className="w-32 h-32 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-[2.5rem] flex items-center justify-center text-4xl font-bold border-4 border-white dark:border-slate-700 shadow-xl">
                            {user?.name?.[0] || 'A'}
                          </div>
                          <button className="absolute -bottom-2 -right-2 p-3 bg-slate-900 text-white rounded-2xl shadow-lg hover:scale-110 transition-all">
                            <Camera size={18} />
                          </button>
                        </div>
                        <div className="text-center sm:text-left">
                          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Foto de Perfil</h4>
                          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Recomendado: Quadrada, pelo menos 400x400px.</p>
                          <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                            <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-750 transition-all">
                              Fazer Upload
                            </button>
                            <button className="text-red-600 dark:text-red-400 px-4 py-2 text-sm font-bold hover:underline transition-all">
                              Remover
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Nome Completo</label>
                          <input
                            type="text"
                            defaultValue={user?.name}
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 outline-none transition-all font-medium"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email Profissional</label>
                          <input
                            type="email"
                            defaultValue={user?.email}
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 outline-none transition-all font-medium"
                          />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-sm font-bold text-slate-700 ml-1">Biografia Curta</label>
                          <textarea
                            rows={4}
                            placeholder="Uma breve descrição sobre você ou seu negócio..."
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-4">
                      <button className="px-8 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all order-2 sm:order-1">
                        Descartar Alterações
                      </button>
                      <button className="px-10 py-4 rounded-2xl font-bold bg-blue-600 text-white shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-2 order-1 sm:order-2">
                        <Save size={20} />
                        Salvar Perfil
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Segurança da Conta</h2>
                      <div className="grid grid-cols-1 gap-8">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 ml-1">Senha Atual</label>
                          <input type="password" placeholder="••••••••" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none transition-all font-medium" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 ml-1">Nova Senha</label>
                          <input type="password" placeholder="Mínimo 8 caracteres" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none transition-all font-medium" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 ml-1">Confirmar Nova Senha</label>
                          <input type="password" placeholder="••••••••" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none transition-all font-medium" />
                        </div>
                      </div>
                    </div>
                    <div className="pt-8 border-t border-slate-100 flex justify-end">
                      <button className="px-10 py-4 rounded-2xl font-bold bg-blue-600 text-white shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2">
                        <Lock size={20} /> Atualizar Senha
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-8">Preferências de Notificação</h2>
                      <div className="space-y-6">
                        {[
                          { title: 'Novas Mensagens', desc: 'Sempre que receber uma nova mensagem de um mentor ou investidor.' },
                          { title: 'Interesse em Startup', desc: 'Notificações quando um investidor demonstrar interesse no seu pitch.' },
                          { title: 'Mentoria Confirmada', desc: 'Confirmações de agendamento e lembretes de sessões.' },
                          { title: 'Atualizações da Plataforma', desc: 'Novos recursos e notícias importantes do StartupTank.' }
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100">
                            <div>
                              <h4 className="font-bold text-slate-900">{item.title}</h4>
                              <p className="text-sm text-slate-500">{item.desc}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" defaultChecked className="sr-only peer" />
                              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'appearance' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-8">Personalização da Interface</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="p-6 rounded-3xl border-2 border-blue-600 bg-blue-50/50 flex flex-col items-center gap-4 cursor-pointer">
                          <div className="w-full aspect-video bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col p-2 gap-2">
                            <div className="w-1/2 h-2 bg-slate-200 rounded-full"></div>
                            <div className="flex-1 bg-slate-50 rounded-lg"></div>
                          </div>
                          <span className="font-bold text-blue-600">Claro (Padrão)</span>
                        </div>
                        <div className="p-6 rounded-3xl border-2 border-slate-200 bg-white flex flex-col items-center gap-4 cursor-pointer hover:border-slate-300 transition-all">
                          <div className="w-full aspect-video bg-slate-900 rounded-xl border border-slate-800 shadow-sm overflow-hidden flex flex-col p-2 gap-2">
                            <div className="w-1/2 h-2 bg-slate-700 rounded-full"></div>
                            <div className="flex-1 bg-slate-800 rounded-lg"></div>
                          </div>
                          <span className="font-bold text-slate-600">Escuro</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'privacy' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-8">Configurações de Privacidade</h2>
                      <div className="space-y-6">
                        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-slate-900">Perfil Público</h4>
                            <p className="text-sm text-slate-500">Tornar seu perfil visível nos resultados de busca.</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-slate-900">Dados Financeiros</h4>
                            <p className="text-sm text-slate-500">Permitir que investidores verificados vejam métricas detalhadas.</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'billing' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Seu Plano e Assinatura</h2>
                      <div className="p-8 rounded-[2rem] bg-slate-900 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
                        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-6">
                          <div>
                            <span className="bg-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">Free Plan</span>
                            <h3 className="text-3xl font-extrabold mb-1">Membro Gratuito</h3>
                            <p className="text-slate-400">Acesso básico aos marketplaces e mensagens.</p>
                          </div>
                          <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all shrink-0">
                            Fazer Upgrade
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-slate-700 ml-1">Histórico de Cobrança</h4>
                      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between text-slate-500 font-medium italic">
                        Nenhuma fatura encontrada.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SettingsPage
