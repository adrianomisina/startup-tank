import { Award, Briefcase, Calendar, ChevronRight, DollarSign, Search, Star } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import api from '../services/api'

const MentorMarketplacePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [mentors, setMentors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true)
        const res = await api.get('/mentors')
        setMentors(res.data)
      } catch (err) {
        console.error('Error fetching mentors:', err)
        // Fallback to mock data if API fails or returns empty for now
        setMentors([
          {
            _id: '1',
            userId: { name: 'Carlos Silva', _id: 'u1' },
            expertise: ['Growth Hacking'],
            years_experience: 15,
            rating: 4.9,
            hourly_rate: 250,
            bio: 'Ex-VP de Growth no Nubank. Especialista em escalar startups de série A.'
          },
          {
            _id: '2',
            userId: { name: 'Ana Oliveira', _id: 'u2' },
            expertise: ['UX/UI & Product'],
            years_experience: 10,
            rating: 5.0,
            hourly_rate: 200,
            bio: 'Designer premiada com foco em experiência do usuário e retenção.'
          }
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchMentors()
  }, [])

  const filteredMentors = mentors.filter(
    mentor =>
      (mentor.userId?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (mentor.expertise?.[0] || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (mentor.bio || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Layout showSidebar={true}>
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Encontre seu Mentor</h1>
              <p className="text-slate-600 dark:text-slate-400">
                Conecte-se com quem já chegou lá e acelere sua curva de aprendizado.
              </p>
            </div>

            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-3 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Ex: Growth, Fundraising..."
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredMentors.length > 0 ? (
                filteredMentors.map(mentor => (
                  <div
                    key={mentor._id}
                    className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-8 hover:shadow-lg dark:hover:shadow-black/40 hover:-translate-y-1 transition-all group cursor-pointer"
                    onClick={() => navigate(`/mentors/${mentor._id}`)}
                  >
                    <div className="relative shrink-0">
                      <div className="w-32 h-32 rounded-3xl bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <img
                          src={`https://i.pravatar.cc/150?u=${mentor._id}`}
                          alt={mentor.userId?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg">
                        <Award size={20} />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{mentor.userId?.name}</h3>
                          <p className="text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wide">
                            {mentor.expertise?.[0]}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-sm font-bold shrink-0">
                          <Star size={16} fill="currentColor" />
                          <span>{mentor.rating || 'N/A'}</span>
                        </div>
                      </div>

                      <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed line-clamp-2">
                        {mentor.bio}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                          <Briefcase size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                          <span>
                            <span className="font-bold text-slate-900 dark:text-white">{mentor.years_experience}</span> anos
                            exp.
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                          <DollarSign size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>
                            R$ <span className="font-bold text-slate-900 dark:text-white">{mentor.hourly_rate}</span>/hora
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 active:bg-blue-800 transition-all text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                          <Calendar size={18} />
                          Agendar
                        </button>
                        <button className="px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center">
                          <ChevronRight size={20} className="text-slate-600 dark:text-slate-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Search size={48} className="mx-auto text-slate-300 mb-4" />
                  <p className="text-slate-600 text-lg font-medium">
                    Nenhum mentor encontrado
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

export default MentorMarketplacePage
