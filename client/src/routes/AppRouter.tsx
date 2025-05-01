import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Tickets from '../pages/Tickets';
import TicketDetail from '../pages/TicketDetail';
import Users from '../pages/Users';
import Profile from '../pages/Profile';
import PrivateRoute from '../components/PrivateRoute';

export default function AppRouter() {
  const { isLoggedIn, isLoading } = useAuth();
  if (isLoading) return null; // ou spinner global

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Routes privées encapsulées */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/tickets"
          element={
            <PrivateRoute>
              <Tickets />
            </PrivateRoute>
          }
        />
        <Route
          path="/tickets/:id"
          element={
            <PrivateRoute>
              <TicketDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* Redirection par défaut */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? '/' : '/login'} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
