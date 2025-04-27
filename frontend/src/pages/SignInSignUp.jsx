import {useState} from 'react';
import {Container, Typography, Button, Box} from '@mui/material';
import {GoogleLogin} from '@react-oauth/google';
import API from '../api/api'; // adjust path accordingly

const SignInSignUp = () => {
    const [googleUser, setGoogleUser] = useState(null);
    const [roleSelected, setRoleSelected] = useState(null);

    const handleGoogleSuccess = async (credentialResponse) => {
        const decoded = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
        console.log('Google profile:', decoded);



        try {
            console.log("Start off")
            const response = await API.post('/auth/google/login', {
                credential: credentialResponse.credential,  // send the raw JWT
            });
            console.log('Server Response:', response.data);

            localStorage.setItem('jwtToken', response.data.access_token);
            localStorage.setItem('userRole', response.data.type);
            setGoogleUser(decoded);
            window.location.href = '/';
        } catch (error) {
            console.error('Error calling backend:', error.response?.data || error.message);
        }
    };

    const handleRoleSelect = (role) => {
        setRoleSelected(role);

        // Simulate JWT Creation
        const fakeJwtPayload = {
            email: googleUser?.email,
            name: googleUser?.name,
            role: role,
        };
        const fakeJwt = btoa(JSON.stringify(fakeJwtPayload));

        // Save to localStorage
        localStorage.setItem('jwtToken', fakeJwt);
        localStorage.setItem('userRole', role);

        alert(`Welcome ${googleUser?.name}! You are logged in as ${role}`);
        window.location.href = '/'; // Redirect to Home or Dashboard
    };

    return (
        <Container maxWidth="sm" sx={{mt: 12, textAlign: 'center'}}>
            {!googleUser ? (
                <>
                    <Typography variant="h4" fontWeight="bold" mb={4}>
                        {googleUser ? 'Welcome!' : 'Sign In / Sign Up'}
                    </Typography>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </>
            ) : (
                <>
                    <Typography variant="h5" fontWeight="bold" mb={3}>
                        Welcome {googleUser.name}!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mb={4}>
                        Select your role:
                    </Typography>
                    <Box display="flex" justifyContent="center" gap={3}>
                        <Button variant="contained" onClick={() => handleRoleSelect('Job Seeker')}
                                sx={{textTransform: 'none'}}>
                            I am a Job Seeker
                        </Button>
                        <Button variant="outlined" onClick={() => handleRoleSelect('Job Provider')}
                                sx={{textTransform: 'none'}}>
                            I am a Job Provider
                        </Button>
                    </Box>
                </>
            )}
        </Container>
    );
};

export default SignInSignUp;