import {
    Box,
    Typography,
    Paper,
    CircularProgress,
    TextField,
    Button,
    Stack,
  } from '@mui/material';
  import { useEffect, useState } from 'react';
  import { useParams } from 'react-router-dom';
  import { api } from '../services/api';
  import { useAuth } from '../hooks/useAuth';
  
  interface Ticket {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    createdAt: string;
  }
  
  interface Comment {
    id: string;
    content: string;
    createdAt: string;
    userId: string;
  }
  
  export default function TicketDetail() {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchDetails = async () => {
        try {
          const [ticketRes, commentsRes] = await Promise.all([
            api.get(`/tickets/${id}`),
            api.get(`/comments/ticket/${id}`),
          ]);
          setTicket(ticketRes.data);
          setComments(commentsRes.data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchDetails();
    }, [id]);
  
    const handleAddComment = async () => {
      if (!newComment.trim()) return;
  
      try {
        await api.post('/comments', {
          ticketId: id,
          content: newComment,
          userId: user?.id, // selon la structure actuelle
        });
  
        const res = await api.get(`/comments/ticket/${id}`);
        setComments(res.data);
        setNewComment('');
      } catch (err) {
        console.error(err);
      }
    };
  
    if (loading) return <CircularProgress sx={{ m: 5 }} />;
  
    if (!ticket)
      return (
        <Typography color="error" mt={4}>
          Ticket not found
        </Typography>
      );
  
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {ticket.title}
        </Typography>
  
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="body1">{ticket.description}</Typography>
          <Typography color="text.secondary" mt={2}>
            Priority: {ticket.priority} — Status: {ticket.status}
          </Typography>
          <Typography color="text.secondary">Created at: {new Date(ticket.createdAt).toLocaleString()}</Typography>
        </Paper>
  
        <Typography variant="h5" gutterBottom>
          Comments
        </Typography>
  
        {comments.length === 0 ? (
          <Typography>No comments yet.</Typography>
        ) : (
          comments.map((c) => (
            <Paper key={c.id} sx={{ p: 2, mb: 1 }}>
              <Typography>{c.content}</Typography>
              <Typography variant="caption" color="text.secondary">
                Posted on {new Date(c.createdAt).toLocaleString()}
              </Typography>
            </Paper>
          ))
        )}
  
        {user && (
          <Box mt={3}>
            <TextField
              label="Add a comment"
              fullWidth
              multiline
              minRows={2}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button onClick={handleAddComment} variant="contained" sx={{ mt: 1 }}>
              Post
            </Button>
          </Box>
        )}
      </Box>
    );
  }
  