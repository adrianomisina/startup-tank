import { Briefcase, DollarSign, ExternalLink, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import api from '../services/api'

const InvestorMarketplacePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [investors, setInvestors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        setLoading(true)
        const res = await api.get('/investors')
        setInvestors(res.data)
      } catch (err) {
        console.error('Error fetching investors:', err)
        // Fallback mock data
        setInvestors([
          {
            _id: '1',
            userId: { name: 'Anjos do Brasil' },
            investment_focus: ['SaaS', 'FinTech'],
            ticket_size_min: 100000,
            ticket_size_max: 500000,
            portfolio: ['Startup A', 'Startup B'],
            thesis: 'A maior rede de investidores anjo do país.'
          },
          {
            _id: '2',
            userId: { name: 'Astella Investimentos' },
            investment_focus: ['Marketplace', 'EdTech'],
            ticket_size_min: 500000,
            ticket_size_max: 2000000,
            portfolio: ['Startup C'],
            thesis: 'Venture Capital focado em parcerias de longo prazo.'
          }
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchInvestors()
  }, [])

  const filteredInvestors = investors.filter(
    investor =>
      (investor.userId?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (investor.investment_focus || []).some((f: string) => f.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <Layout showSidebar={true}>
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
                Marketplace de Investidores
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Encontre os parceiros de capital ideais para o seu estágio atual.
              </p>
            </div>

            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-3 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por nome ou foco..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredInvestors.length > 0 ? (
                filteredInvestors.map(investor => (
                  <div
                    key={investor._id}
                    className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg dark:hover:shadow-black/40 hover:-translate-y-1 transition-all flex flex-col"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center font-bold text-xl shrink-0">
                        {investor.userId?.name?.[0] || 'I'}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{investor.userId?.name}</h3>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {investor.investment_focus?.map((f: string) => (
                            <span
                              key={f}
                              className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 px-2 py-0.5 rounded-full"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 leading-relaxed line-clamp-3 flex-1">
                      {investor.thesis}
                    </p>

                    <div className="space-y-4 mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-3 text-sm font-medium">
                        <DollarSign size={18} className="text-blue-600 shrink-0" />
                        <span className="text-slate-600 dark:text-slate-400">
                          Ticket: <span className="text-slate-900 dark:text-white font-bold">
                            R$ {(investor.ticket_size_min / 1000).toFixed(0)}k - {(investor.ticket_size_max / 1000).toFixed(0)}k
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-sm font-medium">
                        <Briefcase size={18} className="text-emerald-600 shrink-0" />
                        <span className="text-slate-600 dark:text-slate-400">
                          Portfólio:{' '}
                          <span className="text-slate-900 dark:text-white font-bold">
                            {investor.portfolio?.length || 0} startups
                          </span>
                        </span>
                      </div>
                    </div>

                    <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                      Entrar em Contato
                      <ExternalLink size={18} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-slate-600 text-lg">
                    Nenhum investidor encontrado
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default InvestorMarketplacePage
