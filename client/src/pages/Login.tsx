import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Alert,
    Paper,
  } from '@mui/material';
  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { api } from '../services/api';
  
  export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
  
      try {
        const res = await api.post('/auth/login', { email, password });
        if (res.status === 200) {
          navigate('/'); // ✅ vers dashboard
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Login failed');
      }
    };
  
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>Login</Typography>
  
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              type="email"
              required
            />
  
            <TextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              type="password"
              required
            />
  
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
            )}
  
            <Box mt={3}>
              <Button type="submit" variant="contained" fullWidth>
                Log In
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    );
  }
  