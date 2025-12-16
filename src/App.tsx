import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClerkProviderWrapper, isClerkConfigured } from "@/lib/clerk";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

// Pages
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Phishing from "./pages/Phishing";
import Deepfake from "./pages/Deepfake";
import History from "./pages/History";
import ProjectDetails from "./pages/ProjectDetails";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <Navigate to="/sign-in" replace />
      </SignedOut>
    </>
  );
}

// Demo mode wrapper for when Clerk is not configured
function DemoApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/phishing" element={<Phishing />} />
        <Route path="/deepfake" element={<Deepfake />} />
        <Route path="/history" element={<History />} />
        <Route path="/project" element={<ProjectDetails />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// Full app with authentication
function AuthenticatedApp() {
  return (
    <ClerkProviderWrapper>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/sign-in/*" element={<SignIn />} />
          <Route path="/sign-up/*" element={<SignUp />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/phishing"
            element={
              <ProtectedRoute>
                <Phishing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/deepfake"
            element={
              <ProtectedRoute>
                <Deepfake />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path="/project"
            element={
              <ProtectedRoute>
                <ProjectDetails />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ClerkProviderWrapper>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {isClerkConfigured() ? <AuthenticatedApp /> : <DemoApp />}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
