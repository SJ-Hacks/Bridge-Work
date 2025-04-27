import { Container, Typography, Card, CardContent, Stack, Button, Divider, Box, Grid, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ListAltIcon from '@mui/icons-material/ListAlt';

const mockProfile = {
  name: 'Ashish Bhusal',
  email: 'ashish@example.com',
  points: 120,
  activities: [
    'Applied for Food Bank Helper',
    'Redeemed Hot Shower Pass',
    'Signed up for Community Park Cleanup',
  ],
};

const Profile = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: '#f9fafb', py: 8, minHeight: '100vh' }}>
      <Container>
        <Typography variant="h4" fontWeight="bold" color="primary" textAlign="center" mb={6}>
          Your Profile
        </Typography>

        <Grid container spacing={6}>
          {/* User Info */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, borderRadius: 4, boxShadow: 4 }}>
              <CardContent>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}>
                    {mockProfile.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{mockProfile.name}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {mockProfile.email}
                    </Typography>
                  </Box>
                </Stack>
                <Button variant="outlined" color="primary" sx={{ mt: 3 }}>
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Points Earned and Redeem Rewards */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, borderRadius: 4, boxShadow: 4 }}>
              <CardContent>
                <Stack spacing={2} alignItems="center">
                  <EmojiEventsIcon fontSize="large" color="primary" />
                  <Typography variant="h5" fontWeight="bold">
                    {mockProfile.points} Points Earned
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => navigate('/rewards')}>
                    Redeem Rewards
                  </Button>

                  {/* Link to Leaderboard */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    sx={{ mt: 2, cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => navigate('/leaderboard')}
                  >
                    See rank on the Leaderboard!
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Activities */}
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3, borderRadius: 4, boxShadow: 4 }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                  <ListAltIcon fontSize="large" />
                  <Typography variant="h6" fontWeight="bold">
                    Recent Activities
                  </Typography>
                </Stack>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={1}>
                  {mockProfile.activities.map((activity, index) => (
                    <Typography key={index} variant="body2">
                      • {activity}
                    </Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
