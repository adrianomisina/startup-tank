import { Rocket, FileText, Globe, Users, ChevronRight, ArrowLeft, Target } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import api from '../services/api'

const RegisterStartupPage: React.FC = () => {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [industry, setIndustry] = useState('')
  const [stage, setStage] = useState('Idea')
  const [website, setWebsite] = useState('')
  const [teamSize, setTeamSize] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)
  React.useEffect(() => {
    const checkExistingStartup = async () => {
      try {
        const res = await api.get('/startups/me')
        if (res.data) {
          navigate('/my-startup', { replace: true })
        }
      } catch (err) {
        // No startup found, stay on page
      } finally {
        setChecking(false)
      }
    }
    checkExistingStartup()
  }, [navigate])

  if (checking) {
    return (
      <Layout showSidebar={true}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 4) {
      setStep(step + 1)
      return
    }
    
    setLoading(true)
    setError(null)

    try {
      await api.post('/startups', {
        name,
        description,
        industry,
        stage,
        website,
        team_size: teamSize
      })
      navigate('/my-startup')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao cadastrar startup.')
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
               <h2 className="text-2xl font-bold text-slate-900">Vamos começar pelo básico</h2>
               <p className="text-slate-500">Como você chama sua ideia e em qual setor ela atua?</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Rocket size={16} className="text-blue-600" /> Nome da Startup
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                placeholder="Ex: EcoFlow, TechWave..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Target size={16} className="text-blue-600" /> Setor / Indústria
              </label>
              <input
                type="text"
                required
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                placeholder="Ex: EdTech, Fintech..."
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="space-y-2">
               <h2 className="text-2xl font-bold text-slate-900">Estágio e Maturidade</h2>
               <p className="text-slate-500">Em que ponto você está e quem está com você?</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Rocket size={16} className="text-blue-600" /> Estágio Atual
              </label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all appearance-none"
              >
                <option value="Idea">Idea (Apenas a ideia)</option>
                <option value="MVP">MVP (Protótipo funcional)</option>
                <option value="Pre-seed">Pre-seed</option>
                <option value="Seed">Seed</option>
                <option value="Series A">Series A</option>
                <option value="Scale-up">Scale-up</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Users size={16} className="text-blue-600" /> Tamanho do Time
              </label>
              <input
                type="number"
                min={1}
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value))}
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              />
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
               <h2 className="text-2xl font-bold text-slate-900">Visão Técnica</h2>
               <p className="text-slate-500">Como as pessoas podem te encontrar e o que você faz?</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <FileText size={16} className="text-blue-600" /> Pitch Curto (Descrição)
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none"
                placeholder="Resuma seu negócio em poucas frases..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Globe size={16} className="text-blue-600" /> Website (Opcional)
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                placeholder="https://suastartup.com"
              />
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
               <h2 className="text-2xl font-bold text-slate-900">Quase lá!</h2>
               <p className="text-slate-500">Revise suas informações antes de publicar.</p>
            </div>
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-4">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Nome:</span>
                <span className="font-bold text-slate-900">{name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Setor:</span>
                <span className="font-bold text-slate-900">{industry}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Estágio:</span>
                <span className="font-bold text-slate-900">{stage}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Time:</span>
                <span className="font-bold text-slate-900">{teamSize} pessoas</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-slate-500 font-medium">Descrição:</span>
                <p className="text-slate-900 text-sm line-clamp-3">{description}</p>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Layout showSidebar={true}>
      <div className="bg-slate-50 min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <button 
            onClick={() => {
              if (step > 1) setStep(step - 1)
              else navigate(-1)
            }}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium mb-8 transition-colors"
          >
            <ArrowLeft size={20} /> {step > 1 ? 'Voltar Passo' : 'Cancelar'}
          </button>

          <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden">
            {/* Progress Bar */}
            <div className="h-2 bg-slate-100 w-full flex">
              {[1, 2, 3, 4].map((s) => (
                <div 
                  key={s} 
                  className={`flex-1 transition-all duration-500 ${s <= step ? 'bg-blue-600' : 'bg-transparent'}`}
                />
              ))}
            </div>

            <div className="bg-slate-900 p-8 text-white relative">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Rocket size={80} />
              </div>
              <div className="flex items-center gap-4 mb-2">
                <span className="bg-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Passo {step} de 4
                </span>
              </div>
              <h1 className="text-2xl font-extrabold relative z-10">
                {step === 4 ? 'Confirmação Final' : 'Cadastre sua Startup'}
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl text-red-700 text-sm font-medium">
                  {error}
                </div>
              )}

              {renderStep()}

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:shadow-none"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      {step === 4 ? 'Publicar Startup' : 'Próximo Passo'} 
                      <ChevronRight size={24} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default RegisterStartupPage
