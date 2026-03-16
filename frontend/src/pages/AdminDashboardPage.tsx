import {
  ArrowUpRight,
  BarChart3,
  CheckCircle,
  Clock,
  Rocket,
  ShieldCheck,
  Users,
  XCircle
} from 'lucide-react'
import React from 'react'
import Layout from '../components/Layout'

const AdminDashboardPage: React.FC = () => {
  const pendingStartups = [
    {
      id: 1,
      name: 'BioTech Soluções',
      founder: 'Marcos Braz',
      industry: 'HealthTech',
      date: '10/03/2026'
    },
    { id: 2, name: 'PayFlow', founder: 'Julia Costa', industry: 'FinTech', date: '09/03/2026' },
    { id: 3, name: 'EduLoop', founder: 'Sérgio Santos', industry: 'EdTech', date: '08/03/2026' }
  ]

  return (
    <Layout showSidebar={true}>
      <div className="bg-slate-50 min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-slate-950 flex items-center gap-2">
              <ShieldCheck className="text-blue-600" />
              Painel Administrativo
            </h1>
            <p className="text-slate-500">Moderação e análise global da plataforma StartupTank.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Total Usuários', value: '1.240', icon: Users, color: 'text-blue-600' },
              { label: 'Startups Ativas', value: '450', icon: Rocket, color: 'text-emerald-600' },
              {
                label: 'Investimentos',
                value: 'R$ 12M',
                icon: BarChart3,
                color: 'text-purple-600'
              },
              { label: 'Pendentes', value: '8', icon: Clock, color: 'text-amber-600' }
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl bg-slate-50 ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <span className="text-emerald-500 flex items-center text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                    +12% <ArrowUpRight size={12} />
                  </span>
                </div>
                <div className="text-2xl font-bold text-slate-950">{stat.value}</div>
                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Approval Table */}
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-950">
                  Aprovações Pendentes
                </h2>
                <button className="text-blue-600 font-bold text-sm">Ver fila completa</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                      <th className="px-8 py-4">Startup / Fundador</th>
                      <th className="px-8 py-4">Setor</th>
                      <th className="px-8 py-4">Data</th>
                      <th className="px-8 py-4 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pendingStartups.map(s => (
                      <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="font-bold text-slate-950">{s.name}</div>
                          <div className="text-xs text-slate-400">{s.founder}</div>
                        </td>
                        <td className="px-8 py-6 text-sm text-slate-500 font-medium">
                          {s.industry}
                        </td>
                        <td className="px-8 py-6 text-sm text-slate-400">{s.date}</td>
                        <td className="px-8 py-6 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"
                              title="Aprovar"
                            >
                              <CheckCircle size={20} />
                            </button>
                            <button
                              className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                              title="Rejeitar"
                            >
                              <XCircle size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Platform Analytics Mini */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950 mb-8">Novos Cadastros</h2>
              <div className="space-y-6">
                {[
                  { name: 'Ricardo Amaro', role: 'Investidor', time: '10 min atrás' },
                  { name: 'HealthSafe', role: 'Startup', time: '45 min atrás' },
                  { name: 'Alice Wong', role: 'Mentor', time: '1h atrás' },
                  { name: 'TechFlow', role: 'Startup', time: '3h atrás' }
                ].map((u, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400">
                      {u.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-slate-950">{u.name}</div>
                      <div className="text-xs text-slate-400 font-medium capitalize">{u.role}</div>
                    </div>
                    <div className="text-[10px] text-slate-300 font-bold uppercase">{u.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboardPage
