import { BarChart3, PieChart, Target, TrendingUp, Edit3, Save, X, AlertCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import api from '../services/api'

const InvestorFocusPage: React.FC = () => {
  const [user, setUser] = useState<any>(null)
  const [focusData, setFocusData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form fields
  const [formData, setFormData] = useState({
    investment_focus: [] as string[],
    ticket_size_min: 100000,
    ticket_size_max: 500000,
    portfolio: [] as string[],
    thesis: ''
  })

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await api.get('/investors/me')
      setFocusData(res.data)
      setFormData({
        investment_focus: res.data.investment_focus || [],
        ticket_size_min: res.data.ticket_size_min,
        ticket_size_max: res.data.ticket_size_max,
        portfolio: res.data.portfolio || [],
        thesis: res.data.thesis || ''
      })
    } catch (err: any) {
      if (err.response?.status === 404) {
        setFocusData(null)
      } else {
        setError('Erro ao carregar dados do investidor.')
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
      const res = await api.post('/investors', formData)
      setFocusData(res.data)
      setIsEditing(false)
      setError(null)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao salvar critérios.')
    } finally {
      setLoading(false)
    }
  }

  if (loading && !focusData && !isEditing) {
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

          {!focusData && !isEditing ? (
            <div className="bg-white rounded-[3rem] p-12 text-center border border-slate-200 shadow-xl">
              <div className="w-24 h-24 bg-purple-100 text-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <TrendingUp size={48} />
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Defina sua Tese de Investimento</h1>
              <p className="text-slate-600 text-lg mb-12 max-w-2xl mx-auto">
                Configure seus critérios de investimento para que possamos apresentar as melhores oportunidades do ecossistema.
              </p>
              <button 
                onClick={() => setIsEditing(true)} 
                className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-700 shadow-lg transition-all transform hover:scale-105"
              >
                Configurar Critérios
              </button>
            </div>
          ) : isEditing ? (
            <div className="bg-white rounded-[3rem] p-8 sm:p-12 border border-slate-200 shadow-xl animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold text-slate-900">Editar Critérios de Investimento</h1>
                <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Ticket Mínimo (R$)</label>
                    <input
                      type="number"
                      value={formData.ticket_size_min}
                      onChange={e => setFormData({ ...formData, ticket_size_min: parseInt(e.target.value) })}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Ticket Máximo (R$)</label>
                    <input
                      type="number"
                      value={formData.ticket_size_max}
                      onChange={e => setFormData({ ...formData, ticket_size_max: parseInt(e.target.value) })}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Tese de Investimento</label>
                  <textarea
                    rows={4}
                    value={formData.thesis}
                    onChange={e => setFormData({ ...formData, thesis: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none transition-all resize-none"
                    placeholder="Descreva o que você busca em uma startup..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Setores de Interesse (separados por vírgula)</label>
                  <input
                    type="text"
                    value={formData.investment_focus.join(', ')}
                    onChange={e => setFormData({ ...formData, investment_focus: e.target.value.split(',').map(s => s.trim()) })}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none transition-all"
                    placeholder="Ex: SaaS, Fintech, AI..."
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
                    Salvar Tese
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Profile View */
            <div className="animate-in fade-in duration-500">
              <div className="bg-white rounded-[3rem] p-8 sm:p-12 border border-slate-200 shadow-xl mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full blur-3xl -mr-32 -mt-32 opacity-60"></div>
                
                <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                  <div className="relative shrink-0">
                    <div className="w-40 h-40 rounded-4xl bg-slate-900 flex items-center justify-center text-5xl font-bold text-white shadow-2xl">
                      {user?.name?.[0]}
                    </div>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-3 rounded-2xl shadow-xl hover:scale-110 transition-transform"
                    >
                      <Edit3 size={20} />
                    </button>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                      <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                        Investidor
                      </span>
                      <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                        <TrendingUp size={14} />
                        <span>{focusData.investment_focus?.[0]} focus</span>
                      </div>
                    </div>
                    <h1 className="text-5xl font-extrabold text-slate-900 mb-4">{user?.name}</h1>
                    <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                      Gerencie sua tese de investimento e receba deals qualificados.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-lg">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <Target className="text-purple-600" size={24} />
                      Tese de Investimento
                    </h2>
                    <p className="text-slate-700 text-lg leading-relaxed">
                      {focusData.thesis || 'Nenhuma tese definida ainda.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-lg">
                      <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <PieChart className="text-blue-600" size={20} />
                        Setores de Interesse
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {focusData.investment_focus?.map((s: string) => (
                          <span key={s} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-bold border border-blue-100">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-lg">
                      <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <BarChart3 className="text-emerald-600" size={20} />
                        Critérios Financeiros
                      </h3>
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase mb-1">Ticket Médio</div>
                        <div className="text-xl font-bold text-slate-900">
                          R$ {(focusData.ticket_size_min / 1000).toFixed(0)}k - R$ {(focusData.ticket_size_max / 1000).toFixed(0)}k
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl border border-slate-800">
                     <h3 className="text-xl font-bold mb-6">Atividade de Dealflow</h3>
                     <div className="space-y-6">
                        <div className="text-center p-4 bg-white/5 rounded-3xl">
                           <div className="text-3xl font-extrabold text-white">{focusData.portfolio?.length || 0}</div>
                           <div className="text-[10px] font-bold text-slate-500 uppercase">Investimentos Efetuados</div>
                        </div>
                        <button 
                          onClick={() => setIsEditing(true)}
                          className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold hover:bg-purple-700 transition-all"
                        >
                          Editar Critérios
                        </button>
                     </div>
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

export default InvestorFocusPage
