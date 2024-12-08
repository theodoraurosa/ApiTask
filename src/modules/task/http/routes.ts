import { FastifyInstance } from "fastify"
import { createTaskFactory } from "./controllers/create-task.controller";
import { listTasksFactory } from "./controllers/list-task.controller";
import { getTaskFactory } from "./controllers/get-task.controller";
import { updateTaskFactory } from "./controllers/update-task.controller";
import { deleteTaskFactory } from "./controllers/delete-task.controller";

// Rotas
export async function tasksRoutes(app: FastifyInstance) {
    app.post('/tasks', (req, res) => createTaskFactory.handle(req, res));
    app.get('/tasks', (req, res) => listTasksFactory.handle(req, res));
    app.get('/tasks/:id', (req, res) => getTaskFactory.handle(req, res));
    app.patch('/tasks/:id', (req, res) => updateTaskFactory.handle(req, res));
    app.delete('/tasks/:id', (req, res) => deleteTaskFactory.handle(req, res));
}

