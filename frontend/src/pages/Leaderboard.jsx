import { Container, Typography, Card, CardContent, Stack, Box, Avatar } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';

const leaderboard = [
  { name: 'Sophia R.', points: 180 },
  { name: 'Liam P.', points: 150 },
  { name: 'Ashish Bhusal', points: 120 },
];

const colors = ['gold', 'silver', '#cd7f32']; // Gold, Silver, Bronze colors for Top 3

const Leaderboard = () => {
  return (
    <Box sx={{ backgroundColor: '#f9fafb', py: 8, minHeight: '100vh' }}>
      <Container>
        <Typography variant="h4" fontWeight="bold" color="primary" textAlign="center" mb={4}>
          Top Contributors
        </Typography>
        <Typography variant="h6" color="text.secondary" textAlign="center" mb={6}>
          Earn points, rise in ranks, unlock opportunities!
        </Typography>

        <Stack spacing={4}>
          {leaderboard.map((user, index) => (
            <Card key={index} sx={{ p: 3, borderRadius: 4, boxShadow: 4 }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: colors[index] || 'primary.main' }}>
                    <StarIcon />
                  </Avatar>
                  <Typography variant="h6">{user.name}</Typography>
                </Stack>
                <Typography variant="h6" fontWeight="bold">
                  {user.points} pts
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default Leaderboard;
