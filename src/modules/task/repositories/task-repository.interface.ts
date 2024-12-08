import { Prisma, Task } from "@prisma/client";
import { PaginationInput, PaginationOutput } from "../../../utils/pagination.dto";

export interface ITaskRepository {
    insert(data: Prisma.TaskCreateInput): Promise<Task>;
    findById(id: string): Promise<Task | null>;
    findAll(params: PaginationInput): Promise<PaginationOutput>;
    update(data: Prisma.TaskUpdateInput): Promise<Task>;
    delete(id: string): Promise<void>;
  }