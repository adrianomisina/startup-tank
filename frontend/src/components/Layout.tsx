import React from 'react'
import Navbar from './Navbar'

interface LayoutProps {
  children: React.ReactNode

}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 transition-colors duration-300">
      <Navbar />
      <div className="flex flex-1 pt-16">
        <main className="flex-1">{children}</main>
      </div>
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">StartupTank</h3>
            <p className="text-sm">Conectando o ecossistema de inovação brasileiro.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Plataforma</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/startups" className="hover:text-white transition-colors">
                  Startups
                </a>
              </li>
              <li>
                <a href="/mentores" className="hover:text-white transition-colors">
                  Mentores
                </a>
              </li>
              <li>
                <a href="/investidores" className="hover:text-white transition-colors">
                  Investidores
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Comunidade</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Suporte
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacidade
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Redes Sociais</h4>
            <div className="flex space-x-4">{/* Social icons could go here */}</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
