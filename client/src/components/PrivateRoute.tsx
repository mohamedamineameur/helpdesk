import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { JSX } from 'react';

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) return <p>Loading...</p>;

  return isLoggedIn ? children : <Navigate to="/login" />;
}
