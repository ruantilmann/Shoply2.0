import { FastifyReply, FastifyRequest } from "fastify";
import {
    createUser
} from '../services/user.service';

// Interfaces
interface CreateUserBody {
  email: string;
  password: string;
  name: string;
  image?: string;
}

export async function createUserController(
    request: FastifyRequest<{ Body: CreateUserBody }>,
    reply: FastifyReply
) {
    try {
    const { email, password, name, image } = request.body;

    const user = await createUser({ email, password, name, image });

    return reply.status(201).send({
      success: true,
      message: 'Usuário criado com sucesso',
      data: {
          id: user.user.id,
          email: user.user.email,
          name: user.user.name,
          image: user.user.image,
         createdAt: user.user.createdAt
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('já existe') || error.message.includes('already exists')) {
        return reply.status(409).send({
          success: false,
          message: 'Email já está em uso'
        });
      }

      return reply.status(400).send({
        success: false,
        message: error.message
      });
    }

    return reply.status(500).send({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
}