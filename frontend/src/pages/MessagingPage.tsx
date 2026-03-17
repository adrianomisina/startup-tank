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
    <Layout showSidebar={true}>
      <div className="bg-slate-50 dark:bg-slate-950 h-[calc(100vh-64px)] flex p-4 sm:p-6 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full flex bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200 dark:shadow-black/40 overflow-hidden border border-slate-100 dark:border-slate-800">
          {/* Contacts List */}
          <div className="hidden sm:flex w-80 border-r border-slate-100 dark:border-slate-800 flex-col">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Mensagens</h2>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar conversas..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-700 focus:border-slate-200 dark:focus:border-slate-600 outline-none transition-all text-sm text-slate-900 dark:text-white"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {contacts.map(contact => (
                <div
                  key={contact.id}
                  className={`p-6 flex items-center gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all ${contact.active ? 'bg-blue-50/50 dark:bg-blue-900/20 border-r-4 border-blue-600' : ''}`}
                >
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 font-bold shrink-0">
                    {contact.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-slate-900 dark:text-white truncate text-sm">
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
          <div className="flex-1 flex flex-col bg-slate-50/30 dark:bg-slate-950/20">
            {/* Header */}
            <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 font-bold shrink-0">
                  C
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Carlos Silva</div>
                  <div className="text-xs text-emerald-500 font-bold">Online Now</div>
                </div>
              </div>
              <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all">
                <MoreVertical size={20} className="text-slate-400" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 sm:p-8 overflow-y-auto space-y-6">
              <div className="flex justify-center">
                <span className="bg-white dark:bg-slate-800 px-4 py-1 rounded-full text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border border-slate-100 dark:border-slate-750 shadow-sm">
                  Hoje
                </span>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0"></div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-750 max-w-xs sm:max-w-md">
                  <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">
                    Olá Adriano, analisei seu pitch deck e achei excelente. Podemos marcar uma
                    conversa amanhã às 14h?
                  </p>
                </div>
              </div>

              <div className="flex gap-4 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-blue-600 shrink-0"></div>
                <div className="bg-blue-600 p-4 rounded-2xl rounded-tr-none shadow-lg shadow-blue-100 dark:shadow-blue-900/20 max-w-xs sm:max-w-md">
                  <p className="text-white text-sm sm:text-base">
                    Claro Carlos! Amanhã às 14h funciona perfeitamente para mim. Por onde prefere
                    falar?
                  </p>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
              <form className="flex gap-4 items-center" onSubmit={e => e.preventDefault()}>
                <button
                  type="button"
                  className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                >
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Escreva sua mensagem..."
                  className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none focus:bg-white dark:focus:bg-slate-700 focus:border-slate-200 dark:focus:border-slate-600 border border-transparent transition-all text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400"
                />
                <button className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 dark:shadow-blue-900/30 shrink-0">
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
