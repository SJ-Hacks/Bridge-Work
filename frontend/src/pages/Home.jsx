import { Container, Typography, Box, Button, TextField, Grid, Card, Stack } from '@mui/material';
import { Search as SearchIcon, WorkOutline, AssignmentTurnedIn, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <Container sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" mb={2}>
          Get Part Time / Full Time Jobs
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4}>
          Find quick gigs, work for your community, build your future
        </Typography>

        <Box display="flex" justifyContent="center" alignItems="center" mb={8}>
          <TextField
            placeholder="Search for jobs..."
            variant="outlined"
            size="small"
            sx={{ width: '50%', backgroundColor: 'white' }}
            InputProps={{
              endAdornment: <SearchIcon color="primary" />,
            }}
          />
        </Box>
      </Container>

      {/* Icon Features */}
      <Container sx={{ textAlign: 'center', mb: 8 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={4}>
            <WorkOutline fontSize="large" />
            <Typography variant="subtitle1" mt={1}>
              Find Gigs Easily
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <AssignmentTurnedIn fontSize="large" />
            <Typography variant="subtitle1" mt={1}>
              Apply in Seconds
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <FavoriteBorder fontSize="large" />
            <Typography variant="subtitle1" mt={1}>
              Support Community
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Explore Opportunities Section */}
      <Box sx={{ backgroundColor: '#f0f4f8', py: 8 }}>
        <Container>
          <Typography variant="h5" fontWeight="bold" textAlign="center" mb={4}>
            Explore Opportunities
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {/* Gigs Card */}
            <Grid item xs={12} sm={4} md={4}>
              <Card
                sx={{
                  height: 300,
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: 4,
                  boxShadow: 6,
                  backgroundColor: '#ffffff',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 12,
                  },
                }}
              >
                <WorkOutline fontSize="large" />
                <Typography variant="h6" fontWeight="bold" mt={2}>
                  Gigs
                </Typography>
                <Typography variant="body2" textAlign="center" mt={1}>
                  Quick, flexible jobs. Get hired fast and earn hourly.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => navigate('/gigs')}
                >
                  Browse Gigs
                </Button>
              </Card>
            </Grid>

            {/* Volunteering Work Card */}
            <Grid item xs={12} sm={4} md={4}>
              <Card
                sx={{
                  height: 300,
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: 4,
                  boxShadow: 6,
                  backgroundColor: '#ffffff',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 12,
                  },
                }}
              >
                <FavoriteBorder fontSize="large" />
                <Typography variant="h6" fontWeight="bold" mt={2}>
                  Volunteering Work
                </Typography>
                <Typography variant="body2" textAlign="center" mt={1}>
                  Help the community, gain skills, and earn rewards.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => navigate('/volunteering')}
                >
                  Browse Volunteering
                </Button>
              </Card>
            </Grid>

            {/* Full-Time Work Card */}
            <Grid item xs={12} sm={4} md={4}>
              <Card
                sx={{
                  height: 300,
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: 4,
                  boxShadow: 6,
                  backgroundColor: '#ffffff',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 12,
                  },
                }}
              >
                <AssignmentTurnedIn fontSize="large" />
                <Typography variant="h6" fontWeight="bold" mt={2}>
                  Full-Time Work
                </Typography>
                <Typography variant="body2" textAlign="center" mt={1}>
                  Find stable jobs and start your professional career.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => navigate('/fulltime')}
                >
                  Browse Full-Time
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;
