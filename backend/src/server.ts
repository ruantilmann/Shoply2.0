import Fastify from 'fastify';
import cors from '@fastify/cors';
import { userRoutes } from './routes/user.routes';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

const server = Fastify({
    logger: {
        level: 'info'
    }
})

async function start() {
    try {
        // Registrar CORS
        await server.register(cors, {
            origin: true // Configurar conforme necessário
        });

        // Registrar rotas
        await server.register(userRoutes, { prefix: '/api/users' });

        // Registrar Swagger
        await server.register(swagger, {
            swagger: {
                info: {
                    title: 'Shoply 2.0 API',
                    description: 'Documentação da API Shoply 2.0',
                    version: '1.0.0'
                },
                host: 'localhost:3000',
                schemes: ['http'],
                consumes: ['application/json'],
                produces: ['application/json']
            }
        });

        await server.register(swaggerUi, {
            routePrefix: '/documentation',
            uiConfig: {
                docExpansion: 'full',
                deepLinking: false
            },
            staticCSP: true,
            transformStaticCSP: (header) => header,
        });


        // Inicializa o Servidor
        await server.listen({ port: Number(process.env.PORT) })
        console.log(`Server ON in PORT=${process.env.PORT}`)
    } catch (err) {
        server.log.error(err)
    }
}

start()