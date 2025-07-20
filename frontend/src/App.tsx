// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";
import SimpleLoading from "./components/SimpleLoading";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Lazy load components for better performance
const Landing = lazy(() => import("@/pages/LandingView"));
const FormView = lazy(() => import("@/pages/FormView"));
const DeckEditor = lazy(() => import("@/pages/DeckEditor"));
const TemplatesView = lazy(() => import("@/pages/TemplatesView"));
const MyDecks = lazy(() => import("@/pages/MyDecks"));
const HowItWorks = lazy(() => import("@/pages/HowItWorks"));

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#4ade80",
              secondary: "#fff",
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <Suspense fallback={<SimpleLoading />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <FormView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/templates"
            element={
              <ProtectedRoute>
                <TemplatesView />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/view/:id"
            element={
              <ProtectedRoute>
                <DeckEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mydecks"
            element={
              <ProtectedRoute>
                <MyDecks />
              </ProtectedRoute>
            }
          />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
