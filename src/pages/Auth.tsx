import React from "react";
import { Typography } from "../components/atoms/Typography";
import { CheckSquare } from "lucide-react";
import ClerkLogin from "../components/atoms/ClerkLogin";

export const AuthPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
      {/* Cabeçalho simples */}
      <div className="flex items-center gap-2 mb-8">
        <CheckSquare className="text-blue-600" size={32} />
        <Typography variant="h1" as="h1" className="text-gray-900">
          Meu To-Do List
        </Typography>
      </div>

      {/* Componente de Login do Clerk */}
      <ClerkLogin />
    </div>
  );
};
