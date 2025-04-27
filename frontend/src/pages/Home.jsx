import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h2" gutterBottom>
        Welcome to BridgeWorks
      </Typography>
      <Typography variant="h5" gutterBottom>
        Empowering Lives through Gigs and Goodwill
      </Typography>
      <Button variant="contained" color="primary" size="large" component={Link} to="/gigs" sx={{ m: 2 }}>
        Find Gigs
      </Button>
      <Button variant="outlined" color="primary" size="large" component={Link} to="/rewards" sx={{ m: 2 }}>
        View Rewards
      </Button>
    </Container>
  );
};

export default Home;
