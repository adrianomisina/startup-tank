import {
  LayoutDashboard,
  MessageCircle,
  Rocket,
  Settings,
  ShieldCheck,
  TrendingUp,
  UserCircle
} from 'lucide-react'
import React from 'react'

interface SidebarProps {
  role: 'founder' | 'mentor' | 'investor' | 'admin'
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Rocket, label: 'Minha Startup', path: '/my-startup', roles: ['founder'] },
    { icon: UserCircle, label: 'Perfil de Mentor', path: '/mentor-profile', roles: ['mentor'] },
    {
      icon: TrendingUp,
      label: 'Foco de Investimento',
      path: '/investor-focus',
      roles: ['investor']
    },
    { icon: MessageCircle, label: 'Mensagens', path: '/messages' },
    { icon: ShieldCheck, label: 'Moderação', path: '/admin', roles: ['admin'] },
    { icon: Settings, label: 'Configurações', path: '/settings' }
  ]

  const filteredItems = menuItems.filter(item => !item.roles || item.roles.includes(role))

  return (
    <aside className="w-64 bg-slate-950white border-r border-slate-200 h-screen sticky top-0 pt-20">
      <div className="px-4 py-6">
        <ul className="space-y-2">
          {filteredItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.path}
                className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-950slate-50 hover:text-secondary rounded-xl transition-all group"
              >
                <item.icon size={22} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
