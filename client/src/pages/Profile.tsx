import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Paper,
    Divider,
  } from '@mui/material';
  import { useState } from 'react';
  import { useAuth } from '../hooks/useAuth';
  import { api } from '../services/api';
  
  export default function Profile() {
    const { user, refreshUser } = useAuth();
  
    const [email, setEmail] = useState(user?.email);
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [message, setMessage] = useState('');
  
    const handleEmailUpdate = async () => {
      try {
        await api.put(`/users/${user?.id}`, { email });
        setMessage('✅ Email updated successfully');
        refreshUser?.();
      } catch (err) {
        console.error(err);
        setMessage('❌ Failed to update email');
      }
    };
  
    const handlePasswordUpdate = async () => {
      if (password !== confirm) {
        setMessage('❌ Passwords do not match');
        return;
      }
  
      try {
        await api.put(`/users/${user?.id}/password`, { password });
        setMessage('✅ Password updated successfully');
        setPassword('');
        setConfirm('');
      } catch (err) {
        console.error(err);
        setMessage('❌ Failed to update password');
      }
    };
  
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
  
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6">Account Info</Typography>
          <Typography>Username: {user?.username}</Typography>
          <Typography>Email: {user?.email}</Typography>
          <Typography>Role: {user?.role}</Typography>
        </Paper>
  
        <Stack spacing={2} sx={{ maxWidth: 400 }}>
          <Typography variant="h6">Update Email</Typography>
          <TextField
            label="New Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant="contained" onClick={handleEmailUpdate}>
            Update Email
          </Button>
  
          <Divider sx={{ my: 2 }} />
  
          <Typography variant="h6">Change Password</Typography>
          <TextField
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <Button variant="contained" onClick={handlePasswordUpdate}>
            Change Password
          </Button>
  
          {message && (
            <Typography mt={2} color={message.startsWith('✅') ? 'green' : 'error'}>
              {message}
            </Typography>
          )}
        </Stack>
      </Box>
    );
  }
  