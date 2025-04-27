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

// Static gigs data
const gigs = [
  {
    id: 1,
    title: 'Street Beautification',
    employer: 'City of San Jose',
    pay: '$5 / hr',
    description: 'Assist in cleaning streets, collecting trash, planting flowers, and beautifying public spaces around downtown San Jose.',
    time: '4:00 PM - 7:00 PM',
    type: 'One-time',
    location: 'Downtown San Jose',
  },
  {
    id: 2,
    title: 'Food Bank Helper',
    employer: 'San Jose Food Bank',
    pay: 'Volunteer',
    description: 'Help with packaging food, managing inventory, and distributing to families. Requires ability to lift 20 lbs. Warm community environment.',
    time: '9:00 AM - 1:00 PM',
    type: 'Recurring',
    location: 'South San Jose',
  },
  {
    id: 3,
    title: 'Community Event Setup',
    employer: 'San Jose Events',
    pay: '$50 per event',
    description: 'Assist with setting up chairs, banners, tables, and helping manage event flow for large gatherings and celebrations. Must be able to lift light equipment and work in a team setting.',
    time: 'Flexible hours',
    type: 'One-time',
    location: 'East San Jose',
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

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [selectedGig, setSelectedGig] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleOpen = (gig) => {
    setSelectedGig(gig);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedGig(null);
  };

  const handleConfirm = () => {
    setSnackbarOpen(true); // Show snackbar
    handleClose(); // Close modal
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" color="primary" gutterBottom fontWeight="bold" textAlign="center">
        Available Gigs
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {gigs.map((gig) => (
          <Grid item xs={12} sm={6} md={6} key={gig.id}>
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
                  {gig.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" mb={2}>
                  {gig.employer}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <MonetizationOnIcon fontSize="small" />
                  <Typography variant="body2" sx={{ fontSize: '1rem' }}>{gig.pay}</Typography>
                </Stack>

                <Stack direction="row" alignItems="flex-start" spacing={1} mb={1}>
                  <DescriptionIcon fontSize="small" sx={{ mt: '2px' }} />
                  <Stack>
                    {splitIntoLines(gig.description).map((line, index) => (
                      <Typography key={index} variant="body2" sx={{ fontSize: '1rem' }}>
                        {line}
                      </Typography>
                    ))}
                  </Stack>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <AccessTimeIcon fontSize="small" />
                  <Typography variant="body2" sx={{ fontSize: '1rem' }}>{gig.time}</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <EventRepeatIcon fontSize="small" />
                  <Typography variant="body2" sx={{ fontSize: '1rem' }}>{gig.type}</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <LocationOnIcon fontSize="small" />
                  <Typography variant="body2" sx={{ fontSize: '1rem' }}>{gig.location}</Typography>
                </Stack>
              </CardContent>

              <CardActions sx={{ mt: 2 }}>
                <Button variant="contained" color="primary" fullWidth onClick={() => handleOpen(gig)}>
                  Apply Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Apply Now Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Apply for Gig</DialogTitle>
        <DialogContent>
          {selectedGig && (
            <>
              <Typography variant="h6" fontWeight="bold" mb={1}>
                {selectedGig.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" mb={2}>
                {selectedGig.employer}
              </Typography>
              <Typography variant="body2" mb={2}>
                Are you sure you want to apply for this opportunity?
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

export default Gigs;
