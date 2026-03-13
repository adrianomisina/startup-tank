import nodemailer from 'nodemailer'

// Configurar transporter (exemplo com Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export const sendResetEmail = async (to: string, resetUrl: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Recuperação de Senha - StartupTank',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e293b;">Recuperação de Senha</h2>
        <p>Você solicitou a recuperação de senha da sua conta no StartupTank.</p>
        <p>Clique no botão abaixo para redefinir sua senha:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 8px; margin: 20px 0;">
          Redefinir Senha
        </a>
        <p style="color: #64748b; font-size: 14px;">Este link expira em 1 hora.</p>
        <p style="color: #64748b; font-size: 14px;">Se você não solicitou esta recuperação, ignore este email.</p>
      </div>
    `
  }

  await transporter.sendMail(mailOptions)
}
