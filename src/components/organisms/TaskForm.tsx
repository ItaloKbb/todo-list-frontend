import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';
import { useCreateTask } from '../../lib/hooks/useTasks';
import { createTaskDTO, type CreateTaskForm } from '../../lib/zodSchemas';
import { Plus } from 'lucide-react';

export const TaskForm: React.FC = () => {
  const { mutate: createTask, isPending } = useCreateTask();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Para limpar o formulário após o envio
  } = useForm<CreateTaskForm>({
    resolver: zodResolver(createTaskDTO),
  });

  const onSubmit: SubmitHandler<CreateTaskForm> = (data) => {
    createTask(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-start gap-2">
      <FormField
        id="new-task-title"
        label="Nova Tarefa"
        placeholder="O que precisa ser feito?"
        className="flex-1"
        error={errors.title?.message}
        {...register('title')}
      />

      {/* Átomo Button */}
      <Button
        type="submit"
        disabled={isPending}
        className="mt-[22px]"
        aria-label="Adicionar tarefa"
      >
        {isPending ? 'Salvando...' : <Plus size={20} />}
      </Button>
    </form>
  );
};