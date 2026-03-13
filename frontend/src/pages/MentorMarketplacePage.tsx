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

  // Filtrar mentores baseado no searchTerm
  const filteredMentors = mentors.filter(
    mentor =>
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.bio.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Encontre seu Mentor</h1>
              <p className="text-slate-600">
                Conecte-se com quem já chegou lá e acelere sua curva de aprendizado.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-3 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Ex: Growth, Fundraising..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredMentors.length > 0 ? (
              filteredMentors.map(mentor => (
                <div
                  key={mentor.id}
                  className="bg-white rounded-3xl p-8 border border-slate-200 flex flex-col md:flex-row gap-8 hover:shadow-lg hover:-translate-y-1 transition-all group"
                >
                  {/* Avatar Section */}
                  <div className="relative shrink-0">
                    <div className="w-32 h-32 rounded-3xl bg-slate-100 overflow-hidden">
                      <img
                        src={`https://i.pravatar.cc/150?u=${mentor.id}`}
                        alt={mentor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg">
                      <Award size={20} />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1">
                    {/* Header with Name and Rating */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">{mentor.name}</h3>
                        <p className="text-blue-600 font-bold text-sm uppercase tracking-wide">
                          {mentor.expertise}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-sm font-bold shrink-0">
                        <Star size={16} fill="currentColor" />
                        <span>{mentor.rating}</span>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-slate-600 mb-6 text-sm leading-relaxed line-clamp-2">
                      {mentor.bio}
                    </p>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-slate-200">
                      <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <Briefcase size={16} className="text-blue-600 shrink-0" />
                        <span>
                          <span className="font-bold text-slate-900">{mentor.experience}</span> anos
                          exp.
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <DollarSign size={16} className="text-emerald-600 shrink-0" />
                        <span>
                          R$ <span className="font-bold text-slate-900">{mentor.rate}</span>/hora
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 active:bg-blue-800 transition-all text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                        <Calendar size={18} />
                        Agendar
                      </button>
                      <button className="px-4 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center">
                        <ChevronRight size={20} className="text-slate-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Search size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-600 text-lg font-medium">
                  Nenhum mentor encontrado para "{searchTerm}"
                </p>
                <p className="text-slate-500 text-sm mt-2">
                  Tente buscar por nome, especialidade ou palavra-chave
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MentorMarketplacePage
