import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Planet } from "./pages/Planet";
import { NotFound } from "./pages/NotFound";
import { useContext } from "react";
import { AuthContext } from "./context/auth";
import { Toaster } from "sonner";

function AppRoutes() {
  const { user } = useContext(AuthContext)!;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {user && (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/planet/:id" element={<Planet />} />
        </>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  );
}
