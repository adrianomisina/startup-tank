import { BookOpen, Calendar, Clock, Edit3, Star, Users, Save, X, AlertCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import api from '../services/api'

const MyMentorProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null)
  const [mentorData, setMentorData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Form fields
  const [formData, setFormData] = useState({
    bio: '',
    expertise: [] as string[],
    years_experience: 1,
    hourly_rate: 100,
    skills: [] as string[],
    availability: 'Horário comercial'
  })

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await api.get('/mentors/me')
      setMentorData(res.data)
      setFormData({
        bio: res.data.bio,
        expertise: res.data.expertise || [],
        years_experience: res.data.years_experience,
        hourly_rate: res.data.hourly_rate,
        skills: res.data.skills || [],
        availability: res.data.availability?.text || 'Horário comercial'
      })
    } catch (err: any) {
      if (err.response?.status === 404) {
        setMentorData(null)
      } else {
        setError('Erro ao carregar perfil de mentor.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const userJson = localStorage.getItem('user')
    if (userJson) {
      setUser(JSON.parse(userJson))
    }
    fetchData()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const dataToSend = {
        ...formData,
        availability: { text: formData.availability }
      }
      const res = await api.post('/mentors', dataToSend)
      setMentorData(res.data)
      setIsEditing(false)
      setError(null)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao salvar perfil.')
    } finally {
      setLoading(false)
    }
  }

  if (loading && !mentorData && !isEditing) {
    return (
      <Layout showSidebar={true}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout showSidebar={true}>
      <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-center gap-3">
              <AlertCircle className="text-red-500" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {!mentorData && !isEditing ? (
            <div className="bg-white rounded-[3rem] p-12 text-center border border-slate-200 shadow-xl">
              <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Users size={48} />
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Torne-se um Mentor</h1>
              <p className="text-slate-600 text-lg mb-12 max-w-2xl mx-auto">
                Compartilhe sua experiência e ajude a impulsionar a próxima geração de empreendedores.
              </p>
              <button 
                onClick={() => setIsEditing(true)} 
                className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-700 shadow-lg transition-all transform hover:scale-105"
              >
                Configurar Perfil de Mentor
              </button>
            </div>
          ) : isEditing ? (
            <div className="bg-white rounded-[3rem] p-8 sm:p-12 border border-slate-200 shadow-xl animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold text-slate-900">Editar Perfil de Mentor</h1>
                <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Especialidade Principal</label>
                    <input
                      type="text"
                      value={formData.expertise[0] || ''}
                      onChange={e => setFormData({ ...formData, expertise: [e.target.value] })}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none transition-all"
                      placeholder="Ex: Growth Hacking, Fundraising..."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Anos de Experiência</label>
                    <input
                      type="number"
                      value={formData.years_experience}
                      onChange={e => setFormData({ ...formData, years_experience: parseInt(e.target.value) })}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none transition-all"
                      min="1"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Taxa por Hora (R$)</label>
                    <input
                      type="number"
                      value={formData.hourly_rate}
                      onChange={e => setFormData({ ...formData, hourly_rate: parseInt(e.target.value) })}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none transition-all"
                      min="0"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Disponibilidade</label>
                    <input
                      type="text"
                      value={formData.availability}
                      onChange={e => setFormData({ ...formData, availability: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none transition-all"
                      placeholder="Ex: Seg a Sex, 14h-18h"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Biografia Profissional</label>
                  <textarea
                    rows={4}
                    value={formData.bio}
                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none transition-all resize-none"
                    placeholder="Conte sua trajetória..."
                    required
                  />
                </div>

                <div className="flex justify-end gap-4 pt-6">
                  <button 
                    type="button"
                    onClick={() => setIsEditing(false)} 
                    className="px-8 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    Descartar
                  </button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all disabled:opacity-50"
                  >
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={20} />}
                    Salvar Perfil
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Profile View */
            <div className="animate-in fade-in duration-500">
              <div className="bg-white rounded-[3rem] p-8 sm:p-12 border border-slate-200 shadow-xl mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl -mr-32 -mt-32 opacity-60"></div>
                
                <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                  <div className="relative shrink-0">
                    <div className="w-40 h-40 rounded-4xl bg-blue-600 flex items-center justify-center text-5xl font-bold text-white shadow-2xl">
                      {user?.name?.[0]}
                    </div>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-3 rounded-2xl shadow-xl hover:scale-110 transition-transform"
                    >
                      <Edit3 size={20} />
                    </button>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                      <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                        {mentorData.expertise?.[0] || 'Mentor'}
                      </span>
                      <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                        <Star size={14} fill="currentColor" />
                        <span>{mentorData.rating} ({mentorData.sessionsCompleted || 0} sessões)</span>
                      </div>
                    </div>
                    <h1 className="text-5xl font-extrabold text-slate-900 mb-4">{user?.name}</h1>
                    <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                      Gerencie sua visibilidade e preferências como mentor na plataforma.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-lg flex items-center gap-6">
                      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                        <Users size={32} />
                      </div>
                      <div>
                        <div className="text-3xl font-extrabold text-slate-900">{mentorData.activeStudents || 0}</div>
                        <div className="text-xs font-bold text-slate-500 uppercase">Alunos Ativos</div>
                      </div>
                    </div>
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-lg flex items-center gap-6">
                      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                        <Calendar size={32} />
                      </div>
                      <div>
                        <div className="text-3xl font-extrabold text-slate-900">{mentorData.sessionsCompleted || 0}</div>
                        <div className="text-xs font-bold text-slate-500 uppercase">Total de Sessões</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-lg">
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <BookOpen className="text-blue-600" size={24} />
                        Sobre Você
                      </h2>
                      <button onClick={() => setIsEditing(true)} className="text-blue-600 font-bold text-sm hover:underline">Editar</button>
                    </div>
                    <p className="text-slate-700 text-lg leading-relaxed mb-8">
                      {mentorData.bio}
                    </p>
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                            <Clock className="text-blue-600" size={20} />
                         </div>
                         <div>
                           <div className="font-bold text-slate-900">{mentorData.availability?.text || 'Horário comercial'}</div>
                           <div className="text-sm text-slate-500">Sua agenda disponível para mentorias</div>
                         </div>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                   <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl border border-slate-800">
                      <h3 className="text-xl font-bold mb-6">Configurações de Valor</h3>
                      <div className="mb-8">
                        <div className="text-slate-400 text-xs font-bold uppercase mb-1">Taxa por Hora</div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-extrabold">R$ {mentorData.hourly_rate}</span>
                          <span className="text-slate-400 text-sm">/ hora</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all mb-4"
                      >
                        Alterar Valor
                      </button>
                      <p className="text-xs text-slate-500 text-center">
                        Você recebe R$ {(mentorData.hourly_rate * 0.9).toFixed(2)} líquidos após taxas da plataforma.
                      </p>
                   </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default MyMentorProfilePage
