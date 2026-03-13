import React from 'react'
import Navbar from './Navbar'
import { Sidebar } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
  role?: 'founder' | 'mentor' | 'investor' | 'admin'
}

const Layout: React.FC<LayoutProps> = ({ children, showSidebar = false, role = 'founder' }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 transition-colors duration-300">
      <Navbar />
      <div className="flex flex-1 pt-16">
        {/* Sidebar aparece apenas se showSidebar for true */}
        {showSidebar && <Sidebar role={role} />}
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
