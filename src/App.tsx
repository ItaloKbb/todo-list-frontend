import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, ClerkProvider } from "@clerk/clerk-react";
import { DashboardPage } from "./pages/Dashboard";
import { AuthPage } from "./pages/Auth";
import { ptBR } from '@clerk/localizations';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

/**
 * Hook customizado para sincronizar o Clerk com o React Router
 */
function ClerkNavigate() {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY} 
      localization={ptBR}
      // @ts-expect-error Clerk types are missing navigate prop
      navigate={(to) => navigate(to)}
    >
      <AppRoutes />
    </ClerkProvider>
  );
}

function AppRoutes() {
  return (
    <>
      <SignedIn>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="*" element={<DashboardPage />} />
        </Routes>
      </SignedIn>

      <SignedOut>
        <Routes>
          <Route path="/sign-in" element={<AuthPage />} />
          <Route path="/sign-up" element={<AuthPage />} />
          <Route path="*" element={<AuthPage />} />
        </Routes>
      </SignedOut>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ClerkNavigate />
    </BrowserRouter>
  );
}

export default App;
