import {
  ArrowUpRight,
  CheckCircle,
  FileText,
  Globe,
  MessageSquare,
  Rocket,
  ArrowLeft
} from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'

const StartupProfilePage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen py-12 px-4">
        {/* Botão Voltar */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium px-4 py-2 rounded-lg hover:bg-slate-100 transition-all"
        >
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </button>

        <div className="max-w-5xl mx-auto">
          {/* Cover / Header */}
          <div className="bg-white rounded-[3rem] p-12 border border-slate-200 shadow-lg mb-8 relative overflow-hidden">
            {/* Gradient Background - Mais visível */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl -mr-32 -mt-32 opacity-60"></div>

            <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
              {/* Avatar */}
              <div className="w-40 h-40 bg-linear-to-br from-blue-600 to-blue-700 text-white rounded-4xl flex items-center justify-center text-5xl font-bold shadow-2xl shrink-0">
                E
              </div>

              <div className="flex-1 text-center md:text-left">
                {/* Badges */}
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                  <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    Série A
                  </span>
                  <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    CleanTech
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-5xl font-extrabold text-slate-900 mb-4">EcoFlow</h1>

                {/* Description */}
                <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                  Revolucionando a gestão hídrica urbana através de inteligência artificial e
                  sensores IoT de baixo custo.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Sobre o Negócio */}
              <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <FileText className="text-blue-600" size={24} />
                  Sobre o Negócio
                </h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                  A EcoFlow nasceu com a missão de reduzir o desperdício de água em grandes centros
                  urbanos. Nossa tecnologia permite identificar vazamentos e padrões de consumo
                  anômalos em tempo real, gerando uma economia média de 40% nas contas de água de
                  nossos clientes.
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-200">
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase mb-2">Time</div>
                    <div className="text-2xl font-bold text-slate-900">12 Colaboradores</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase mb-2">
                      Fundada em
                    </div>
                    <div className="text-2xl font-bold text-slate-900">2024</div>
                  </div>
                </div>
              </div>

              {/* Pitch Deck */}
              <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Pitch Deck</h2>
                <div className="aspect-video bg-slate-900 rounded-4xl flex items-center justify-center group cursor-pointer overflow-hidden relative hover:shadow-xl transition-shadow">
                  <img
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700"
                    alt="Pitch Preview"
                  />
                  <div className="relative z-10 flex flex-col items-center">
                    <Rocket size={48} className="text-white mb-4 animate-bounce" />
                    <span className="text-white font-bold text-lg">Visualizar Pitch Deck</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Actions */}
            <div className="space-y-6">
              {/* Investment Card - Fundo escuro */}
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-6">Interesse em investir?</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-sm text-slate-200">
                    <CheckCircle className="text-emerald-400 shrink-0" size={20} />
                    <span>Acesso a dados financeiros</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-200">
                    <CheckCircle className="text-emerald-400 shrink-0" size={20} />
                    <span>Reunião direta com fundadores</span>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30">
                  Expressar Interesse
                </button>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-lg">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Links Rápidos</h3>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all group"
                  >
                    <div className="flex items-center gap-3 text-slate-700 font-medium">
                      <Globe size={18} className="text-blue-600" />
                      Website
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-slate-400 group-hover:text-slate-600 transition-colors"
                    />
                  </a>
                  <a
                    href="/messages"
                    className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all group"
                  >
                    <div className="flex items-center gap-3 text-slate-700 font-medium">
                      <MessageSquare size={18} className="text-blue-600" />
                      Chat Direto
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-slate-400 group-hover:text-slate-600 transition-colors"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default StartupProfilePage
