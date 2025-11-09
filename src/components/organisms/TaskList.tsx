import React from 'react';
import { TaskItem } from '../molecules/TaskItem';
import {
  useGetTasks,
  useUpdateTask,
  useDeleteTask,
} from '../../lib/hooks/useTasks';
import { Typography } from '../atoms/Typography';
import { Spinner } from '../atoms/Spinner';

export const TaskList: React.FC = () => {
  const { data: tasks, isLoading, isError } = useGetTasks();
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();

  const handleToggle = (id: number | string, status: 'pendente' | 'concluída') => {
    const newStatus = status === 'pendente' ? 'concluída' : 'pendente';
    updateTask({ id, data: { status: newStatus } });
  };

  const handleDelete = (id: number | string) => {
    deleteTask(id);
  };

if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-48 gap-4">
        <Spinner size="md" />
        <Typography variant="p" className="text-gray-500">
          Carregando tarefas...
        </Typography>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-48 bg-red-50 p-4 rounded-lg">
        <Typography variant="p" className="text-red-700">
          Oops! Não foi possível carregar suas tarefas.
        </Typography>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex justify-center items-center h-48 bg-gray-50 p-4 rounded-lg">
        <Typography variant="p" className="text-gray-500">
          Você ainda não tem tarefas. Adicione uma acima!
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 mt-6">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          isDone={task.status === 'concluída'}
          onToggle={() => handleToggle(task.id, task.status)}
          onDelete={() => handleDelete(task.id)}
        />
      ))}
    </div>
  );
};