import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: '90vh',
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 4,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h2" color="primary" gutterBottom fontWeight="bold">
          Empowering Lives through Gigs and Goodwill
        </Typography>

        <Typography variant="h5" color="secondary" paragraph>
          BridgeWorks connects people seeking opportunities with those offering them — building trust, dignity, and a path to a better future.
        </Typography>

        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/gigs"
          >
            Find Gigs
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            component={Link}
            to="/rewards"
          >
            View Rewards
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
