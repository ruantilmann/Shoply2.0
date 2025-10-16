import Fastify from 'fastify';
import cors from '@fastify/cors';
import { userRoutes } from './routes/user.routes';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
        colorize: true
      }
    }
  }
})

// Registrar CORS
await fastify.register(cors, {
  origin: true // Configurar conforme necessário
});

// Configurar Swagger
await fastify.register(swagger, {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Shoply BACKEND API',
      //description: 'API',
      version: '1.0.0',
      contact: {
        name: 'Ruan Carlos Tilmann',
        email: 'ruan.tilmann@gmail.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento'
      },
      {
        url: 'https://api.seudominio.com',
        description: 'Servidor de produção'
      }
    ],
    tags: [
      { name: 'users', description: 'Gerenciamento de usuários' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT de autenticação'
        },
        apiKey: {
          type: 'apiKey',
          name: 'X-API-Key',
          in: 'header'
        }
      }
    }
  }
});

// Configurar Swagger UI
await fastify.register(swaggerUI, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: true,
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    tryItOutEnabled: true
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
  transformSpecificationClone: true
});

// Health check simples
fastify.get('/health', {
  schema: {
    description: 'Health check endpoint',
    tags: ['health'],
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'ok' },
          timestamp: { type: 'string', format: 'date-time' }
        }
      }
    }
  }
}, async (request, reply) => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString()
  };
});

// Registrar rotas
await fastify.register(userRoutes, { prefix: '/api/users' });

async function start() {
  try {
    // Inicializa o Servidor
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log(`🚀 Servidor rodando em ${process.env.BETTER_AUTH_URL}`);
    console.log(`📚 Documentação disponível em ${process.env.BETTER_AUTH_URL}/docs`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start()