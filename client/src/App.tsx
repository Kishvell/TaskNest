import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import CalendarPage from "./pages/CalendarPage";
import PomodoroPage from "./pages/PomodoroPage";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import axios from "axios";

function ProtectedRoute({ children }: { children: React.ReactNode })
{
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {

  useEffect(() => {
    axios.get("https://tasknest-vjqa.onrender.com/")
      .then(() => console.log("Backend pinged!"))
      .catch(() => console.log("Backend not awake yet."));
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <CalendarPage />
              </ProtectedRoute>
            }
          />

            <Route 
              path="/pomodoro" 
              element={
              <ProtectedRoute>
                <PomodoroPage />
              </ProtectedRoute>
              }
            />


          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
