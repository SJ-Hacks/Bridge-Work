import { Typography, Box, Button, Grid, Divider, Container } from '@mui/material';
import { WorkOutline, AssignmentTurnedIn, FavoriteBorder } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import helpingHands from "../assets/helping-hands.svg";
import blobShape from "../assets/blob.svg";
import Gigs from './Gigs';
import FullTime from './FullTime';
import Volunteer from './Volunteering';

const Home = () => {
  const theme = useTheme();
  const navRef = useRef(null);

  const fullText = "Every journey forward begins with one step. Find work, rebuild hope, and create the future you deserve.";
  const [displayedText, setDisplayedText] = useState('');
  const [sectionToShow, setSectionToShow] = useState('gigs');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);
  

  const scrollToNav = () => {
    if (navRef.current) {
      navRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleShowGigs = () => {
    if (sectionToShow !== 'gigs') {
      setSectionToShow('gigs');
      setTimeout(scrollToNav, 100);
    } else {
      scrollToNav();
    }
  };

  const handleShowFullTime = () => {
    setSectionToShow('fulltime');
    setTimeout(scrollToNav, 100);
  };

  const handleShowVolunteer = () => {
    setSectionToShow('volunteer');
    setTimeout(scrollToNav, 100);
  };

  return (
    <>
      {/* Hero Section */}
      <Box sx={{ position: 'relative', backgroundColor: 'backgroundLight.main', py: 10, overflow: 'hidden' }}>
        {/* Blob */}
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
                <Typography variant="h2" fontWeight="bold" mb={3} sx={{ color: 'primary.main' }}>
                  Step into Stability and Opportunity
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={4} sx={{ minHeight: '96px' }}>
                  {displayedText}
                </Typography>

                {/* Buttons */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleShowGigs}
                    sx={{
                      textTransform: 'none',
                      px: 4,
                      transition: 'transform 0.3s ease',
                      '&:hover': { transform: 'translateY(-2px)' },
                    }}
                  >
                    Find Opportunities
                  </Button>

                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={handleShowVolunteer}
                    sx={{
                      textTransform: 'none',
                      px: 4,
                      transition: 'transform 0.3s ease',
                      '&:hover': { transform: 'translateY(-2px)' },
                    }}
                  >
                    I Want to Help
                  </Button>
                </Box>
              </Box>
            </Grid>

            {/* Right Image */}
            <Grid item xs={12} md={6}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                height: '100%',
                pr: { md: 10 },
              }}>
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
      <Box ref={navRef} mt={8} mb={2}>
        <Container maxWidth="xl">
          <Grid container spacing={0} justifyContent="space-around" alignItems="center">
            {/* Gigs Button */}
            <Grid item xs={12} sm={4} textAlign="center">
              <Button
                startIcon={<WorkOutline />}
                variant="text"
                onClick={handleShowGigs}
                sx={{
                  fontSize: '1.1rem',
                  color: 'black',
                  textTransform: 'none',
                  borderBottom: sectionToShow === 'gigs' ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
                  borderRadius: 0,
                  pb: 1,
                }}
              >
                Gigs
              </Button>
            </Grid>

            {/* Full-time work Button */}
            <Grid item xs={12} sm={4} textAlign="center">
              <Button
                startIcon={<AssignmentTurnedIn />}
                variant="text"
                onClick={handleShowFullTime}
                sx={{
                  fontSize: '1.1rem',
                  color: 'black',
                  textTransform: 'none',
                  borderBottom: sectionToShow === 'fulltime' ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
                  borderRadius: 0,
                  pb: 1,
                }}
              >
                Full-time work
              </Button>
            </Grid>

            {/* Volunteering Button */}
            <Grid item xs={12} sm={4} textAlign="center">
              <Button
                startIcon={<FavoriteBorder />}
                variant="text"
                onClick={handleShowVolunteer}
                sx={{
                  fontSize: '1.1rem',
                  color: 'black',
                  textTransform: 'none',
                  borderBottom: sectionToShow === 'volunteer' ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
                  borderRadius: 0,
                  pb: 1,
                }}
              >
                Volunteering
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ mt: 2, borderColor: 'lightGrey.main' }} />
        </Container>
      </Box>

      {/* Section Display */}
      {sectionToShow === 'gigs' && (
        <Box mt={8} mb={8}>
          <Gigs />
        </Box>
      )}
      {sectionToShow === 'fulltime' && (
        <Box mt={8} mb={8}>
          <FullTime />
        </Box>
      )}
      {sectionToShow === 'volunteer' && (
        <Box mt={8} mb={8}>
          <Volunteer />
        </Box>
      )}
    </>
  );
};

export default Home;