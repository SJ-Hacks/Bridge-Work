import { Container, Typography, Box, Button, Grid, Divider } from '@mui/material';
import { WorkOutline, AssignmentTurnedIn, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import helpingHands from "../assets/helping-hands.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <Box sx={{ position: 'relative', backgroundColor: '#f9fafb', py: 10, overflow: 'hidden' }}>
        
        {/* Decorative Blob Background */}
        <Box
          component="img"
          src="/blob.svg"   // Make sure blob.svg is inside your public/ folder
          alt="Background Blob"
          sx={{
            position: 'absolute',
            top: '-50px',
            left: '-100px',
            width: '500px',
            opacity: 0.2,
            zIndex: 1,
          }}
        />

        <Container maxWidth={false} disableGutters sx={{ px: { xs: 2, md: 10 }, position: 'relative', zIndex: 2 }}>
          <Grid container spacing={6} alignItems="center">
            
            {/* Left side - Text and Buttons */}
            <Grid item xs={12} md={6}>
              <Box sx={{ maxWidth: '500px', mx: { xs: 'auto', md: 0 }, textAlign: { xs: 'center', md: 'left' } }}>
                <Typography variant="h2" fontWeight="bold" mb={3}>
                  Step Into Stability and Opportunity
                </Typography>

                <Typography variant="body1" color="text.secondary" mb={4}>
                  Every journey forward begins with one step. Find work, rebuild hope, and create the future you deserve.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => navigate('/gigs')}
                    sx={{ textTransform: 'none', px: 4 }}
                  >
                    Find Opportunities
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={() => navigate('/volunteering')}
                    sx={{ textTransform: 'none', px: 4 }}
                  >
                    I Want to Help
                  </Button>
                </Box>
              </Box>
            </Grid>

            {/* Right side - Image */}
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <Box
                component="img"
                src={helpingHands}
                alt="Helping Hands Illustration"
                sx={{
                  width: '100%',
                  maxWidth: '480px',
                  height: 'auto',
                  objectFit: 'contain',
                  mr: { md: 0 }, // This keeps it flushed to right side on large screens
                }}
              />
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* Navigation Section - Gigs / Full-Time / Volunteering */}
      <Box mt={8} mb={2}>
        <Container maxWidth="xl">
          <Grid container spacing={0} justifyContent="space-around" alignItems="center">
            
            <Grid item xs={12} sm={4} textAlign="center">
              <Button
                startIcon={<WorkOutline />}
                variant="text"
                onClick={() => navigate('/gigs')}
                sx={{ fontSize: '1.1rem', color: 'black', textTransform: 'none' }}
              >
                Gigs
              </Button>
            </Grid>

            <Grid item xs={12} sm={4} textAlign="center">
              <Button
                startIcon={<AssignmentTurnedIn />}
                variant="text"
                onClick={() => navigate('/fulltime')}
                sx={{ fontSize: '1.1rem', color: 'black', textTransform: 'none' }}
              >
                Full-time work
              </Button>
            </Grid>

            <Grid item xs={12} sm={4} textAlign="center">
              <Button
                startIcon={<FavoriteBorder />}
                variant="text"
                onClick={() => navigate('/volunteering')}
                sx={{ fontSize: '1.1rem', color: 'black', textTransform: 'none' }}
              >
                Volunteering
              </Button>
            </Grid>

          </Grid>

          <Divider sx={{ mt: 2, borderColor: 'lightGrey.main' }} />
        </Container>
      </Box>
    </>
  );
};

export default Home;