import { z } from 'zod';

/**
 * Define os status possíveis para uma tarefa, com base na modelagem.
 * Usamos z.enum() no frontend para validar os valores de string.
 */
export const TaskStatus = z.enum(['pendente', 'concluída']);

/**
 * Schema para validação da *criação* de uma nova tarefa.
 */
export const createTaskDTO = z.object({
  title: z
    .string({ message: 'O título é obrigatório.' })
    .min(3, { message: 'O título deve ter pelo menos 3 caracteres.' }),
  description: z.string().optional(),
});

/**
 * Schema para validação da *atualização* de uma tarefa.
 */
export const updateTaskDTO = z.object({
  title: z
    .string()
    .min(3, { message: 'O título deve ter pelo menos 3 caracteres.' })
    .optional(),
  description: z.string().optional(),
  status: TaskStatus.optional(),
});

/**
 * Schema para validar o objeto de Tarefa *completo* (ex: respostas da API).
 */
export const taskSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string().nullable(),
  status: TaskStatus,
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  user_id: z.string(),
});

/**
 * Schema para validar respostas de erro padronizadas da API.
 */
export const errorSchema = z.object({
  error: z.string(),
  details: z.any().optional(),
});

/**
 * Tipo inferido para o formulário de criação,
 */
export type CreateTaskForm = z.infer<typeof createTaskDTO>;

/**
 * Tipo inferido para o formulário de atualização.
 */
export type UpdateTaskForm = z.infer<typeof updateTaskDTO>;

/**
 * Tipo inferido da Tarefa, para ser usado em todo o frontend.
 */
export type Task = z.infer<typeof taskSchema>;