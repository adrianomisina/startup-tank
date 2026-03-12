import { ArrowUpRight, CheckCircle, FileText, Globe, MessageSquare, Rocket } from 'lucide-react'
import React from 'react'
import Layout from '../components/Layout'

const StartupProfilePage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-slate-950slate-50 min-h-screen py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Cover / Header */}
          <div className="bg-slate-950white rounded-[3rem] p-12 border border-slate-100 shadow-sm mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-950blue-50 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
              <div className="w-40 h-40 bg-slate-950bg-slate-950slate-950 text-white rounded-4xl flex items-center justify-center text-5xl font-bold shadow-2xl">
                E
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                  <span className="bg-primary/10 text-secondary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    Série A
                  </span>
                  <span className="bg-slate-950emerald-100 text-emerald-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    CleanTech
                  </span>
                </div>
                <h1 className="text-5xl font-extrabold text-bg-slate-950slate-950 mb-4">EcoFlow</h1>
                <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
                  Revolucionando a gestão hídrica urbana através de inteligência artificial e
                  sensores IoT de baixo custo.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-slate-950white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
                <h2 className="text-2xl font-bold text-bg-slate-950slate-950 mb-6 flex items-center gap-2">
                  <FileText className="text-secondary" />
                  Sobre o Negócio
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  A EcoFlow nasceu com a missão de reduzir o desperdício de água em grandes centros
                  urbanos. Nossa tecnologia permite identificar vazamentos e padrões de consumo
                  anômalos em tempo real, gerando uma economia média de 40% nas contas de água de
                  nossos clientes.
                </p>
                <div className="grid grid-cols-2 gap-6 bg-slate-950slate-50 p-6 rounded-3xl">
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase mb-1">Time</div>
                    <div className="text-lg font-bold text-bg-slate-950slate-950">
                      12 Colaboradores
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase mb-1">
                      Fundada em
                    </div>
                    <div className="text-lg font-bold text-bg-slate-950slate-950">2024</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
                <h2 className="text-2xl font-bold text-bg-slate-950slate-950 mb-6">Pitch Deck</h2>
                <div className="aspect-video bg-slate-950slate-900 rounded-4xl flex items-center justify-center group cursor-pointer overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
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
              <div className="bg-slate-950bg-slate-950slate-950 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-200">
                <h3 className="text-xl font-bold mb-6">Interesse em investir?</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-sm opacity-80">
                    <CheckCircle className="text-accent" />
                    <span>Acesso a dados financeiros</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm opacity-80">
                    <CheckCircle className="text-accent" />
                    <span>Reunião direta com fundadores</span>
                  </div>
                </div>
                <button className="w-full bg-primary py-4 rounded-xl font-bold hover:bg-primary transition-all flex items-center justify-center gap-2">
                  Expressar Interesse
                </button>
              </div>

              <div className="bg-slate-950white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-bg-slate-950slate-950 mb-6">Links Rápidos</h3>
                <div className="space-y-4">
                  <a
                    href="#"
                    className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:bg-slate-950slate-50 transition-all"
                  >
                    <div className="flex items-center gap-3 text-slate-600 font-medium">
                      <Globe size={18} />
                      Website
                    </div>
                    <ArrowUpRight size={18} className="text-slate-300" />
                  </a>
                  <a
                    href="/messages"
                    className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:bg-slate-950slate-50 transition-all"
                  >
                    <div className="flex items-center gap-3 text-slate-600 font-medium">
                      <MessageSquare size={18} />
                      Chat Direto
                    </div>
                    <ArrowUpRight size={18} className="text-slate-300" />
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
