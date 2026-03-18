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
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import MyStartupPage from './pages/MyStartupPage'
import RegisterStartupPage from './pages/RegisterStartupPage'
import SettingsPage from './pages/SettingsPage'
import MyMentorProfilePage from './pages/MyMentorProfilePage'
import InvestorFocusPage from './pages/InvestorFocusPage'
import ProtectedRoute from './components/ProtectedRoute'
import SubscriptionPage from './pages/SubscriptionPage'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/startups/:id" element={<StartupProfilePage />} />
        <Route path="/mentores/:id" element={<MentorProfilePage />} />
        <Route path="/startups" element={<StartupMarketplacePage />} />
        <Route path="/mentores" element={<MentorMarketplacePage />} />
        <Route path="/investidores" element={<InvestorMarketplacePage />} />

        {/* Rotas Privadas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/my-startup" element={<MyStartupPage />} />
          <Route path="/register-startup" element={<RegisterStartupPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/messages" element={<MessagingPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/mentor-profile" element={<MyMentorProfilePage />} />
          <Route path="/investor-focus" element={<InvestorFocusPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
