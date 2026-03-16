import { AlertCircle, CheckCircle, FileText, Plus, Rocket, ShieldAlert } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import api from '../services/api'

const MyStartupPage: React.FC = () => {
  const [startup, setStartup] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMyStartup = async () => {
      try {
        const response = await api.get('/startups/me')
        setStartup(response.data)
      } catch (err: any) {
        if (err.response && err.response.status === 404) {
          setStartup(null)
        } else {
          setError('Erro ao carregar dados da startup. Tente novamente mais tarde.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchMyStartup()
  }, [])

  if (loading) {
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
            <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-center gap-3">
              <AlertCircle className="text-red-500" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {!startup ? (
            /* Empty State / Create Flow */
            <div className="bg-white rounded-[3rem] p-12 text-center border border-slate-200 shadow-xl">
              <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Rocket size={48} />
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Você ainda não tem uma startup</h1>
              <p className="text-slate-600 text-lg mb-12 max-w-2xl mx-auto">
                Para atrair investidores e mentores, você precisa cadastrar sua startup e compartilhar sua visão com a nossa comunidade.
              </p>
              <button 
                onClick={() => navigate('/register-startup')} 
                className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
              >
                Cadastrar Minha Startup <Plus size={24} />
              </button>
            </div>
          ) : (
            /* Startup View */
            <div className="space-y-8">
               <div className="bg-white rounded-[3rem] p-12 border border-slate-200 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl -mr-32 -mt-32 opacity-60"></div>
                <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                  <div className="w-40 h-40 bg-blue-600 text-white rounded-4xl flex items-center justify-center text-5xl font-bold shadow-2xl shrink-0">
                    {startup.name[0]}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                      <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                        {startup.stage}
                      </span>
                      <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                        {startup.industry}
                      </span>
                      {!startup.isApproved && (
                        <span className="bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                          <ShieldAlert size={12} /> Aguardando Aprovação
                        </span>
                      )}
                    </div>
                    <h1 className="text-5xl font-extrabold text-slate-900 mb-4">{startup.name}</h1>
                    <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                      {startup.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-lg">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                       <FileText className="text-blue-600" size={24} />
                       Dados do Negócio
                    </h2>
                    <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-200 mb-6">
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase mb-2">Time</div>
                        <div className="text-2xl font-bold text-slate-900">{startup.team_size || '0'} Colaboradores</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase mb-2">Website</div>
                        <div className="text-xl font-bold text-blue-600 truncate">{startup.website || 'Não informado'}</div>
                      </div>
                    </div>
                    <button className="text-blue-600 font-bold hover:underline">Editar Informações</button>
                  </div>

                  <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-lg">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                       <Rocket className="text-blue-600" size={24} />
                       Pitch Deck
                    </h2>
                    {startup.pitch_deck_url ? (
                      <div className="aspect-video bg-slate-900 rounded-4xl flex items-center justify-center group cursor-pointer overflow-hidden relative hover:shadow-xl transition-shadow">
                        <img 
                          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80" 
                          className="absolute inset-0 w-full h-full object-cover opacity-50"
                          alt="Pitch Preview"
                        />
                         <div className="relative z-10 flex flex-col items-center">
                          <CheckCircle size={48} className="text-emerald-400 mb-4" />
                          <span className="text-white font-bold text-lg">Pitch Deck Carregado</span>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-video bg-slate-100 border-2 border-dashed border-slate-300 rounded-4xl flex flex-col items-center justify-center p-8 text-center">
                        <FileText size={48} className="text-slate-400 mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Documento não encontrado</h3>
                        <p className="text-slate-500 mb-6">Carregue seu pitch deck em PDF para atrair mais investidores.</p>
                        <button className="bg-white border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-xl font-bold hover:bg-blue-50 transition-all">
                          Subir PDF
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl border border-slate-800">
                    <h3 className="text-xl font-bold mb-6">Status da Visibilidade</h3>
                    <div className="space-y-4 mb-8">
                       <div className="flex items-center justify-between">
                         <span className="text-slate-400 text-sm">No Marketplace</span>
                         <span className={startup.isApproved ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                            {startup.isApproved ? "Ativo" : "Pendente"}
                         </span>
                       </div>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all">
                      Impulsionar Perfil
                    </button>
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

export default MyStartupPage
