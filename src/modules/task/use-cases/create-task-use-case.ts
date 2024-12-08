import { Task } from "@prisma/client";
import { ITaskRepository } from "../repositories/task-repository.interface";

export interface CreateTaskInput {
    title: string;
    listname?: string;
    category: string;
}

export type CreateTaskOutput = Task;

// Caso de Uso para Criar Tarefa
export class CreateTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}
  
    async execute(input: CreateTaskInput): Promise<CreateTaskOutput> {
      const task = await this.taskRepository.insert(input);
      return task;
    }
  }
  