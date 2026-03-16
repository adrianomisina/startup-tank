import {
  CheckCircle2,
  ChevronRight,
  Clock,
  MessageSquare,
  Plus,
  Rocket,
  Search,
  TrendingUp,
  Users
} from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'

const DashboardPage: React.FC = () => {
  const [user, setUser] = React.useState<any>(null)
  const [role, setRole] = useState<'startup_founder' | 'mentor' | 'investor'>('startup_founder')
  const navigate = useNavigate()

  React.useEffect(() => {
    const userJson = localStorage.getItem('user')
    if (userJson) {
      const userData = JSON.parse(userJson)
      setUser(userData)
      // Normalizar o papel para os tipos esperados no dashboard
      const normalizedRole = userData.role === 'founder' ? 'startup_founder' : userData.role
      setRole(normalizedRole)
    }
  }, [])

  const stats = {
    startup_founder: [
      {
        label: 'Pitch Decks Enviados',
        value: '12',
        icon: Rocket,
        color: 'text-blue-600',
        bg: 'bg-blue-100'
      },
      {
        label: 'Mentorias Agendadas',
        value: '4',
        icon: Users,
        color: 'text-emerald-600',
        bg: 'bg-emerald-100'
      },
      {
        label: 'Interesses de Investimento',
        value: '3',
        icon: TrendingUp,
        color: 'text-purple-600',
        bg: 'bg-purple-100'
      }
    ],
    mentor: [
      {
        label: 'Alunos Ativos',
        value: '8',
        icon: Users,
        color: 'text-blue-600',
        bg: 'bg-blue-100'
      },
      {
        label: 'Sessões Realizadas',
        value: '45',
        icon: CheckCircle2,
        color: 'text-emerald-600',
        bg: 'bg-emerald-100'
      },
      {
        label: 'Receita Este Mês',
        value: 'R$ 2.4k',
        icon: TrendingUp,
        color: 'text-purple-600',
        bg: 'bg-purple-100'
      }
    ],
    investor: [
      {
        label: 'Startups em Análise',
        value: '24',
        icon: Search,
        color: 'text-blue-600',
        bg: 'bg-blue-100'
      },
      {
        label: 'Investimentos Efetuados',
        value: '5',
        icon: CheckCircle2,
        color: 'text-emerald-600',
        bg: 'bg-emerald-100'
      },
      {
        label: 'Novo Deal Flow',
        value: '12',
        icon: Clock,
        color: 'text-purple-600',
        bg: 'bg-purple-100'
      }
    ]
  }

  return (
    <Layout showSidebar={true} role={role}>
      <div className="flex bg-transparent min-h-screen">
        {/* Main Content */}
        <main className="flex-1 w-full overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
              {/* Role Switcher - Scrollable on mobile */}
              <div className="flex gap-2 mb-6 sm:mb-8 bg-white dark:bg-slate-800/40 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-x-auto backdrop-blur-sm">
                {['startup_founder', 'mentor', 'investor'].map(r => (
                  <button
                    key={r}
                    onClick={() => setRole(r as any)}
                    className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold capitalize transition-all whitespace-nowrap shrink-0 ${
                      role === r
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    {r.replace('_', ' ')}
                  </button>
                ))}
              </div>

              {/* Header - Stacked on mobile */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Olá, {user?.name?.split(' ')[0] || 'Adriano'} 👋</h1>
                  <p className="text-slate-600 dark:text-slate-400 text-lg">Aqui está o que está acontecendo hoje.</p>
                </div>
                <button 
                  onClick={() => {
                    if (role === 'startup_founder') navigate('/register-startup')
                    if (role === 'investor') navigate('/startups')
                    if (role === 'mentor') navigate('/messages') // or something else
                  }}
                  className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 shrink-0"
                >
                  <Plus size={20} />
                  <span className="text-sm sm:text-base">
                    {role === 'startup_founder'
                      ? 'Nova Startup'
                      : role === 'mentor'
                        ? 'Disponibilidade'
                        : 'Buscar Startups'}
                  </span>
                </button>
              </div>

              {/* Stats Grid - 1 col mobile, 2 col tablet, 3 col desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                {stats[role].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-900/40 p-6 sm:p-8 rounded-3xl sm:rounded-4xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all backdrop-blur-sm"
                  >
                    <div
                      className={`${stat.bg} dark:bg-blue-500/10 ${stat.color} dark:text-blue-400 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 sm:mb-6`}
                    >
                      <stat.icon size={24} />
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Content Sections - Stacked on mobile */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {/* Activity Feed */}
                <div className="bg-white dark:bg-slate-900/40 rounded-3xl sm:rounded-4xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm backdrop-blur-sm">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      Atividade Recente
                    </h2>
                    <button className="text-blue-600 font-bold text-xs sm:text-sm hover:text-blue-700 hover:underline transition-colors whitespace-nowrap">
                      Ver tudo
                    </button>
                  </div>
                  <div className="space-y-4 sm:space-y-6">
                    {[1, 2, 3].map(i => (
                      <div
                        key={i}
                        className="flex items-start sm:items-center gap-3 sm:gap-4 group cursor-pointer p-2 sm:p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 transition-colors shrink-0">
                          <MessageSquare size={18} className="sm:w-5 sm:h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                            Nova mensagem de Carlos Silva
                          </div>
                          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 truncate">
                            "Olá Adriano, vi o seu pitch e gostaria de marcar uma conversa..."
                          </div>
                        </div>
                        <div className="text-xs text-slate-500 font-medium whitespace-nowrap shrink-0">
                          2h atrás
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended/Quick Actions */}
                <div className="bg-white dark:bg-slate-900/40 rounded-3xl sm:rounded-4xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm backdrop-blur-sm">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-8">
                    Sugestões para Você
                  </h2>
                  <div className="space-y-3 sm:space-y-4">
                    {[
                      {
                        title: 'Complete seu Perfil',
                        desc: 'Aumente sua visibilidade em 300%',
                        path: role === 'startup_founder' || (user?.role === 'founder') ? '/register-startup' : (role === 'mentor' ? '/mentor-profile' : '/investor-focus')
                      },
                      {
                        title: 'Buscar Mentores',
                        desc: 'Encontre especialistas em Growth',
                        path: '/mentores'
                      },
                      {
                        title: 'Explorar Startups',
                        desc: 'Novos negócios promissores',
                        path: '/startups'
                      }
                    ].map((item, i) => (
                      <div
                        key={i}
                        onClick={() => navigate(item.path)}
                        className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-100/50 dark:bg-slate-800/30 flex items-center justify-between group hover:bg-slate-200/50 dark:hover:bg-slate-800/60 transition-all border border-slate-200 dark:border-slate-800/50 cursor-pointer shadow-sm hover:shadow-md"
                      >
                        <div className="min-w-0">
                          <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                            {item.title}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">{item.desc}</div>
                        </div>
                        <ChevronRight
                          size={20}
                          className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0 ml-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default DashboardPage
