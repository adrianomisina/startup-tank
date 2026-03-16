import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  MessageSquare,
  Star,
  Award,
  BookOpen
} from 'lucide-react'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import api from '../services/api'

const MentorProfilePage: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [mentor, setMentor] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchMentor = async () => {
      try {
        setLoading(true)
        const response = await api.get(`/mentors/${id}`)
        setMentor(response.data)
      } catch (err: any) {
        console.error('Error fetching mentor:', err)
        setError('Não foi possível carregar os dados do mentor.')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchMentor()
    }
  }, [id])

  if (loading) {
    return (
      <Layout showSidebar={true}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    )
  }

  if (error || !mentor) {
    return (
      <Layout showSidebar={true}>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-slate-600 mb-4">{error || 'Mentor não encontrado.'}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold"
          >
            Voltar
          </button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout showSidebar={true}>
      <div className="bg-slate-50 min-h-screen py-12 px-4">
        {/* Botão Voltar */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium px-4 py-2 rounded-lg hover:bg-slate-100 transition-all font-bold"
        >
          <ArrowLeft size={20} />
          <span>Voltar para busca</span>
        </button>

        <div className="max-w-5xl mx-auto">
          {/* Cover / Header */}
          <div className="bg-white rounded-[3rem] p-8 sm:p-12 border border-slate-200 shadow-lg mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl -mr-32 -mt-32 opacity-60"></div>

            <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-40 h-40 rounded-4xl bg-slate-100 overflow-hidden shadow-2xl">
                   <img 
                    src={`https://i.pravatar.cc/200?u=${mentor.id}`} 
                    className="w-full h-full object-cover" 
                    alt={mentor.name} 
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-3 rounded-2xl shadow-xl">
                  <Award size={24} />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                  <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    {mentor.expertise}
                  </span>
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    <Star size={14} fill="currentColor" />
                    <span>{mentor.rating} (120 avaliações)</span>
                  </div>
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">{mentor.name}</h1>
                <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                  Mentor especialista em <span className="text-blue-600 font-bold">{mentor.expertise}</span> com mais de <span className="font-bold text-slate-900">{mentor.experience} anos</span> de experiência no mercado de tecnologia.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Bio & Education */}
              <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-200 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <BookOpen className="text-blue-600" size={24} />
                  Sobre o Mentor
                </h2>
                <p className="text-slate-700 leading-relaxed mb-8 text-lg">
                  {mentor.bio}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {mentor.skills?.map((skill: string) => (
                    <span key={skill} className="bg-slate-50 text-slate-600 px-4 py-2 rounded-xl text-sm font-bold border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase mb-2">Formação</div>
                  <div className="text-lg font-bold text-slate-900">{mentor.education}</div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-lg text-center">
                  <div className="text-4xl font-extrabold text-blue-600 mb-2">{mentor.sessionsCompleted}</div>
                  <div className="text-sm font-bold text-slate-500 uppercase">Sessões Realizadas</div>
                </div>
                <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-lg text-center">
                  <div className="text-4xl font-extrabold text-emerald-600 mb-2">{mentor.activeStudents}</div>
                  <div className="text-sm font-bold text-slate-500 uppercase">Alunos Ativos</div>
                </div>
              </div>
            </div>

            {/* Sticky Sidebar */}
            <div className="space-y-6">
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl border border-slate-800 sticky top-24">
                <div className="mb-8">
                  <div className="text-slate-400 text-sm font-bold uppercase mb-1">Investimento</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold">R$ {mentor.rate}</span>
                    <span className="text-slate-400 text-sm">/ hora</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-sm text-slate-200">
                    <Clock size={20} className="text-blue-400 shrink-0" />
                    <span>Sessão de 60 minutos</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-200">
                    <Calendar size={20} className="text-blue-400 shrink-0" />
                    <span>Agendamento flexível</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-200">
                    <CheckCircle size={20} className="text-emerald-400 shrink-0" />
                    <span>Gravação da mentoria incluída</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30">
                    Agendar Mentoria
                  </button>
                  <button 
                    onClick={() => navigate('/messages')}
                    className="w-full bg-white/10 text-white py-4 rounded-2xl font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={18} /> Chat Direto
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MentorProfilePage
