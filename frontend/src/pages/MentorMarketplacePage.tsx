import { Award, Briefcase, Calendar, ChevronRight, DollarSign, Search, Star } from 'lucide-react'
import React, { useState } from 'react'
import Layout from '../components/Layout'

const MentorMarketplacePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const mentors = [
    {
      id: 1,
      name: 'Carlos Silva',
      expertise: 'Growth Hacking',
      experience: 15,
      rating: 4.9,
      rate: 250,
      bio: 'Ex-VP de Growth no Nubank. Especialista em escalar startups de série A.'
    },
    {
      id: 2,
      name: 'Ana Oliveira',
      expertise: 'UX/UI & Product',
      experience: 10,
      rating: 5.0,
      rate: 200,
      bio: 'Designer premiada com foco em experiência do usuário e retenção.'
    },
    {
      id: 3,
      name: 'Roberto Santos',
      expertise: 'Fundraising',
      experience: 20,
      rating: 4.8,
      rate: 450,
      bio: 'Já ajudou a captar mais de R$ 200M em rodadas de investimento.'
    },
    {
      id: 4,
      name: 'Juliana Lima',
      expertise: 'Marketing Digital',
      experience: 8,
      rating: 4.7,
      rate: 180,
      bio: 'Estrategista de marketing focada em CAC baixo e LTV alto.'
    }
  ]

  return (
    <Layout>
      <div className="bg-slate-950slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl font-extrabold text-bg-slate-950slate-950 mb-2">
                Encontre seu Mentor
              </h1>
              <p className="text-slate-500">
                Conecte-se com quem já chegou lá e acelere sua curva de aprendizado.
              </p>
            </div>
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-3 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Ex: Growth, Fundraising..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950white border border-slate-200 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mentors.map(mentor => (
              <div
                key={mentor.id}
                className="bg-slate-950white rounded-3xl p-8 border border-slate-100 flex flex-col md:flex-row gap-8 hover:shadow-xl transition-all group"
              >
                <div className="relative">
                  <div className="w-32 h-32 rounded-3xl bg-slate-950slate-100 overflow-hidden">
                    <img
                      src={`https://i.pravatar.cc/150?u=${mentor.id}`}
                      alt={mentor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl shadow-lg">
                    <Award size={20} />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-2xl font-bold text-bg-slate-950slate-950">
                        {mentor.name}
                      </h3>
                      <p className="text-secondary font-bold text-sm uppercase tracking-wide">
                        {mentor.expertise}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-950amber-50 text-amber-600 px-3 py-1 rounded-full text-sm font-bold">
                      <Star size={16} fill="currentColor" />
                      <span>{mentor.rating}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 mb-6 text-sm leading-relaxed">{mentor.bio}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <Briefcase size={16} />
                      <span>{mentor.experience} anos exp.</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <DollarSign size={16} />
                      <span>R$ {mentor.rate}/hora</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 bg-slate-950bg-slate-950slate-950 text-white py-3 rounded-xl font-bold hover:bg-slate-950black transition-all text-sm flex items-center justify-center gap-2">
                      <Calendar size={18} />
                      Agendar
                    </button>
                    <button className="px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-950slate-50 transition-all">
                      <ChevronRight size={20} className="text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MentorMarketplacePage
