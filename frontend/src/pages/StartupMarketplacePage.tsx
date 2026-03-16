import { ExternalLink, Filter, Rocket, Search, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import api from '../services/api'

const StartupMarketplacePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [startups, setStartups] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        setLoading(true)
        const res = await api.get('/startups')
        setStartups(res.data)
      } catch (err) {
        console.error('Error fetching startups:', err)
        // Fallback to mock data if API fails or returns empty for now
        setStartups([
          {
            _id: '1',
            name: 'EcoFlow',
            industry: 'CleanTech',
            stage: 'Seed',
            description: 'Sistema inteligente de gestão de água para condomínios.',
            team_size: 12
          },
          {
            _id: '2',
            name: 'FinTrack',
            industry: 'FinTech',
            stage: 'Series A',
            description: 'Plataforma de gestão financeira para pequenas empresas.',
            team_size: 25
          }
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchStartups()
  }, [])

  const filteredStartups = startups.filter(
    s =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.industry.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Layout showSidebar={true}>
      <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
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
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-200 outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                />
              </div>
              <button className="bg-white border border-slate-200 p-3 rounded-2xl hover:bg-slate-50 transition-all">
                <Filter size={20} className="text-slate-600" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStartups.map(startup => (
                <div
                  key={startup._id}
                  className="bg-white rounded-4xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Rocket size={32} />
                    </div>
                    <span
                      className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        startup.stage === 'MVP'
                          ? 'bg-amber-100 text-amber-700'
                          : startup.stage === 'Seed'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {startup.stage}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
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
                  <p className="text-slate-600 mb-8 line-clamp-2 leading-relaxed flex-1">
                    {startup.description}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <button
                      onClick={() => navigate(`/startups/${startup._id}`)}
                      className="text-blue-600 font-bold flex items-center gap-2 hover:underline"
                    >
                      Ver detalhes <ExternalLink size={16} />
                    </button>
                    <button className="bg-slate-900 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-black transition-all">
                      Investir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default StartupMarketplacePage
