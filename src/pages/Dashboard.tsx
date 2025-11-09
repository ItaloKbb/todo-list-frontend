// src/pages/Dashboard.tsx

import React from 'react';
import { Header } from '../components/organisms/Header';
import { TaskForm } from '../components/organisms/TaskForm';
import { TaskList } from '../components/organisms/TaskList';

export const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* 1. Nosso organismo Header */}
      <Header />

      {/* 2. Container principal do conteúdo */}
      <main className="max-w-3xl mx-auto p-4 md:p-8">
        {/* 3. Nosso organismo de Formulário */}
        <section className="mb-8 p-6 bg-white rounded-lg shadow">
          <TaskForm />
        </section>

        {/* 4. Nosso organismo de Lista */}
        <section>
          <TaskList />
        </section>
      </main>
    </div>
  );
};