import {
    Box,
    Typography,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Paper,
    Pagination,
    Stack,
  } from '@mui/material';
  import { useEffect, useState } from 'react';
  import { api } from '../services/api';
  import { Button, IconButton } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

  
  interface Ticket {
    id: string;
    title: string;
    status: string;
    priority: string;
    categoryId?: string;
  }
  
  export default function Tickets() {
    const { user } = useAuth();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [filtered, setFiltered] = useState<Ticket[]>([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;
  
    useEffect(() => {
      api.get('/tickets').then((res) => {
        setTickets(res.data);
      });
    }, []);
  
    useEffect(() => {
      const filteredData = tickets.filter((ticket) => {
        const matchSearch =
          ticket.title.toLowerCase().includes(search.toLowerCase()) ||
          ticket.id.toLowerCase().includes(search.toLowerCase());
  
        const matchStatus = statusFilter ? ticket.status === statusFilter : true;
        const matchPriority = priorityFilter ? ticket.priority === priorityFilter : true;
  
        return matchSearch && matchStatus && matchPriority;
      });
  
      setFiltered(filteredData);
      setPage(1); // reset pagination
    }, [tickets, search, statusFilter, priorityFilter]);
  
    const paginatedTickets = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Tickets
        </Typography>
  
        <Stack direction="row" spacing={2} mb={2}>
          <TextField
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
  
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="resolved">Resolved</MenuItem>
            </Select>
          </FormControl>
  
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              label="Priority"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </Stack>
  
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.title}</TableCell>
                  <TableCell>{ticket.status}</TableCell>
                  <TableCell>{ticket.priority}</TableCell>
                  <TableCell>
  <Stack direction="row" spacing={1}>
    {/* Lien vers détail */}
    <Button
      size="small"
      variant="outlined"
      onClick={() => window.location.href = `/tickets/${ticket.id}`}
    >
      View
    </Button>

    {/* Agent peut s'assigner */}
    {user?.role === 'agent' && ticket.status === 'open' && (
      <IconButton
        color="primary"
        onClick={async () => {
          try {
            await api.patch(`/tickets/${ticket.id}/assign`, {
              assignedToId: user.id,
            });
            const updated = await api.get('/tickets');
            setTickets(updated.data);
          } catch (err) {
            console.error(err);
          }
        }}
      >
        <AssignmentIndIcon />
      </IconButton>
    )}

    {/* Agent ou Admin peut changer le statut */}
    {(user?.role === 'agent' || user?.role === 'admin') && ticket.status !== 'resolved' && (
      <Button
        size="small"
        onClick={async () => {
          try {
            await api.patch(`/tickets/${ticket.id}/status`, {
              status: 'resolved',
            });
            const updated = await api.get('/tickets');
            setTickets(updated.data);
          } catch (err) {
            console.error(err);
          }
        }}
      >
        Resolve
      </Button>
    )}

    {/* Admin peut supprimer */}
    {user?.role === 'admin' && (
      <IconButton
        color="error"
        onClick={async () => {
          try {
            await api.delete(`/tickets/${ticket.id}`);
            setTickets(tickets.filter((t) => t.id !== ticket.id));
          } catch (err) {
            console.error(err);
          }
        }}
      >
        <DeleteIcon />
      </IconButton>
    )}
  </Stack>
</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={Math.ceil(filtered.length / rowsPerPage)}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        </Box>
      </Box>
    );
  }
  