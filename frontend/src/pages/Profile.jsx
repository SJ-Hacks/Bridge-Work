import { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Card,
    CardContent,
    Stack,
    Button,
    Divider,
    Box,
    Grid,
    Avatar,
    CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import jsPDF from 'jspdf';
import API from '../api/api';

const Profile = () => {
    const navigate = useNavigate();
    const [loadingResume, setLoadingResume] = useState(false);
    const [resumeText, setResumeText] = useState('');
    const [activities, setActivities] = useState([]);
    const [loadingActivities, setLoadingActivities] = useState(true);

    const fullName = localStorage.getItem('userFullName') || 'User';
    const email = localStorage.getItem('email') || 'No Email Provided';
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await API.get(`/api/application/?selected=true&applicant=${userId}`);
                const applications = response.data;
                const activitiesWithJobTitles = [];

                for (const app of applications) {
                    try {
                        const jobResponse = await API.get(`/api/job/${app.job_id}`);
                        activitiesWithJobTitles.push(`Applied for ${jobResponse.data.title || 'a Position'}`);
                    } catch (error) {
                        console.error('Error fetching job title for application:', error);
                        activitiesWithJobTitles.push('Applied for a Position');
                    }
                }
                setActivities(activitiesWithJobTitles);
            } catch (error) {
                console.error('Error fetching applications:', error);
                setActivities([]);
            } finally {
                setLoadingActivities(false);
            }
        };
        fetchApplications();
    }, []);

    const handleGenerateResume = () => {
        setResumeText(`
${fullName}
Email: ${email}

Summary:
Motivated worker with hands-on experience in community service, event management, and public beautification projects. Reliable, team-oriented, and committed to making a difference.

Skills:
- Cleaning and Public Maintenance
- Event Setup and Support
- Food Distribution and Packaging
- Team Collaboration

Work Experience:
- Street Beautification: Assisted in maintaining city aesthetics and cleanliness.
- Food Bank Helper: Supported food packaging and distribution to families.
- Community Event Setup: Helped manage events, setting up essential facilities.

Community Contribution:
- Over 120 Points Earned
- 60+ Volunteering Hours
        `.trim());
    };

    const handleDownloadResume = () => {
        const doc = new jsPDF();
        const lines = doc.splitTextToSize(resumeText, 180);
        doc.setFont('Helvetica');
        doc.setFontSize(12);
        doc.text(lines, 10, 20);
        doc.save('resume.pdf');
    };

    return (
        <Box sx={{ backgroundColor: '#f9fafb', py: 8, minHeight: '100vh' }}>
            <Container maxWidth="md">
                <Card sx={{ p: 5, borderRadius: 4, boxShadow: 4 }}>
                    <CardContent>

                        {/* Profile Info */}
                        <Stack direction="row" spacing={3} alignItems="center" mb={4}>
                            <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
                                {fullName.charAt(0)}
                            </Avatar>
                            <Box>
                                <Typography variant="h5" fontWeight="bold" textAlign="left">{fullName}</Typography>
                                <Typography variant="body2" color="text.secondary" textAlign="left">{email}</Typography>
                            </Box>
                        </Stack>

                        <Divider sx={{ my: 4 }} />

                        {/* Points Section */}
                        <Stack spacing={2} alignItems="flex-start" mb={6}>
                            <EmojiEventsIcon fontSize="large" color="primary" />
                            <Typography variant="h5" fontWeight="bold">
                                120 Points Earned
                            </Typography>
                            <Button variant="contained" color="primary" onClick={() => navigate('/rewards')}>
                                Redeem Rewards
                            </Button>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 2, cursor: 'pointer', textDecoration: 'underline' }}
                                onClick={() => navigate('/leaderboard')}
                            >
                                See rank on Leaderboard!
                            </Typography>
                        </Stack>

                        <Divider sx={{ my: 4 }} />

                        {/* Recent Activities */}
                        <Stack spacing={2} mb={6} alignItems="flex-start">
                            <Stack direction="row" spacing={2} alignItems="center">
                                <ListAltIcon fontSize="large" />
                                <Typography variant="h6" fontWeight="bold">
                                    Recent Activities
                                </Typography>
                            </Stack>
                            {loadingActivities ? (
                                <Stack alignItems="center">
                                    <CircularProgress />
                                    <Typography variant="body2" color="text.secondary" mt={2}>
                                        Loading activities...
                                    </Typography>
                                </Stack>
                            ) : activities.length > 0 ? (
                                <Stack spacing={1}>
                                    {activities.map((activity, index) => (
                                        <Typography key={index} variant="body2">
                                            • {activity}
                                        </Typography>
                                    ))}
                                </Stack>
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    No recent activities yet.
                                </Typography>
                            )}
                        </Stack>

                        <Divider sx={{ my: 4 }} />

                        {/* Resume Builder */}
                        <Stack spacing={2} alignItems="flex-start">
                            <Stack direction="row" spacing={2} alignItems="center">
                                <DescriptionIcon fontSize="large" />
                                <Typography variant="h6" fontWeight="bold">
                                    Resume Builder
                                </Typography>
                            </Stack>
                            {loadingResume ? (
                                <Stack alignItems="center">
                                    <CircularProgress />
                                    <Typography variant="body2" color="text.secondary" mt={2}>
                                        Generating your personalized resume...
                                    </Typography>
                                </Stack>
                            ) : resumeText ? (
                                <Box sx={{ whiteSpace: 'pre-line', backgroundColor: '#fff', p: 3, borderRadius: 2, boxShadow: 2, width: '100%' }}>
                                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                        {resumeText}
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        sx={{ mt: 3 }}
                                        onClick={handleDownloadResume}
                                    >
                                        Download as PDF
                                    </Button>
                                </Box>
                            ) : (
                                <Button variant="contained" color="primary" onClick={handleGenerateResume}>
                                    Generate My Resume
                                </Button>
                            )}
                        </Stack>

                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default Profile;