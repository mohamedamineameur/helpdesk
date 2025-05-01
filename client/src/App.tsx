import { CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import AppRouter from './routes/AppRouter';

export default function App() {
  return (
    <AuthProvider>
      <CssBaseline /> {/* Nettoyage visuel de base MUI */}
      <AppRouter />
    </AuthProvider>
  );
}
