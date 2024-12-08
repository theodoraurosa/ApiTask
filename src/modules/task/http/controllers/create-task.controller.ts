import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod';
import { CreateTaskUseCase } from "../../use-cases/create-task-use-case";
import { TaskPrismaRepository } from "../../repositories/prisma/task-repository";

// Controlador para Criar Tarefa
export class CreateTaskController {
    constructor(private useCase: CreateTaskUseCase) {}
  
    async handle(request: FastifyRequest,
        reply: FastifyReply): Promise<Response> {
      const input = createTaskValidated.parse(request.body);
      const task = await this.useCase.execute(input);
      return reply.status(201).send(task);
    }
}

// Validação para Criar Tarefa
const createTaskValidated = z.object({
    title: z.string(),
    // listname: z.string(),
    category: z.string(),
  });
  
  // Fábrica do Controlador para Criar Tarefa
export const createTaskFactory = new CreateTaskController(
    new CreateTaskUseCase(new TaskPrismaRepository())
  );