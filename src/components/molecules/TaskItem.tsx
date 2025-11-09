import React from 'react';
import { Checkbox } from '../atoms/Checkbox';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import { X } from 'lucide-react'; // 1. Importado

interface TaskItemProps {
  title: string;
  isDone: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  title,
  isDone,
  onToggle,
  onDelete,
}) => {
  return (
    <div
      className={`
        flex items-center justify-between 
        p-4 bg-white shadow rounded-lg 
        transition-all
        ${isDone ? 'opacity-60' : 'opacity-100'}
      `}
    >
      <div className="flex items-center gap-3">
        {/* Átomo Checkbox */}
        <Checkbox checked={isDone} onChange={onToggle} />

        {/* Átomo Typography */}
        <Typography
          variant="p"
          className={`
            ${isDone ? 'line-through text-gray-500' : 'text-gray-900'}
          `}
        >
          {title}
        </Typography>
      </div>

      {/* Átomo Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onDelete}
        aria-label="Excluir tarefa"
        className="p-2"
      >
        <X size={16} />
      </Button>
    </div>
  );
};