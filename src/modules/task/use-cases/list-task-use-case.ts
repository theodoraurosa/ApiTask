import { PaginationInput, PaginationOutput } from "../../../utils/pagination.dto";
import { ITaskRepository } from "../repositories/task-repository.interface";

// Caso de Uso para Listar Tarefas
export class ListTasksUseCase {
    constructor(private taskRepository: ITaskRepository) {}
  
    async execute(params: PaginationInput): Promise<PaginationOutput> {
      return await this.taskRepository.findAll(params);
    }
  }