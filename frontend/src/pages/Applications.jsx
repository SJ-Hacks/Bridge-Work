import { useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, Stack, Chip, Box, Button, Snackbar, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';

const mockApplications = [
  {
    id: 1,
    jobId: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    message: 'I have experience in community service and would love to contribute.',
    status: 'Pending',
  },
  {
    id: 2,
    jobId: 2,
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    message: 'Passionate about helping others, and flexible with timings.',
    status: 'Pending',
  },
];

const Applications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState(
    mockApplications.filter((app) => String(app.jobId) === jobId)
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleAction = (id, newStatus) => {
    const updated = applications.map((applicant) =>
      applicant.id === id ? { ...applicant, status: newStatus } : applicant
    );
    setApplications(updated);
    setSnackbarMessage(`Applicant ${newStatus.toLowerCase()} successfully!`);
    setSnackbarOpen(true);
  };

  return (
    <Box sx={{ backgroundColor: '#f9fafb', py: 8, minHeight: '100vh' }}>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight="bold" color="primary" textAlign="center" mb={6}>
          Applications for Gig #{jobId}
        </Typography>

        {applications.length === 0 ? (
          <Typography variant="h6" textAlign="center" color="text.secondary" mt={10}>
            No applications yet. 🚀
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {applications.map((applicant) => (
              <Grid item xs={12} key={applicant.id}>
                <Card sx={{ p: 3, borderRadius: 4, boxShadow: 4 }}>
                  <CardContent>
                    <Stack spacing={1}>
                      <Typography variant="h6" fontWeight="bold">
                        {applicant.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {applicant.email}
                      </Typography>
                      <Typography variant="body2" mt={1}>
                        {applicant.message}
                      </Typography>

                      <Box mt={2}>
                        <Chip
                          label={applicant.status}
                          size="small"
                          color={
                            applicant.status === 'Pending'
                              ? 'warning'
                              : applicant.status === 'Accepted'
                              ? 'success'
                              : 'error'
                          }
                          sx={{ fontWeight: 'bold' }}
                        />
                      </Box>

                      {/* Accept/Reject Buttons */}
                      {applicant.status === 'Pending' && (
                        <Stack direction="row" spacing={2} mt={3}>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleAction(applicant.id, 'Accepted')}
                            fullWidth
                          >
                            Accept
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleAction(applicant.id, 'Rejected')}
                            fullWidth
                          >
                            Reject
                          </Button>
                        </Stack>
                      )}
                    </Stack>
                  </CardContent>
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

export default Applications;
