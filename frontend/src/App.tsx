import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AdminDashboardPage from './pages/AdminDashboardPage'
import DashboardPage from './pages/DashboardPage'
import InvestorMarketplacePage from './pages/InvestorMarketplacePage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import MentorMarketplacePage from './pages/MentorMarketplacePage'
import MentorProfilePage from './pages/MentorProfilePage'
import MessagingPage from './pages/MessagingPage'
import RegisterPage from './pages/RegisterPage'
import StartupMarketplacePage from './pages/StartupMarketplacePage'
import StartupProfilePage from './pages/StartupProfilePage'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/messages" element={<MessagingPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
          {/* Profile Views */}
        <Route path="/startups/:id" element={<StartupProfilePage />} />
        <Route path="/mentores/:id" element={<MentorProfilePage />} />
        {/* Marketplaces */}
        <Route path="/startups" element={<StartupMarketplacePage />} />
        <Route path="/mentores" element={<MentorMarketplacePage />} />
        <Route path="/investidores" element={<InvestorMarketplacePage />} />
        </Routes>
      </Router>

  )
}

export default App
