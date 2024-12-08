import { FastifyReply, FastifyRequest } from "fastify"
import { TaskPrismaRepository } from "../../repositories/prisma/task-repository";
import { GetTaskUseCase } from "../../use-cases/get-task-use-case";
import { z } from "zod";

// Controlador para Obter Tarefa por ID
export class GetTaskController {
    constructor(private useCase: GetTaskUseCase) {}
  
    async handle(request: FastifyRequest,
        reply: FastifyReply): Promise<Response> {
          const input = getTaskValidated.parse(request.params)

      const task = await this.useCase.execute(input.id);
      if (!task) {
        return reply.status(404).send({ message: 'Task not found' });
      }
      return reply.send(task);
    }
  }

  const getTaskValidated = z.object({
    id: z.string(),
  })
  
  // Fábrica do Controlador para Obter Tarefa por ID
  export const getTaskFactory = new GetTaskController(
    new GetTaskUseCase(new TaskPrismaRepository())
  );