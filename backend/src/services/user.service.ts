import { auth } from '../lib/auth';
import { prisma } from '../lib/prisma';

interface CreateUserData {
  email: string;
  password: string;
  name: string;
  image?: string;
}

// Criar novo usuário
export async function createUser(data: CreateUserData) {
  const { email, password, name, image } = data;

  // Verificar se o email já existe
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new Error('Email já existe');
  }

  // Criar usuário com Better-Auth
  const user = await auth.api.signUpEmail({
    body: {
        name,
        password,
        email
    }
  });

  if (!user) {
    throw new Error('Erro ao criar usuário');
  }

  return user;
}