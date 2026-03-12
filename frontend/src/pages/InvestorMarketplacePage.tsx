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
      focus: ['Consumer', 'Infrasctructure'],
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

  return (
    <Layout>
      <div className="bg-slate-950slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl font-extrabold text-bg-slate-950slate-950 mb-2">
                Marketplace de Investidores
              </h1>
              <p className="text-slate-500">
                Encontre os parceiros de capital ideais para o seu estágio atual.
              </p>
            </div>
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-3 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por nome ou foco..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950white border border-slate-200 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {investors.map(investor => (
              <div
                key={investor.id}
                className="bg-slate-950white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-slate-950indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-bold text-xl">
                    {investor.name[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-bg-slate-950slate-950">
                      {investor.name}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {investor.focus.map(f => (
                        <span
                          key={f}
                          className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-slate-950indigo-50 px-2 py-0.5 rounded-full"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-slate-600 text-sm mb-8 leading-relaxed line-clamp-2">
                  {investor.bio}
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
                    <DollarSign size={18} className="text-slate-400" />
                    <span>
                      Ticket:{' '}
                      <span className="text-bg-slate-950slate-950 font-bold">
                        {investor.ticket}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
                    <Briefcase size={18} className="text-slate-400" />
                    <span>
                      Portfólio:{' '}
                      <span className="text-bg-slate-950slate-950 font-bold">
                        {investor.portfolio} startups
                      </span>
                    </span>
                  </div>
                </div>

                <button className="w-full bg-slate-950slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-950black transition-all flex items-center justify-center gap-2">
                  Entrar em Contato
                  <ExternalLink size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default InvestorMarketplacePage
