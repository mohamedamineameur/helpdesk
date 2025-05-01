import {
    Box,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    TextField,
    IconButton,
    Chip,
  } from '@mui/material';
  import { useEffect, useState } from 'react';
  import { api } from '../services/api';
  import { useAuth } from '../hooks/useAuth';
  import ToggleOnIcon from '@mui/icons-material/ToggleOn';
  import ToggleOffIcon from '@mui/icons-material/ToggleOff';
  
  interface User {
    id: string;
    username: string;
    email: string;
    role: 'admin' | 'agent' | 'client';
    isActive: boolean;
  }
  
  export default function Users() {
    const { user } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState('');
  
    useEffect(() => {
      if (user?.role === 'admin') {
        api.get('/users').then((res) => setUsers(res.data));
      }
    }, [user]);
  
    const handleToggleStatus = async (id: string, isActive: boolean) => {
      await api.put(`/users/${id}`, { isActive: !isActive });
      const updated = await api.get('/users');
      setUsers(updated.data);
    };
  
    const filtered = users.filter((u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );
  
    if (user?.role !== 'admin') {
      return (
        <Typography color="error" mt={4}>
          Access denied.
        </Typography>
      );
    }
  
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Users Management
        </Typography>
  
        <TextField
          label="Search by username or email"
          fullWidth
          sx={{ mb: 2 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
  
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Toggle</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.username}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Chip label={u.role} color={u.role === 'admin' ? 'warning' : 'default'} />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={u.isActive ? 'Active' : 'Disabled'}
                      color={u.isActive ? 'success' : 'error'}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleToggleStatus(u.id, u.isActive)}
                      color={u.isActive ? 'error' : 'success'}
                    >
                      {u.isActive ? <ToggleOffIcon /> : <ToggleOnIcon />}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    );
  }
  