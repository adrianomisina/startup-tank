/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { X } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
  role?: 'founder' | 'mentor' | 'investor' | 'admin' | 'startup_founder'
}

const Layout: React.FC<LayoutProps> = ({ children, showSidebar = false, role: initialRole }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  
  const [role, setRole] = useState<'founder' | 'mentor' | 'investor' | 'admin' | 'startup_founder'>(() => {
    if (initialRole) return initialRole
    const userJson = localStorage.getItem('user')
    if (userJson) {
      try {
        const user = JSON.parse(userJson)
        return user.role || 'startup_founder'
      } catch (e) {
        return 'startup_founder'
      }
    }
    return 'startup_founder'
  })

  React.useEffect(() => {
    if (initialRole) {
      setRole(initialRole)
    }
  }, [initialRole])

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 transition-colors duration-300">
      <Navbar onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} showSidebarButton={showSidebar} />
      
      <div className="flex flex-1 pt-16">
        {/* Mobile Sidebar Overlay */}
        {showSidebar && isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        {showSidebar && (
          <div
            className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 md:hidden ${
              isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="p-4 flex justify-end pt-20">
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-slate-600" />
              </button>
            </div>
            <Sidebar role={role} />
          </div>
        )}

        {/* Desktop Sidebar */}
        {showSidebar && (
          <div className="hidden md:block">
            <Sidebar role={role} />
          </div>
        )}
        
        <main className="flex-1 w-full">{children}</main>
      </div>

      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">StartupTank</h3>
            <p className="text-sm">Conectando o ecossistema de inovação brasileiro.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
