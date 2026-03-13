import { Briefcase, DollarSign, ExternalLink, Search } from 'lucide-react'
import React, { useState } from 'react'
import Layout from '../components/Layout'

const InvestorMarketplacePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const investors = [
    {
      id: 1,
      name: 'Anjos do Brasil',
      focus: ['SaaS', 'FinTech'],
      ticket: 'R$ 100k - 500k',
      portfolio: 150,
      bio: 'A maior rede de investidores anjo do país.'
    },
    {
      id: 2,
      name: 'Astella Investimentos',
      focus: ['Marketplace', 'EdTech'],
      ticket: 'R$ 500k - 2M',
      portfolio: 45,
      bio: 'Venture Capital focado em parcerias de longo prazo.'
    },
    {
      id: 3,
      name: 'Monashees',
      focus: ['Consumer', 'Infrastructure'],
      ticket: 'R$ 2M+',
      portfolio: 80,
      bio: 'Ajudando fundadores a construir negócios globais.'
    },
    {
      id: 4,
      name: 'Canary',
      focus: ['Agnóstico'],
      ticket: 'R$ 500k - 1M',
      portfolio: 100,
      bio: 'Primeiro cheque para fundadores excepcionais.'
    }
  ]

  // Filtrar investidores baseado no searchTerm
  const filteredInvestors = investors.filter(
    investor =>
      investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.focus.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
                Marketplace de Investidores
              </h1>
              <p className="text-slate-600">
                Encontre os parceiros de capital ideais para o seu estágio atual.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-3 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por nome ou foco..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Investors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInvestors.length > 0 ? (
              filteredInvestors.map(investor => (
                <div
                  key={investor.id}
                  className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  {/* Avatar + Name */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center font-bold text-xl shrink-0">
                      {investor.name[0]}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900">{investor.name}</h3>
                      {/* Focus Tags */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {investor.focus.map(f => (
                          <span
                            key={f}
                            className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-slate-600 text-sm mb-8 leading-relaxed line-clamp-2">
                    {investor.bio}
                  </p>

                  {/* Info Section */}
                  <div className="space-y-4 mb-8 pb-8 border-b border-slate-200">
                    {/* Ticket Size */}
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <DollarSign size={18} className="text-blue-600 shrink-0" />
                      <span className="text-slate-600">
                        Ticket: <span className="text-slate-900 font-bold">{investor.ticket}</span>
                      </span>
                    </div>

                    {/* Portfolio */}
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <Briefcase size={18} className="text-emerald-600 shrink-0" />
                      <span className="text-slate-600">
                        Portfólio:{' '}
                        <span className="text-slate-900 font-bold">
                          {investor.portfolio} startups
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                    Entrar em Contato
                    <ExternalLink size={18} />
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-slate-600 text-lg">
                  Nenhum investidor encontrado para "{searchTerm}"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default InvestorMarketplacePage
