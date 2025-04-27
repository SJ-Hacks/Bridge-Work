import { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Snackbar, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

import API from '../api/api'; // Adjust path if needed

const Applications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await API.get(`/api/application/?job_id=${jobId}`);
        const apps = response.data;

        const enhancedApps = await Promise.all(
          apps.map(async (app) => {
            const userRes = await API.get(`/api/user/${app.applicant}`);
            const jobRes = await API.get(`/api/job/${app.job_id}`);
            return {
              ...app,
              applicantName: userRes.data.name,
              jobTitle: jobRes.data.title,
            };
          })
        );

        setApplications(enhancedApps);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      }
    };

    fetchApplications();
  }, [jobId]);

  const handleAction = async (applicationId, action) => {
    try {
      await API.post(`/api/application/${applicationId}/${action}`);
      setSnackbarMessage(`Applicant ${action}ed successfully!`);
      setSnackbarOpen(true);
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, selected: action === 'accept' } : app
        )
      );
    } catch (error) {
      console.error(`Failed to ${action} application:`, error);
    }
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
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Applicant Name</TableCell>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app._id}>
                    <TableCell>{app.applicantName}</TableCell>
                    <TableCell>{app.jobTitle}</TableCell>
                    <TableCell>{app.selected ? 'Accepted' : 'Pending'}</TableCell>
                    <TableCell>
                      {!app.selected && (
                        <>
                          <Button color="success" onClick={() => handleAction(app._id, 'accept')}>Accept</Button>
                          <Button color="error" onClick={() => handleAction(app._id, 'reject')}>Reject</Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
