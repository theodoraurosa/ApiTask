import { Prisma, Task } from "@prisma/client";
import { PaginationInput, PaginationOutput } from "../../../../utils/pagination.dto";
import { ITaskRepository } from "../task-repository.interface";
import { prisma } from "../../../../lib/prisma";

// Repositório de Tarefas
export class TaskPrismaRepository implements ITaskRepository {
    async insert(data: Prisma.TaskCreateInput): Promise<Task> {
      return await prisma.task.create({ data: {
        title: data.title, 
        listname: data.listname, 
        category: data.category
      } });
    }
  
    async findById(id: string): Promise<Task | null> {
      return await prisma.task.findUnique({ where: { id } });
    }
  
    async findAll(params: PaginationInput): Promise<PaginationOutput> {
      const { page = 1, limit = 10, filter } = params;

      const query: Prisma.TaskWhereInput = filter
      ? { category: { contains: filter } }
      : {}

      const tasks = await prisma.task.findMany({
        where: query,
        skip: (page - 1) * limit,
        take: limit,
      });
      
      const total = await prisma.task.count({where: query});
      const lastPage = Math.ceil(total / limit)
      return { items: tasks, total,
        currentPage: page,
        lastPage,
        perPage: limit, };
    }
  
    async update(data: Prisma.TaskUpdateInput): Promise<Task> {
      return await prisma.task.update({
        where: { id: String(data.id) },
        data,
      });
    }
  
    async delete(id: string): Promise<void> {
      await prisma.task.delete({ where: { id } });
    }
  }
  