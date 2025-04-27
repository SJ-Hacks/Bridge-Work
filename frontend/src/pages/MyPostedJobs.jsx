import { useState } from 'react';
import { Container, Typography, Card, CardContent, CardActions, Button, Grid, Stack, Chip, Snackbar, Alert, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const mockPostedJobs = [
  {
    id: 1,
    title: 'Street Beautification',
    pay: '$10/hr',
    status: 'Open',
  },
  {
    id: 2,
    title: 'Food Bank Helper',
    pay: 'Volunteer',
    status: 'Closed',
  },
];

const MyPostedJobs = () => {
  const [postedJobs, setPostedJobs] = useState(mockPostedJobs);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setPostedJobs((prev) => prev.filter((job) => job.id !== id));
    setSnackbarMessage('Job deleted successfully!');
    setSnackbarOpen(true);
  };

  const handleCloseJob = (id) => {
    setPostedJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, status: 'Closed' } : job
      )
    );
    setSnackbarMessage('Job closed successfully!');
    setSnackbarOpen(true);
  };

  const handleReopenJob = (id) => {
    setPostedJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, status: 'Open' } : job
      )
    );
    setSnackbarMessage('Job reopened successfully!');
    setSnackbarOpen(true);
  };

  return (
    <Box sx={{ backgroundColor: '#f9fafb', py: 8, minHeight: '100vh' }}>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight="bold" color="primary" textAlign="center" mb={6}>
          My Posted Gigs
        </Typography>

        {postedJobs.length === 0 ? (
          <Typography variant="h6" textAlign="center" color="text.secondary" mt={10}>
            You haven't posted any gigs yet. 🚀
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {postedJobs.map((job) => (
              <Grid item xs={12} md={6} key={job.id}>
                <Card sx={{ p: 3, borderRadius: 4, boxShadow: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <CardContent>
                    <Stack spacing={1}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {job.title}
                      </Typography>

                      <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                        <Typography variant="body2" color="text.secondary">
                          {job.pay}
                        </Typography>

                        <Chip
                          label={job.status}
                          size="small"
                          color={job.status === 'Open' ? 'success' : 'warning'}
                          sx={{ fontWeight: 'bold' }}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>

                  <CardActions sx={{ mt: 2, flexDirection: 'column', gap: 1.5 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      fullWidth
                      onClick={() => navigate(`/edit-job/${job.id}`)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      fullWidth
                      onClick={() => navigate(`/applications/${job.id}`)}
                    >
                      View Applicants
                    </Button>

                    {job.status === 'Open' ? (
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        fullWidth
                        onClick={() => handleCloseJob(job.id)}
                      >
                        Close Job
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        fullWidth
                        onClick={() => handleReopenJob(job.id)}
                      >
                        Reopen Job
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default MyPostedJobs;
