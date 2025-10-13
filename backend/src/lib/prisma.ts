import { PrismaClient } from '../../generated/prisma';

// Declaração global para evitar múltiplas instâncias do Prisma em desenvolvimento
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Criar instância do Prisma com configurações de log
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'error', 'warn'] 
    : ['error'],
});

// Em desenvolvimento, armazenar a instância globalmente para evitar criar múltiplas conexões
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Função para desconectar do banco (útil para testes ou shutdown)
export async function disconnectPrisma() {
  await prisma.$disconnect();
}

// Handler para encerrar conexão ao finalizar o processo
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});