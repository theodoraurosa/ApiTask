import { ITaskRepository } from "../repositories/task-repository.interface";

// Caso de Uso para Deletar Tarefa
export class DeleteTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}
  
    async execute(id: string): Promise<void> {
      await this.taskRepository.delete(id);
    }
  }