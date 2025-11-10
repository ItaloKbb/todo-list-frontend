# 🚀 Meu To-Do List (Frontend)

Este é o frontend do projeto To-Do List, desenvolvido com React, Vite e Tailwind CSS. A aplicação oferece uma experiência de usuário moderna e reativa para gerenciamento de tarefas, com autenticação segura provida pelo Clerk e gerenciamento de estado de servidor otimista com React Query.

## ✨ Features (Funcionalidades)

  * **Autenticação Segura:** Cadastro e login de usuários utilizando [Clerk](https://www.google.com/search?q=https%22//clerk.com/%22).
  * **Gerenciamento de Tarefas (CRUD):** Criação, leitura, atualização e exclusão de tarefas.
  * **UX Premium (Otimista):** A interface é atualizada instantaneamente ao marcar/excluir tarefas, parecendo instantânea para o usuário (graças ao React Query).
  * **Design Responsivo:** Interface limpa e moderna que funciona em desktops e dispositivos móveis (construída com Tailwind CSS).
  * **Validação de Formulário:** Validação de dados robusta no lado do cliente usando Zod, garantindo que apenas dados válidos sejam enviados à API.

## 💻 Tech Stack (Tecnologias Utilizadas)

  * **Framework/Biblioteca:** React 18+ com Vite
  * **Linguagem:** TypeScript
  * **Estilização:** Tailwind CSS (com `cva` para variantes)
  * **Gerenciamento de Estado de API:** TanStack Query (React Query)
  * **Autenticação:** Clerk
  * **Roteamento:** React Router DOM
  * **Validação de Schema:** Zod
  * **Formulários:** React Hook Form
  * **Ícones:** Lucide React
  * **Requisições HTTP:** Axios

-----

## ⚙️ Instalação e Configuração

Siga os passos abaixo para rodar o projeto localmente.

### 1\. Pré-requisitos

  * [Node.js](https://nodejs.org/) (versão 18 ou superior)
  * [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)
  * A [API de To-Do List](https://todo-list-api-teal.vercel.app/api/v1/) deve estar rodando (localmente ou em deploy).

### 2\. Clonar o Repositório

```bash
git clone https://github.com/ItaloKbb/todo-list-frontend.git
cd todo-list-frontend
```

### 3\. Instalar Dependências

```bash
npm install
```

### 4\. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (`/`) e adicione as seguintes chaves:

```env
# Chave pública do Clerk (encontrada no seu dashboard do Clerk)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_SUA_CHAVE_PUBLICA_AQUI

# (Opcional) URL base da sua API
# VITE_API_BASE_URL=http://localhost:3000/api/v1
```

### 5\. Rodar o Projeto

```bash
npm run dev
```

Abra [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173) (ou a porta indicada no terminal) no seu navegador.

-----

## 📁 Estrutura do Projeto (Atomic Design)

O projeto segue uma arquitetura baseada no Atomic Design para organizar os componentes de UI, facilitando a manutenção e reutilização.

```
src/
├── api/              # Lógica de requisições (apiClient, taskService)
├── components/       # Componentes de UI
│   ├── atoms/        # Os blocos de construção básicos (Button, Input, Spinner)
│   ├── molecules/    # Grupos de átomos (FormField, TaskItem)
│   └── organisms/    # Seções da UI (Header, TaskForm, TaskList)
├── lib/              # Utilitários (ex: zodSchemas.ts)
│   └──hooks/            # Hooks customizados (ex: useTasks.ts com React Query)
├── pages/            # Páginas da aplicação (AuthPage, DashboardPage)
├── styles/           # Estilos globais (global.css)
├── App.tsx           # Configuração de Roteamento (React Router)
└── main.tsx          # Ponto de entrada (Renderização do React, Providers)
```