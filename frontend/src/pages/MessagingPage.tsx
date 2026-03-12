import { MoreVertical, Paperclip, Search, Send } from 'lucide-react'
import React, { useState } from 'react'
import Layout from '../components/Layout'

const MessagingPage: React.FC = () => {
  const [message, setMessage] = useState('')

  const contacts = [
    {
      id: 1,
      name: 'Carlos Silva',
      role: 'Mentor',
      lastMsg: 'Podemos marcar para amanhã?',
      time: '14:20',
      active: true
    },
    {
      id: 2,
      name: 'EcoFlow',
      role: 'Startup',
      lastMsg: 'Enviamos o pitch deck atualizado.',
      time: 'Ontem',
      active: false
    },
    {
      id: 3,
      name: 'Alex Oliveira',
      role: 'Investidor',
      lastMsg: 'Gostaria de saber mais sobre o time.',
      time: 'Segunda',
      active: false
    }
  ]

  return (
    <Layout>
      <div className="bg-slate-950slate-50 h-[calc(100vh-64px)] flex p-6">
        <div className="max-w-7xl mx-auto w-full flex bg-slate-950white rounded-[2.5rem] shadow-xl shadow-slate-200 overflow-hidden border border-slate-100">
          {/* Contacts List */}
          <div className="w-80 border-r border-slate-100 flex flex-col">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-2xl font-bold text-bg-slate-950slate-950 mb-4">Mensagens</h2>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar conversas..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950slate-50 border-transparent focus:bg-slate-950white focus:border-slate-200 outline-none transition-all text-sm"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {contacts.map(contact => (
                <div
                  key={contact.id}
                  className={`p-6 flex items-center gap-4 cursor-pointer hover:bg-slate-950slate-50 transition-all ${contact.active ? 'bg-slate-950blue-50/50 border-r-4 border-secondary' : ''}`}
                >
                  <div className="w-12 h-12 rounded-full bg-slate-950slate-200 flex items-center justify-center text-slate-400 font-bold">
                    {contact.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-bg-slate-950slate-950 truncate">
                        {contact.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">{contact.time}</span>
                    </div>
                    <div className="text-xs text-slate-400 truncate">{contact.lastMsg}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col bg-slate-950slate-50/30">
            {/* Header */}
            <div className="p-6 bg-slate-950white border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-950slate-200 flex items-center justify-center text-slate-400 font-bold">
                  C
                </div>
                <div>
                  <div className="font-bold text-bg-slate-950slate-950">Carlos Silva</div>
                  <div className="text-xs text-emerald-500 font-bold">Online</div>
                </div>
              </div>
              <button className="p-2 hover:bg-slate-950slate-50 rounded-lg transition-all">
                <MoreVertical size={20} className="text-slate-400" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-8 overflow-y-auto space-y-6">
              <div className="flex justify-center">
                <span className="bg-slate-950white px-4 py-1 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-100 shadow-sm">
                  Hoje
                </span>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-950slate-200 shrink-0"></div>
                <div className="bg-slate-950white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 max-w-md">
                  <p className="text-slate-700">
                    Olá Adriano, analisei seu pitch deck e achei excelente. Podemos marcar uma
                    conversa amanhã às 14h?
                  </p>
                </div>
              </div>

              <div className="flex gap-4 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-primary shrink-0"></div>
                <div className="bg-primary p-4 rounded-2xl rounded-tr-none shadow-lg shadow-blue-100 max-w-md">
                  <p className="text-white">
                    Claro Carlos! Amanhã às 14h funciona perfeitamente para mim. Por onde prefere
                    falar?
                  </p>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="p-6 bg-slate-950white border-t border-slate-100">
              <form className="flex gap-4 items-center" onSubmit={e => e.preventDefault()}>
                <button
                  type="button"
                  className="p-2 text-slate-400 hover:text-secondary transition-colors"
                >
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Escreva sua mensagem..."
                  className="flex-1 px-4 py-3 bg-slate-950slate-50 rounded-xl outline-none focus:bg-slate-950white focus:border-slate-200 border border-transparent transition-all"
                />
                <button className="bg-primary text-white p-3 rounded-xl hover:bg-primary transition-all shadow-lg shadow-blue-100">
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MessagingPage
