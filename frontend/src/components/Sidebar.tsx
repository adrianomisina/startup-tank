import {
  LayoutDashboard,
  MessageCircle,
  Rocket,
  Settings,
  ShieldCheck,
  TrendingUp,
  UserCircle
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

interface SidebarProps {
  role: 'founder' | 'mentor' | 'investor' | 'admin' | 'startup_founder'
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Rocket, label: 'Minha Startup', path: '/my-startup', roles: ['founder', 'startup_founder'] },
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

  const location = useLocation()
  const filteredItems = menuItems.filter(item => !item.roles || item.roles.includes(role))

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen sticky top-0 pt-20">
      <div className="px-4 py-6">
        <ul className="space-y-2">
          {filteredItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                  location.pathname === item.path
                    ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-300'
                }`}
              >
                <item.icon size={22} className={`transition-transform ${location.pathname === item.path ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
