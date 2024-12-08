import { FastifyReply, FastifyRequest } from "fastify"
import { TaskPrismaRepository } from "../../repositories/prisma/task-repository";
import { ListTasksUseCase } from "../../use-cases/list-task-use-case";
import { z } from "zod";

// Controlador para Listar Tarefas
export class ListTasksController {
    constructor(private useCase: ListTasksUseCase) {}
  
    async handle(request: FastifyRequest,
        reply: FastifyReply): Promise<Response> { 
      const input = listTaskValidated.parse(request.query)
      console.log({a: request.query, input});
      const tasks = await this.useCase.execute(input);
      return reply.send(tasks);
    }
  }

  const listTaskValidated = z.object({
    filter: z.string().optional(),
    page: z
      .string()
      .transform((val) => parseInt(val, 10))
      .optional()
      .or(z.number()),
    limit: z
      .string()
      .transform((val) => parseInt(val, 10))
      .optional()
      .or(z.number()),
  })
  
  // Fábrica do Controlador para Listar Tarefas
  export const listTasksFactory = new ListTasksController(
    new ListTasksUseCase(new TaskPrismaRepository())
  );