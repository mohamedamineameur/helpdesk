import { Box, AppBar, Toolbar, Typography, CssBaseline, Container } from '@mui/material';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Helpdesk System</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4, mb: 4 }}>{children}</Container>
    </Box>
  );
}
