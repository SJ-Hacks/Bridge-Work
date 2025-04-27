import { useState } from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material'; // ⬅️ Added Paper for central box
import { GoogleLogin } from '@react-oauth/google';
import API from '../api/api'; // adjust path accordingly
import { useNavigate } from 'react-router-dom'; // ⬅️ Added for redirect after login

const SignInSignUp = () => {
  const [googleUser, setGoogleUser] = useState(null);
  const navigate = useNavigate(); // ⬅️ added useNavigate

  const handleGoogleSuccess = async (credentialResponse) => {
    const decoded = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
    console.log('Google profile:', decoded);

    try {
      console.log("Start off");
      const response = await API.post('/auth/google/login', {
        credential: credentialResponse.credential,
      });
      console.log('Server Response:', response.data);

      localStorage.setItem('jwtToken', response.data.access_token);
      localStorage.setItem('userRole', response.data.type);
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('email', response.data.email);

      const fullName = response.data.name || '';
      localStorage.setItem('userFullName', fullName);
      const firstName = fullName.split(' ')[0] || 'User';
      localStorage.setItem('userFirstName', firstName);
      setGoogleUser(decoded);

      if (response.data.type == 'job_poster')
        {
            window.location.href = '/post-job'
        }
        else {
            window.location.href = '/'
        }
    } catch (error) {
      console.error('Error calling backend:', error.response?.data || error.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'backgroundLight.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 5, textAlign: 'center', borderRadius: 3, backgroundColor: 'white' }}>
          {/* Center Box */}
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Welcome!
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            We're glad you're here. Please login to continue.
          </Typography>

          {/* Google Login Button */}
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default SignInSignUp;