import apiClient from './apiClient';
import {
  createTaskDTO,
  updateTaskDTO,
  taskSchema,
} from '../lib/zodSchemas';
import { z } from 'zod';

// --- Definição de Tipos (Usando Zod) ---
export type CreateTaskPayload = z.infer<typeof createTaskDTO>;
export type UpdateTaskPayload = z.infer<typeof updateTaskDTO>;
export type Task = z.infer<typeof taskSchema>;

// --- Funções de Serviço ---

/**
 * Cria o cabeçalho de autenticação Bearer.
 * @param token O token JWT do Clerk
 * @returns Objeto de cabeçalho do Axios
 */
const getAuthHeaders = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

/**
 * Cria uma nova tarefa.
 * Mapeia para: POST /tasks
 */
const createTask = async (token: string, data: CreateTaskPayload): Promise<Task> => {
  createTaskDTO.parse(data);

  const response = await apiClient.post('/tasks', data, getAuthHeaders(token));
  return taskSchema.parse(response.data);
};

/**
 * Busca todas as tarefas do usuário.
 * Mapeia para: GET /tasks
 */
const getTasks = async (token: string): Promise<Task[]> => {
  const response = await apiClient.get('/tasks', getAuthHeaders(token));
  
  // Valida se a resposta é um *array* de tarefas
  return z.array(taskSchema).parse(response.data);
};

/**
 * Busca uma tarefa específica por ID.
 * Mapeia para: GET /tasks/{id}
 */
const getTaskById = async (token: string, id: number | string): Promise<Task> => {
  const response = await apiClient.get(`/tasks/${id}`, getAuthHeaders(token));
  return taskSchema.parse(response.data);
};

/**
 * Atualiza uma tarefa existente.
 * Mapeia para: PUT /tasks/{id}
 */
const updateTask = async (
  token: string,
  id: number | string,
  data: UpdateTaskPayload
): Promise<Task> => {
  updateTaskDTO.parse(data);

  const response = await apiClient.put(`/tasks/${id}`, data, getAuthHeaders(token));
  return taskSchema.parse(response.data);
};

/**
 * Exclui uma tarefa.
 * Mapeia para: DELETE /tasks/{id}
 * Retorna void, pois a API deve retornar 204 No Content.
 */
const deleteTask = async (token: string, id: number | string): Promise<void> => {
  await apiClient.delete(`/tasks/${id}`, getAuthHeaders(token));
};

export const taskService = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};