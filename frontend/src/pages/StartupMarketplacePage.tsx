import { ExternalLink, Filter, Rocket, Search, Users } from 'lucide-react'
import React, { useState } from 'react'
import Layout from '../components/Layout'

const StartupMarketplacePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data for startups
  const startups = [
    {
      id: 1,
      name: 'EcoFlow',
      industry: 'CleanTech',
      stage: 'Seed',
      description: 'Sistema inteligente de gestão de água para condomínos.',
      team_size: 12
    },
    {
      id: 2,
      name: 'FinTrack',
      industry: 'FinTech',
      stage: 'Series A',
      description: 'Plataforma de gestão financeira para pequenas empresas.',
      team_size: 25
    },
    {
      id: 3,
      name: 'HealthConnect',
      industry: 'HealthTech',
      stage: 'MVP',
      description: 'Telemedicina para comunidades remotas.',
      team_size: 5
    },
    {
      id: 4,
      name: 'AgroSense',
      industry: 'AgroTech',
      stage: 'Pre-seed',
      description: 'Sensores IOT para monitoramento de solo em tempo real.',
      team_size: 8
    }
  ]

  const filteredStartups = startups.filter(
    s =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.industry.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Layout>
      <div className="bg-slate-950slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl font-extrabold text-bg-slate-950slate-950 mb-2">
                Marketplace de Startups
              </h1>
              <p className="text-slate-500">
                Descubra as próximas unicórnios do ecossistema brasileiro.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-3 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar por nome ou setor..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950white border border-slate-200 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
              <button className="bg-slate-950white border border-slate-200 p-3 rounded-2xl hover:bg-slate-950slate-50 transition-all">
                <Filter size={20} className="text-slate-600" />
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStartups.map(startup => (
              <div
                key={startup.id}
                className="bg-slate-950white rounded-4xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 bg-slate-950blue-50 rounded-2xl flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Rocket size={32} />
                  </div>
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      startup.stage === 'MVP'
                        ? 'bg-slate-950amber-100 text-amber-700'
                        : startup.stage === 'Seed'
                          ? 'bg-slate-950emerald-100 text-emerald-700'
                          : 'bg-primary/10 text-secondary'
                    }`}
                  >
                    {startup.stage}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-bg-slate-950slate-950 mb-2">
                  {startup.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-4 font-medium uppercase">
                  <span>{startup.industry}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>{startup.team_size} pessoas</span>
                  </div>
                </div>
                <p className="text-slate-600 mb-8 line-clamp-2 leading-relaxed">
                  {startup.description}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <a
                    href={`/startups/${startup.id}`}
                    className="text-secondary font-bold flex items-center gap-2 hover:underline"
                  >
                    Ver detalhes <ExternalLink size={16} />
                  </a>
                  <button className="bg-slate-950slate-900 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-slate-950black transition-all">
                    Investir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default StartupMarketplacePage
