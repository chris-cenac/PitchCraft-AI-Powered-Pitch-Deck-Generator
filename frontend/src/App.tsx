// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Landing from "@/pages/LandingView";
import FormView from "@/pages/FormView";
import DeckEditor from "@/pages/DeckEditor";
import TemplatesView from "@/pages/TemplatesView";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import MyDecks from "@/pages/MyDecks";
import HowItWorks from "@/pages/HowItWorks";
import ProtectedRoute from "./components/auth/ProtectedRoute";

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
    </BrowserRouter>
  );
}

export default App;
