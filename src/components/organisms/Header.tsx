import React from 'react';
import { Typography } from '../atoms/Typography';
import { CheckSquare } from 'lucide-react'; // Ícone para o logo
import ClerkLogin from '../atoms/ClerkLogin';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between w-full p-4 bg-white shadow-md">
      {/* Lado Esquerdo: Logo/Título */}
      <div className="flex items-center gap-2">
        <CheckSquare className="text-blue-600" size={28} />
        <Typography variant="h2" as="h1" className="text-gray-900">
          Meu To-Do List
        </Typography>
      </div>

      {/* Lado Direito: Controle do Usuário */}
      <div>
        <ClerkLogin />
      </div>
    </header>
  );
};