import { AppBar, Toolbar, Typography, Button, Box, Container, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const [firstName, setFirstName] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem('userFirstName');
    console.log("NavBar useEffect -> storedName:", storedName); // 🪵 logging the localStorage value
    if (storedName) {
      setFirstName(storedName);
    }
  }, []);

  console.log("NavBar Render -> firstName state:", firstName); // 🪵 logging the current state

  return (
    <AppBar position="static" elevation={0} color="transparent" sx={{ backgroundColor: 'background.default' }}>
      <Box sx={{ width: '100%', backgroundColor: 'background.default' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            
            {/* Title - BridgeWorks */}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textTransform: 'none',
                color: 'primary.main',
                textDecoration: 'none',
              }}
            >
              BridgeWorks
            </Typography>

            {/* Right side Buttons */}
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Button
                color="inherit"
                component={Link}
                to="/gigs"
                sx={{ textTransform: 'none', color: 'black' }}
              >
                Services
              </Button>

              {firstName ? (
  <Button
    color="inherit"
    sx={{ textTransform: 'none', color: 'black', fontWeight: 'bold' }}
    component={Link}
    to="/profile"
  >
    Hi, {firstName}
            </Button>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/signin"
                sx={{ textTransform: 'none', color: 'black' }}
              >
                Sign In / Sign Up
              </Button>

              <Button
                variant="outlined"
                component={Link}
                to="/signin"
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  borderWidth: 1,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                }}
              >
                Become a Job Provider
              </Button>
            </>
          )}
            </Box>
          </Toolbar>

          <Divider sx={{ borderColor: 'lightGray.main' }} />
        </Container>
      </Box>
    </AppBar>
  );
};

export default NavBar;