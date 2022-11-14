import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "./layout/adminLayout";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<AdminLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
