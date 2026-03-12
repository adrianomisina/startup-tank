import { Award, Briefcase, DollarSign, MessageCircle, Quote, Star } from 'lucide-react'
import React from 'react'
import Layout from '../components/Layout'

const MentorProfilePage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-slate-950slate-50 min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sidebar Profile Card */}
            <div className="space-y-6">
              <div className="bg-slate-950white rounded-[3rem] p-10 border border-slate-100 shadow-sm text-center">
                <div className="w-40 h-40 mx-auto rounded-[2.5rem] bg-slate-950slate-100 mb-8 overflow-hidden border-4 border-slate-50">
                  <img
                    src="https://i.pravatar.cc/300?u=mentor"
                    alt="Mentor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-3xl font-bold text-bg-slate-950slate-950 mb-2">Carlos Silva</h1>
                <p className="text-secondary font-bold text-sm uppercase tracking-widest mb-6">
                  Growth Hacking Expert
                </p>
                <div className="flex justify-center gap-2 mb-8">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} size={20} fill="#fbbf24" className="text-amber-400" />
                  ))}
                  <span className="ml-2 font-bold text-bg-slate-950slate-950">5.0</span>
                </div>
                <div className="flex gap-4">
                  <button className="flex-1 bg-slate-950bg-slate-950slate-950 text-white py-4 rounded-2xl font-bold hover:bg-slate-950black transition-all">
                    Contratar
                  </button>
                  <button className="p-4 bg-slate-950slate-50 text-slate-400 rounded-2xl hover:bg-slate-950slate-100 transition-all">
                    <MessageCircle size={24} />
                  </button>
                </div>
              </div>

              <div className="bg-primary rounded-[3rem] p-8 text-white shadow-xl shadow-blue-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-slate-950white/20 p-3 rounded-2xl">
                    <DollarSign size={24} />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-bold opacity-60">Taxa Horária</div>
                    <div className="text-2xl font-extrabold">R$ 250,00</div>
                  </div>
                </div>
                <button className="w-full bg-slate-950white text-secondary py-4 rounded-xl font-bold hover:bg-slate-950blue-50 transition-all">
                  Ver Disponibilidade
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="text-4xl font-bold text-bg-slate-950slate-950 mb-8 tracking-tight">
                  Experiência e Visão
                </h2>
                <div className="relative">
                  <Quote size={64} className="absolute -top-10 -left-10 text-slate-100 -z-10" />
                  <p className="text-xl text-slate-600 leading-relaxed mb-8 italic">
                    "Minha missão é ajudar founders a evitar os erros comuns do early stage e focar
                    no que realmente importa: crescimento sustentável e retenção de usuários."
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 bg-slate-950white rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-bg-slate-950slate-950 mb-4 flex items-center gap-2">
                      <Award className="text-secondary" /> Especialidades
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {['Growth', 'User Acquisition', 'Retention', 'Unit Economics'].map(s => (
                        <span
                          key={s}
                          className="bg-slate-950slate-50 text-slate-500 px-4 py-2 rounded-xl text-sm font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-8 bg-slate-950white rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-bg-slate-950slate-950 mb-4 flex items-center gap-2">
                      <Briefcase className="text-secondary" /> Histórico
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-500">
                      <li>• Ex-VP Growth no Nubank</li>
                      <li>• Mentor na 500 Startups</li>
                      <li>• Advisor em 12+ Startups</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-bg-slate-950slate-950 mb-8 underline decoration-secondary decoration-4 underline-offset-8">
                  O que dizem os Founders
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {[1, 2].map(i => (
                    <div
                      key={i}
                      className="p-8 bg-slate-950white rounded-[2.5rem] border border-slate-100 shadow-sm"
                    >
                      <p className="text-slate-600 mb-6 font-medium">
                        "O Carlos mudou completamente a forma como olhamos para nossos dados. Em 3
                        meses, reduzimos nosso CAC em 40%."
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-950slate-100"></div>
                        <div>
                          <div className="font-bold text-bg-slate-950slate-950 text-sm">
                            João Rezende
                          </div>
                          <div className="text-xs text-slate-400">CEO na TechFlow</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MentorProfilePage
