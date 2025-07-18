// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/LandingView";
import FormView from "@/pages/FormView";
import DeckEditor from "@/pages/DeckEditor";
import TemplatesView from "@/pages/TemplatesView";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import MyDecks from "@/pages/MyDecks";
import HowItWorks from "@/pages/HowItWorks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/create" element={<FormView />} />
        <Route path="/templates" element={<TemplatesView />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/view/:id" element={<DeckEditor />} />
        <Route path="/mydecks" element={<MyDecks />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
