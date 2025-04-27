import { useState } from 'react';
import { 
  Card, CardContent, CardActions, Button, Typography, Grid, Container, Stack,
  Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert
} from '@mui/material';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Static volunteering data
const volunteeringOpportunities = [
  {
    id: 1,
    title: 'Food Bank Assistant',
    employer: 'San Jose Food Bank',
    pay: 'Volunteer',
    description: 'Help with packaging, organizing, and distributing food to families. Make a difference in your community!',
    time: 'Saturdays 9:00 AM - 12:00 PM',
    type: 'Recurring',
    location: 'South San Jose',
  },
  {
    id: 2,
    title: 'Community Park Cleanup',
    employer: 'San Jose Parks',
    pay: 'Volunteer',
    description: 'Assist in cleaning parks, removing trash, and planting trees to maintain a healthy green environment.',
    time: 'First Sunday every month',
    type: 'One-time',
    location: 'Downtown San Jose',
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

const Volunteering = () => {
  const [open, setOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleOpen = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOpportunity(null);
  };

  const handleConfirm = () => {
    setSnackbarOpen(true);
    handleClose();
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" color="primary" gutterBottom fontWeight="bold" textAlign="center">
        Available Volunteering Opportunities
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {volunteeringOpportunities.map((opportunity) => (
          <Grid item xs={12} sm={6} md={6} key={opportunity.id}>
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
                  {opportunity.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" mb={2}>
                  {opportunity.employer}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <VolunteerActivismIcon fontSize="small" />
                  <Typography variant="body2" sx={{ fontSize: '1rem' }}>{opportunity.pay}</Typography>
                </Stack>

                <Stack direction="row" alignItems="flex-start" spacing={1} mb={1}>
                  <DescriptionIcon fontSize="small" sx={{ mt: '2px' }} />
                  <Stack>
                    {splitIntoLines(opportunity.description).map((line, index) => (
                      <Typography key={index} variant="body2" sx={{ fontSize: '1rem' }}>
                        {line}
                      </Typography>
                    ))}
                  </Stack>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <AccessTimeIcon fontSize="small" />
                  <Typography variant="body2" sx={{ fontSize: '1rem' }}>{opportunity.time}</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <EventRepeatIcon fontSize="small" />
                  <Typography variant="body2" sx={{ fontSize: '1rem' }}>{opportunity.type}</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <LocationOnIcon fontSize="small" />
                  <Typography variant="body2" sx={{ fontSize: '1rem' }}>{opportunity.location}</Typography>
                </Stack>
              </CardContent>

              <CardActions sx={{ mt: 2 }}>
                <Button variant="contained" color="primary" fullWidth onClick={() => handleOpen(opportunity)}>
                  Apply to Volunteer
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Apply Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Apply for Volunteering</DialogTitle>
        <DialogContent>
          {selectedOpportunity && (
            <>
              <Typography variant="h6" fontWeight="bold" mb={1}>
                {selectedOpportunity.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" mb={2}>
                {selectedOpportunity.employer}
              </Typography>
              <Typography variant="body2" mb={2}>
                Are you sure you want to volunteer for this opportunity?
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

export default Volunteering;
