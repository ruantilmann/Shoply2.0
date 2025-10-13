import { FastifyInstance, FastifyPluginOptions } from "fastify";
import {
    createUserController,
} from '../controllers/user.controller'

// Schemas de validação
const createUserSchema = {
  summary: 'Criar um novo usuário',
  description: 'Cria um novo usuário com email, senha e nome.',
  tags: ['Usuários'],
  body: {
    type: 'object',
    required: ['email', 'password', 'name'],
    properties: {
      email: { 
        type: 'string', 
        format: 'email',
        description: 'Email do usuário'
      },
      password: { 
        type: 'string', 
        minLength: 8,
        description: 'Senha com no mínimo 8 caracteres'
      },
      name: { 
        type: 'string', 
        minLength: 2,
        maxLength: 100,
        description: 'Nome completo do usuário'
      },
      image: {
        type: 'string',
        description: 'URL da imagem de perfil (opcional)'
      }
    },
    additionalProperties: false
  },
  response: {
    201: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            name: { type: 'string' },
            image: { type: 'string' },
            createdAt: { type: 'string' }
          }
        }
      }
    }
  }
};

export async function userRoutes(
    server: FastifyInstance,
    options: FastifyPluginOptions
) {
    server.post('/register', {
        schema: createUserSchema
    }, createUserController);
}
