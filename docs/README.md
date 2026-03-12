# StartupTank Documentation

Bem-vindo à documentação oficial da plataforma **StartupTank**.

## Estrutura do Projeto

```text
startup-tank/
├── frontend/     # React + TypeScript + TailwindCSS (Vite)
├── backend/      # Node.js + Express + Mongoose
├── database/     # Scripts de exportação e schemas
└── docs/         # Guia de instalação e documentação da API
```

## Guia de Instalação

### Pré-requisitos
- Node.js (v18+)
- MongoDB (Local ou Atlas)
- Conta Google Cloud (para OAuth)

### Passo a Passo

1. **Clonar o Repositório**
   ```bash
   git clone <url-do-repo>
   cd startup-tank
   ```

2. **Configuração do Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env # Configure suas chaves aqui
   npm run dev
   ```

3. **Configuração do Frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## Documentação da API

### Autenticação
- `POST /api/auth/register`: Cadastro de novo usuário.
- `POST /api/auth/login`: Login e geração de JWT.

### Startups
- `GET /api/startups`: Lista startups aprovadas.
- `POST /api/startups`: Criação de perfil de startup (requer auth).
- `GET /api/startups/:id`: Detalhes da startup.

### Mentorias
- `GET /api/mentors`: Lista mentores disponíveis.
- `POST /api/interactions/mentorship`: Solicita sessão de mentoria.

### Investimentos
- `GET /api/investors`: Lista perfis de investidores.
- `POST /api/interactions/investment`: Demonstra interesse em investir.

## Tecnologias Utilizadas
- **Frontend**: React, TailwindCSS, Lucide Icons, Axios, React Router.
- **Backend**: Node.js, Express, MongoDB/Mongoose, Socket.io, JWT.
- **Design**: Minimalista, moderno e inspirado em plataformas de elite como AngelList e YC.
