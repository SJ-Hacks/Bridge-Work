import { Typography, Box, Button, Grid, Divider, Container } from '@mui/material';
import { WorkOutline, AssignmentTurnedIn, FavoriteBorder } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import helpingHands from "../assets/helping-hands.svg";
import blobShape from "../assets/blob.svg";
import Gigs from './Gigs'; // <-- import Gigs normally

const Home = () => {
  const theme = useTheme();

  const fullText = "Every journey forward begins with one step. Find work, rebuild hope, and create the future you deserve.";
  const [displayedText, setDisplayedText] = useState('');
  const [showGigs, setShowGigs] = useState(false); // <-- NEW STATE

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Box sx={{ position: 'relative', backgroundColor: 'backgroundLight.main', py: 10, overflow: 'hidden' }}>
        
        {/* Left Side Blob */}
        <Box
          component="img"
          src={blobShape}
          alt="Decorative Blob"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: { xs: '100px', md: '250px' },
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            opacity: 0.25,
          }}
        />

        {/* Main Content */}
        <Container maxWidth={false} disableGutters sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container alignItems="center">
            
            {/* Left Text */}
            <Grid item xs={12} md={6} sx={{ pl: { md: 45 }, pr: { md: 4 } }}>
              <Box sx={{ maxWidth: '500px', mx: { xs: 'auto', md: 0 }, textAlign: { xs: 'center', md: 'left' } }}>
                <Typography 
                  variant="h2" 
                  fontWeight="bold" 
                  mb={3}
                  sx={{ color: 'primary.main' }}
                >
                  Step into Stability and Opportunity
                </Typography>

                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  mb={4}
                  sx={{ minHeight: '96px' }}
                >
                  {displayedText}
                </Typography>

                {/* Buttons */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  
                  {/* Find Opportunities Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => setShowGigs(true)} // <-- NEW CHANGE
                    sx={{
                      textTransform: 'none',
                      px: 4,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)', 
                      },
                    }}
                  >
                    Find Opportunities
                  </Button>

                  {/* I Want to Help Button */}
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={() => console.log("Volunteering clicked")} // (can implement volunteering later)
                    sx={{
                      textTransform: 'none',
                      px: 4,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)', 
                      },
                    }}
                  >
                    I Want to Help
                  </Button>

                </Box>
              </Box>
            </Grid>

            {/* Right Image */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  height: '100%',
                  pr: { md: 10 },
                }}
              >
                <Box
                  component="img"
                  src={helpingHands}
                  alt="Helping Hands Illustration"
                  sx={{
                    maxWidth: '700px',
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* Navigation Section */}
      <Box mt={8} mb={2}>
        <Container maxWidth="xl">
          <Grid container spacing={0} justifyContent="space-around" alignItems="center">
            <Grid item xs={12} sm={4} textAlign="center">
              <Button
                startIcon={<WorkOutline />}
                variant="text"
                sx={{ fontSize: '1.1rem', color: 'black', textTransform: 'none' }}
                onClick={() => setShowGigs(true)} // <-- SAME here
              >
                Gigs
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} textAlign="center">
              <Button
                startIcon={<AssignmentTurnedIn />}
                variant="text"
                sx={{ fontSize: '1.1rem', color: 'black', textTransform: 'none' }}
                onClick={() => console.log('Full-time work clicked')}
              >
                Full-time work
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} textAlign="center">
              <Button
                startIcon={<FavoriteBorder />}
                variant="text"
                sx={{ fontSize: '1.1rem', color: 'black', textTransform: 'none' }}
                onClick={() => console.log('Volunteering clicked')}
              >
                Volunteering
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ mt: 2, borderColor: 'lightGrey.main' }} />
        </Container>
      </Box>

      {/* Conditionally render Gigs Section */}
      {showGigs && (
        <Box mt={8} mb={8}>
          <Gigs />
        </Box>
      )}
    </>
  );
};

export default Home;