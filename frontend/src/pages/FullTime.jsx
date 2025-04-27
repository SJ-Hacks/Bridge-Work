import { useState } from 'react';
import { 
  Card, CardContent, CardActions, Button, Typography, Grid, Container, Stack,
  Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert
} from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Static full-time job data
const fullTimeJobs = [
  {
    id: 1,
    title: 'Office Assistant',
    employer: 'City of San Jose',
    pay: '$18 / hr',
    description: 'Provide administrative support to various city departments. Manage filing, calls, and scheduling tasks.',
    time: 'Mon-Fri, 9:00 AM - 5:00 PM',
    type: 'Full-Time',
    location: 'City Hall, San Jose',
  },
  {
    id: 2,
    title: 'Maintenance Worker',
    employer: 'San Jose Parks Department',
    pay: '$20 / hr',
    description: 'Perform maintenance of parks, trails, and recreational facilities. Requires basic repair skills and teamwork.',
    time: 'Mon-Fri, 7:00 AM - 3:00 PM',
    type: 'Full-Time',
    location: 'Various San Jose locations',
  },
];

// Helper function to split description into ~60 character lines
const splitIntoLines = (text, maxLineLength = 60) => {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach(word => {
    if ((currentLine + word).length <= maxLineLength) {
      currentLine += word + ' ';
    } else {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    }
  });

  if (currentLine.length > 0) {
    lines.push(currentLine.trim());
  }

  return lines;
};

const FullTime = () => {
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleOpen = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedJob(null);
  };

  const handleConfirm = () => {
    setSnackbarOpen(true);
    handleClose();
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" color="primary" gutterBottom fontWeight="bold" textAlign="center">
        Full-Time Job Opportunities
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {fullTimeJobs.map((job) => (
          <Grid item xs={12} sm={6} md={6} key={job.id}>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 3,
                borderColor: 'grey.300',
                p: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-4px)',
                  borderColor: 'primary.main',
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold" mb={0.5}>
                  {job.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" mb={2}>
                  {job.employer}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <MonetizationOnIcon fontSize="small" />
                  <Typography variant="body2" sx={{ fontSize: '1rem' }}>{job.pay}</Typography>
                </Stack>

                <Stack direction="row" alignItems="flex-start" spacing={1} mb={1}>
                  <DescriptionIcon fontSize="small" sx={{ mt: '2px' }} />
                  <Stack>
                    {splitIntoLines(job.description).map((line, index) => (
                      <Typography key={index} variant="body2" sx={{ fontSize: '1rem' }}>
                        {line}
                      </Typography>
                    ))}
                  </Stack>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <AccessTimeIcon fontSize="small" />
                  <Typography variant="body2" sx={{ fontSize: '1rem' }}>{job.time}</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <EventRepeatIcon fontSize="small" />
                  <Typography variant="body2" sx={{ fontSize: '1rem' }}>{job.type}</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <LocationOnIcon fontSize="small" />
                  <Typography variant="body2" sx={{ fontSize: '1rem' }}>{job.location}</Typography>
                </Stack>
              </CardContent>

              <CardActions sx={{ mt: 2 }}>
                <Button variant="contained" color="primary" fullWidth onClick={() => handleOpen(job)}>
                  Apply Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Apply Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Apply for Full-Time Job</DialogTitle>
        <DialogContent>
          {selectedJob && (
            <>
              <Typography variant="h6" fontWeight="bold" mb={1}>
                {selectedJob.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" mb={2}>
                {selectedJob.employer}
              </Typography>
              <Typography variant="body2" mb={2}>
                Are you sure you want to apply for this job opportunity?
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" variant="contained">
            Confirm Apply
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)} sx={{ width: '100%' }}>
          Application submitted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FullTime;
