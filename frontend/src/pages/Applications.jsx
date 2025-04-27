import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchApplicationsByJob, acceptApplication, rejectApplication } from '../store/applicationSlice';
import { fetchUsers } from '../store/userSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import { Container, Typography, Card, CardContent, Grid, Stack, Chip, Box, Button, Snackbar, Alert } from '@mui/material';

const Applications = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();

  const { list: users = [] } = useSelector((state) => state.users || {});
  const { list: applications = [], status: appStatus } = useSelector((state) => state.applications || {});

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchApplicationsByJob(jobId));
  }, [dispatch, jobId]);

  const getUserById = (userId) => users.find((user) => user._id === userId);

  const handleAccept = async (id) => {
    await dispatch(acceptApplication(id));
    setSnackbarMessage('Application accepted!');
    setSnackbarOpen(true);
  };

  const handleReject = async (id) => {
    await dispatch(rejectApplication(id));
    setSnackbarMessage('Application rejected!');
    setSnackbarOpen(true);
  };

  if (appStatus === 'loading') {
    return <LoadingSpinner />;
  }

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
            {applications.map((app) => {
              const user = getUserById(app.applicant);
              return (
                <Grid item xs={12} key={app._id}>
                  <Card sx={{ p: 3, borderRadius: 4, boxShadow: 4 }}>
                    <CardContent>
                      <Stack spacing={1}>
                        <Typography variant="h6" fontWeight="bold">
                          {user ? user.name : 'Unknown User'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user ? user.email : 'No Email'}
                        </Typography>

                        <Box mt={2}>
                          <Chip
                            label={app.selected ? 'Accepted' : app.active ? 'Pending' : 'Rejected'}
                            size="small"
                            color={
                              app.selected
                                ? 'success'
                                : app.active
                                ? 'warning'
                                : 'error'
                            }
                            sx={{ fontWeight: 'bold' }}
                          />
                        </Box>

                        {app.active && !app.selected && (
                          <Stack direction="row" spacing={2} mt={3}>
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => handleAccept(app._id)}
                              fullWidth
                            >
                              Accept
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleReject(app._id)}
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
              );
            })}
          </Grid>
        )}

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
