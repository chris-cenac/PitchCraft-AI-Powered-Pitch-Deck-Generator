// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/LandingView";
import FormView from "@/pages/FormView";
import DeckEditor from "@/pages/DeckEditor";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/create" element={<FormView />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/view/:id" element={<DeckEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
