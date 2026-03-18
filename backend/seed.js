import 'dotenv/config';
import mongoose from 'mongoose';
import User from './models/User.js';
import Startup from './models/Startup.js';
import Mentor from './models/Mentor.js';

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/startup-tank';

const seedDatabase = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('MongoDB Connectado para Seeding...');

    // Limpar apenas dados criados por este script anteriormente
    await User.deleteMany({ email: { $regex: /@seed\.com/ } });
    
    // Deleta os que ficaram orfãos
    // Não farei deleteMany aberto para não apagar dados reais do user

    // 1. Criar Usuários Dummy
    const fundador1 = await User.create({
      name: 'Tech Founder',
      email: 'founder1@seed.com',
      password: 'password123',
      role: 'startup_founder'
    });

    const fundador2 = await User.create({
      name: 'Health Founder',
      email: 'founder2@seed.com',
      password: 'password123',
      role: 'startup_founder'
    });

    const mentor1 = await User.create({
      name: 'Consultor Sênior',
      email: 'mentor1@seed.com',
      password: 'password123',
      role: 'mentor'
    });

    const mentor2 = await User.create({
      name: 'Mestre Growth',
      email: 'mentor2@seed.com',
      password: 'password123',
      role: 'mentor'
    });

    // 2. Criar Startups Dummy
    await Startup.create({
      founderId: fundador1._id,
      name: 'FinTech Revolution',
      description: 'Uma plataforma que democratiza o acesso a crédito para pequenas empresas usando IA.',
      industry: 'Finanças',
      stage: 'MVP',
      team_size: 4,
      team: [{ name: 'Arthur', role: 'CEO' }],
      isApproved: true
    });

    await Startup.create({
      founderId: fundador2._id,
      name: 'HealiTech AI',
      description: 'Telemedicina turbinada com inteligência artificial para diagnósticos prévios.',
      industry: 'Saúde',
      stage: 'Series A',
      team_size: 15,
      team: [{ name: 'Beatriz', role: 'COO' }],
      isApproved: true
    });

    // 3. Criar Mentores Dummy
    await Mentor.create({
      userId: mentor1._id,
      bio: 'Mais de 15 anos no mercado financeiro. Ajudo startups na estruturação financeira e captação de Série A.',
      expertise: ['Finanças', 'Captação', 'Pitch'],
      years_experience: 15,
      hourly_rate: 200,
      rating: 5,
      isApproved: true
    });

    await Mentor.create({
      userId: mentor2._id,
      bio: 'Especialista em Growth Hacking, ex-CMO de duas startups que viraram unicórnio.',
      expertise: ['Marketing', 'Growth', 'Produto'],
      years_experience: 8,
      hourly_rate: 300,
      rating: 4.8,
      isApproved: true
    });

    console.log('✔ Banco de Dados Semeado (Seeded) com Startups e Mentores Dummy!');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao semear o banco:', error);
    process.exit(1);
  }
};

seedDatabase();
