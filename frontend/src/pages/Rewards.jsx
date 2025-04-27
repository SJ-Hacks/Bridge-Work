import { useState } from 'react';
import { 
  Container, Typography, Grid, Card, CardContent, CardActions, Button, Snackbar, Alert, Stack
} from '@mui/material';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ShowerIcon from '@mui/icons-material/Shower';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import HotelIcon from '@mui/icons-material/Hotel';

// Static rewards data
const rewards = [
  {
    id: 1,
    title: '$10 Grocery Gift Card',
    points: 100,
    icon: <CardGiftcardIcon fontSize="large" />,
  },
  {
    id: 2,
    title: 'Hot Shower Pass',
    points: 50,
    icon: <ShowerIcon fontSize="large" />,
  },
  {
    id: 3,
    title: 'Bus Day Pass',
    points: 30,
    icon: <DirectionsBusIcon fontSize="large" />,
  },
  {
    id: 4,
    title: 'One Night Shelter Stay',
    points: 200,
    icon: <HotelIcon fontSize="large" />,
  },
];

const Rewards = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleRedeem = () => {
    setSnackbarOpen(true);
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" color="primary" fontWeight="bold" textAlign="center" gutterBottom>
        Redeem Your Points
      </Typography>

      <Typography variant="h6" color="text.secondary" textAlign="center" mb={6}>
        Exchange your hard-earned points for rewards that support your journey!
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {rewards.map((reward) => (
          <Grid item xs={12} sm={6} md={4} key={reward.id}>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 4,
                boxShadow: 4,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: 8,
                },
              }}
            >
              <Stack spacing={2} alignItems="center">
                {reward.icon}
                <Typography variant="h6" fontWeight="bold" textAlign="center">
                  {reward.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {reward.points} Points
                </Typography>
              </Stack>

              <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleRedeem}>
                Redeem
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          Reward redeemed successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Rewards;
