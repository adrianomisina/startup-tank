import { LogIn, Rocket } from 'lucide-react'
import React from 'react'

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-slate-200 fixed w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Rocket className="text-secondary w-8 h-8" />
              <span className="text-2xl font-bold text-primary tracking-tight">StartupTank</span>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/startups"
              className="text-slate-600 hover:text-secondary font-medium transition-colors"
            >
              Startups
            </a>
            <a
              href="/mentores"
              className="text-slate-600 hover:text-secondary font-medium transition-colors"
            >
              Mentores
            </a>
            <a
              href="/investidores"
              className="text-slate-600 hover:text-secondary font-medium transition-colors"
            >
              Investidores
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/login"
              className="flex items-center gap-2 text-slate-600 hover:text-primary font-medium px-4 py-2 rounded-lg transition-all"
            >
              <LogIn size={20} />
              <span>Entrar</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
