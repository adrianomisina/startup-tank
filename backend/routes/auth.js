import express from 'express'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { sendResetEmail } from '../utils/email.js'

const router = express.Router()

// ✅ Registro de Usuário
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'Usuário já cadastrado com este email' })
    }

    // Role mapping from frontend to backend
    // Frontend uses: founder, mentor, investor
    // Backend model uses: startup_founder, mentor, investor
    const mappedRole = role === 'founder' ? 'startup_founder' : role

    const user = new User({
      name,
      email,
      password,
      role: mappedRole
    })

    await user.save()

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário' })
  }
})

// ✅ Login de Usuário
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Email ou senha inválidos' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ou senha inválidos' })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login' })
  }
})

// ✅ Solicitar reset de senha
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    // Gerar token único
    const resetToken = crypto.randomBytes(32).toString('hex')

    // Salvar token e expiração (1 hora)
    user.resetPasswordToken = resetToken
    user.resetPasswordExpires = new Date(Date.now() + 3600000) // 1 hora
    await user.save()

    // Enviar email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
    await sendResetEmail(user.email, resetUrl)

    res.json({ message: 'Email de recuperação enviado com sucesso' })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao processar solicitação' })
  }
})

// ✅ Redefinir senha
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params
    const { password } = req.body

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    })

    if (!user) {
      return res.status(400).json({ message: 'Token inválido ou expirado' })
    }

    // Atualizar senha
    user.password = password
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    await user.save()

    res.json({ message: 'Senha redefinida com sucesso' })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao redefinir senha' })
  }
})

export default router
