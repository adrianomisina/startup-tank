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
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'

const DashboardPage: React.FC = () => {
  const [role, setRole] = useState<'founder' | 'mentor' | 'investor'>('founder')

  const stats = {
    founder: [
      {
        label: 'Pitch Decks Enviados',
        value: '12',
        icon: Rocket,
        color: 'text-blue-600',
        bg: 'bg-slate-950blue-100'
      },
      {
        label: 'Mentorias Agendadas',
        value: '4',
        icon: Users,
        color: 'text-emerald-600',
        bg: 'bg-slate-950emerald-100'
      },
      {
        label: 'Interesses de Investimento',
        value: '3',
        icon: TrendingUp,
        color: 'text-purple-600',
        bg: 'bg-slate-950purple-100'
      }
    ],
    mentor: [
      {
        label: 'Alunos Ativos',
        value: '8',
        icon: Users,
        color: 'text-blue-600',
        bg: 'bg-slate-950blue-100'
      },
      {
        label: 'Sessões Realizadas',
        value: '45',
        icon: CheckCircle2,
        color: 'text-emerald-600',
        bg: 'bg-slate-950emerald-100'
      },
      {
        label: 'Receita Este Mês',
        value: 'R$ 2.4k',
        icon: TrendingUp,
        color: 'text-purple-600',
        bg: 'bg-slate-950purple-100'
      }
    ],
    investor: [
      {
        label: 'Startups em Análise',
        value: '24',
        icon: Search,
        color: 'text-blue-600',
        bg: 'bg-slate-950blue-100'
      },
      {
        label: 'Investimentos Efetuados',
        value: '5',
        icon: CheckCircle2,
        color: 'text-emerald-600',
        bg: 'bg-slate-950emerald-100'
      },
      {
        label: 'Novo Deal Flow',
        value: '12',
        icon: Clock,
        color: 'text-purple-600',
        bg: 'bg-slate-950purple-100'
      }
    ]
  }

  return (
    <Layout>
      <div className="flex bg-slate-950slate-50 min-h-screen">
        <Sidebar role={role as any} />

        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Role Switcher (Mock for Demo) */}
            <div className="flex gap-4 mb-8 bg-slate-950white p-2 rounded-2xl border border-slate-200 w-fit">
              {['founder', 'mentor', 'investor'].map(r => (
                <button
                  key={r}
                  onClick={() => setRole(r as any)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all ${role === r ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-950slate-50'}`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-bg-slate-950slate-950">Olá, Adriano 👋</h1>
                <p className="text-slate-500 text-lg">Aqui está o que está acontecendo hoje.</p>
              </div>
              <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary transition-all flex items-center gap-2 shadow-lg shadow-blue-100">
                <Plus size={20} />
                {role === 'founder'
                  ? 'Nova Startup'
                  : role === 'mentor'
                    ? 'Disponibilidade'
                    : 'Buscar Startups'}
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {stats[role].map((stat, index) => (
                <div
                  key={index}
                  className="bg-slate-950white p-8 rounded-4xl border border-slate-100 shadow-sm"
                >
                  <div
                    className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-6`}
                  >
                    <stat.icon size={24} />
                  </div>
                  <div className="text-3xl font-bold text-bg-slate-950slate-950 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-slate-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Activity Feed */}
              <div className="bg-slate-950white rounded-4xl  border border-slate-100 p-8 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-bg-slate-950slate-950">
                    Atividade Recente
                  </h2>
                  <button className="text-secondary font-bold text-sm hover:underline">
                    Ver tudo
                  </button>
                </div>
                <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-12 h-12 rounded-full bg-slate-950slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-950blue-50 group-hover:text-secondary transition-colors">
                        <MessageSquare size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-bg-slate-950slate-950 group-hover:text-secondary transition-colors">
                          Nova mensagem de Carlos Silva
                        </div>
                        <div className="text-sm text-slate-400">
                          "Olá Adriano, vi o seu pitch e gostaria de marcar uma conversa..."
                        </div>
                      </div>
                      <div className="text-xs text-slate-400 font-medium">2h atrás</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended/Quick Actions */}
              <div className="bg-slate-950white rounded-4xl  border border-slate-100 p-8 shadow-sm">
                <h2 className="text-xl font-bold text-bg-slate-950slate-950 mb-8">
                  Sugestões para Você
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Complete seu Perfil',
                      desc: 'Aumente sua visibilidade em 300%',
                      action: 'Completar'
                    },
                    {
                      title: 'Buscar Mentores',
                      desc: 'Encontre especialistas em Growth',
                      action: 'Buscar'
                    },
                    {
                      title: 'Verificar Pitch Deck',
                      desc: 'Obtenha feedback antes de enviar',
                      action: 'Verificar'
                    }
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-6 rounded-2xl bg-slate-950slate-50 flex items-center justify-between group hover:bg-slate-950slate-100 transition-all border border-transparent hover:border-slate-200"
                    >
                      <div>
                        <div className="font-bold text-bg-slate-950slate-950">{item.title}</div>
                        <div className="text-xs text-slate-500">{item.desc}</div>
                      </div>
                      <ChevronRight
                        size={20}
                        className="text-slate-300 group-hover:text-secondary group-hover:translate-x-1 transition-all"
                      />
                    </div>
                  ))}
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
