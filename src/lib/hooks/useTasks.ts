import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import { taskService } from '../../api/taskService';
import type { CreateTaskPayload, UpdateTaskPayload } from '../../api/taskService';
import type { Task } from '../zodSchemas';

export const useGetTasks = () => {
  const { getToken, isSignedIn } = useAuth();

  return useQuery({
    queryKey: ['tasks'],
    
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error('Não autenticado');
      
      return taskService.getTasks(token);
    },
    
    enabled: !!isSignedIn,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (data: CreateTaskPayload) => {
      const token = await getToken();
      if (!token) throw new Error('Não autenticado');
      
      return taskService.createTask(token, data);
    },
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    
    onError: (error) => {
      console.error('Falha ao criar tarefa:', error);
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (variables: { id: number | string; data: UpdateTaskPayload }) => {
      const { id, data } = variables;
      const token = await getToken();
      if (!token) throw new Error('Não autenticado');
      return taskService.updateTask(token, id, data);
    },
    
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);

      queryClient.setQueryData<Task[]>(['tasks'], (oldData = []) =>
        oldData.map((task) =>
          task.id === updatedTask.id 
            ? { ...task, ...updatedTask.data }
            : task
        )
      );

      return { previousTasks };
    },

    onError: (err, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
      console.error('Falha ao atualizar tarefa:', err);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (id: number | string) => {
      const token = await getToken();
      if (!token) throw new Error('Não autenticado');
      return taskService.deleteTask(token, id);
    },
    
    onMutate: async (deletedTaskId) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);

      queryClient.setQueryData<Task[]>(['tasks'], (oldData = []) =>
        oldData.filter((task) => task.id !== deletedTaskId)
      );

      return { previousTasks };
    },

    onError: (err, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
      console.error('Falha ao excluir tarefa:', err);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};