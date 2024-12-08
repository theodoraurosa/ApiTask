import { z } from 'zod';
import { FastifyReply, FastifyRequest } from "fastify"
import { TaskPrismaRepository } from "../../repositories/prisma/task-repository";
import { UpdateTaskUseCase } from "../../use-cases/update-task-use-case";

// Controlador para Atualizar Tarefa
export class UpdateTaskController {
    constructor(private useCase: UpdateTaskUseCase) {}
  
    async handle(request: FastifyRequest,
        reply: FastifyReply): Promise<Response> {
      const input = updateTaskValidated.parse(request.body);
      const task = await this.useCase.execute((request.params as any).id, input);
      return reply.send(task);
    }
  }
  
  // Validação para Atualizar Tarefa
  const updateTaskValidated = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  });
  
  // Fábrica do Controlador para Atualizar Tarefa
  export const updateTaskFactory = new UpdateTaskController(
    new UpdateTaskUseCase(new TaskPrismaRepository())
  );
  