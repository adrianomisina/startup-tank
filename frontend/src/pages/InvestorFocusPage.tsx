import { Building2, DollarSign, Filter, Search, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import Layout from '../components/Layout'

const InvestorFocusPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSector, setSelectedSector] = useState('all')

  const investors = [
    {
      id: 1,
      name: 'Sequoia Capital',
      focus: 'Tecnologia, SaaS',
      ticketSize: 'R$ 5M - R$ 50M',
      stage: 'Série A/B',
      portfolio: 120
    },
    {
      id: 2,
      name: 'Andreessen Horowitz',
      focus: 'FinTech, Crypto',
      ticketSize: 'R$ 10M - R$ 100M',
      stage: 'Série B/C',
      portfolio: 85
    },
    {
      id: 3,
      name: 'Accel Partners',
      focus: 'SaaS, Enterprise',
      ticketSize: 'R$ 3M - R$ 30M',
      stage: 'Seed/Série A',
      portfolio: 95
    }
  ]

  const filteredInvestors = investors.filter(inv =>
    inv.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Layout showSidebar={true}>
      <div className="bg-slate-50 min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-950 flex items-center gap-2">
              <Building2 className="text-blue-600" />
              Investidores em Foco
            </h1>
            <p className="text-slate-500">Encontre investidores alinhados ao seu perfil</p>
          </div>

          {/* Search & Filters */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 mb-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar investidores..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                />
              </div>
              <select
                value={selectedSector}
                onChange={e => setSelectedSector(e.target.value)}
                className="px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              >
                <option value="all">Todos os Setores</option>
                <option value="tech">Tecnologia</option>
                <option value="fintech">FinTech</option>
                <option value="saas">SaaS</option>
              </select>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
                <Filter size={20} />
                Filtrar
              </button>
            </div>
          </div>

          {/* Investors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvestors.map(investor => (
              <div
                key={investor.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Building2 className="text-blue-600" size={24} />
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
                    Ativo
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-950 mb-2">{investor.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{investor.focus}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign size={16} className="text-slate-400" />
                    <span className="text-slate-600">{investor.ticketSize}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp size={16} className="text-slate-400" />
                    <span className="text-slate-600">{investor.stage}</span>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
                  Ver Perfil
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default InvestorFocusPage
