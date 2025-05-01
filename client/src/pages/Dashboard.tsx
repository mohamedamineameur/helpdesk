import { Box, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { api } from '../services/api';

interface TicketStats {
  total: number;
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
}

export default function Dashboard() {
  const [stats, setStats] = useState<TicketStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/tickets')
      .then((res) => {
        const tickets = res.data;
  
        const total = tickets.length;
  
        const byStatus: Record<string, number> = {};
        const byPriority: Record<string, number> = {};
  
        tickets.forEach((t: any) => {
          byStatus[t.status] = (byStatus[t.status] || 0) + 1;
          byPriority[t.priority] = (byPriority[t.priority] || 0) + 1;
        });
  
        setStats({ total, byStatus, byPriority });
      })
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);
  

  if (loading) return <CircularProgress sx={{ m: 5 }} />;

  if (!stats)
    return (
      <Typography color="error" mt={4}>
        Failed to load stats.
      </Typography>
    );

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard title="Total Tickets" value={stats.total} />
        </Grid>

        {Object.entries(stats.byStatus).map(([status, count]) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={status}>
            <StatCard title={`Status: ${status}`} value={count} />
          </Grid>
        ))}

        {Object.entries(stats.byPriority).map(([priority, count]) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={priority}>
            <StatCard title={`Priority: ${priority}`} value={count} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="subtitle1" color="textSecondary">
        {title}
      </Typography>
      <Typography variant="h5" fontWeight="bold">
        {value}
      </Typography>
    </Paper>
  );
}
