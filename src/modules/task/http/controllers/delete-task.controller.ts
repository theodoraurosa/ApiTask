import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod';
import { TaskPrismaRepository } from "../../repositories/prisma/task-repository";
import { DeleteTaskUseCase } from "../../use-cases/delete-task-use-case";

// Controlador para Deletar Tarefa
export class DeleteTaskController {
    constructor(private useCase: DeleteTaskUseCase) {}
  
    async handle(request: FastifyRequest,
        reply: FastifyReply): Promise<Response> {

          const input = deleteTaskValidated.parse(request.params)

      await this.useCase.execute(input.id);
      return reply.status(204).send();
    }
  }
  
  const deleteTaskValidated = z.object({
    id: z.string(),
  })

  // Fábrica do Controlador para Deletar Tarefa
export const deleteTaskFactory = new DeleteTaskController(
    new DeleteTaskUseCase(new TaskPrismaRepository())
  );
  