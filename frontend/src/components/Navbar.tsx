import { LogIn, LogOut, Rocket } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar: React.FC = () => {
  // Inicializar o estado com o valor do localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('token')
    return !!token
  })

  const navigate = useNavigate()

  // Função para fazer logout
  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    navigate('/')
  }

  // Função para fazer login
  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b border-slate-200 fixed w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-none"
            >
              <Rocket className="text-secondary w-8 h-8" />
              <span className="text-2xl font-bold text-primary tracking-tight">StartupTank</span>
            </button>
          </div>

          {/* Menu Links */}
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

          {/* Auth Button */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-slate-600 hover:text-red-600 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-all"
              >
                <LogOut size={20} />
                <span>Sair</span>
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center gap-2 text-slate-600 hover:text-primary font-medium px-4 py-2 rounded-lg hover:bg-slate-100 transition-all"
              >
                <LogIn size={20} />
                <span>Entrar</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
