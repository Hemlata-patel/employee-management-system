import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/add" element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />
      <Route path="/edit/:id" element={<ProtectedRoute><EditEmployee /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
