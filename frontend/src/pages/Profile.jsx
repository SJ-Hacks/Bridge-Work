import {useState} from 'react';
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
import {useNavigate} from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import jsPDF from 'jspdf'; // ✅ import jsPDF

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

const mockResumeText = `
Ashish Bhusal
Email: ashish@example.com

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
`;

import {useEffect} from 'react';
import API from '../api/api'; // Adjust the path if needed

const Profile = () => {
    const navigate = useNavigate();
    const [loadingResume, setLoadingResume] = useState(false);
    const [resumeText, setResumeText] = useState('');
    const [activities, setActivities] = useState([]);
    const [loadingActivities, setLoadingActivities] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await API.get('/api/application/?selected=true');

                // Replace with actual applicant ID
                // Assuming response.data is an array of applications
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
        setResumeText(mockResumeText);
    };
    const handleDownloadResume = () => {
        const doc = new jsPDF();
        const lines = doc.splitTextToSize(resumeText, 180); // Auto line wrapping
        doc.setFont('Helvetica');
        doc.setFontSize(12);
        doc.text(lines, 10, 20);
        doc.save('resume.pdf');
    };

    return (
        <Box sx={{backgroundColor: '#f9fafb', py: 8, minHeight: '100vh'}}>
            <Container>
                <Typography variant="h4" fontWeight="bold" color="primary" textAlign="center" mb={6}>
                    Your Profile
                </Typography>

                <Grid container spacing={6}>
                    {/* User Info */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{p: 3, borderRadius: 4, boxShadow: 4}}>
                            <CardContent>
                                <Stack direction="row" spacing={3} alignItems="center">
                                    <Avatar sx={{width: 64, height: 64, bgcolor: 'primary.main'}}>
                                        {mockProfile.name.charAt(0)}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h6">{mockProfile.name}</Typography>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            {mockProfile.email}
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Button variant="outlined" color="primary" sx={{mt: 3}}>
                                    Edit Profile
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Points Earned and Redeem */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{p: 3, borderRadius: 4, boxShadow: 4}}>
                            <CardContent>
                                <Stack spacing={2} alignItems="center">
                                    <EmojiEventsIcon fontSize="large" color="primary"/>
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
                                        sx={{mt: 2, cursor: 'pointer', textDecoration: 'underline'}}
                                        onClick={() => navigate('/leaderboard')}
                                    >
                                        See rank on Leaderboard!
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Recent Activities */}
                    {/* Recent Activities */}
                    <Grid item xs={12}>
                        <Card sx={{p: 3, borderRadius: 4, boxShadow: 4}}>
                            <CardContent>
                                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                                    <ListAltIcon fontSize="large"/>
                                    <Typography variant="h6" fontWeight="bold">
                                        Recent Activities
                                    </Typography>
                                </Stack>
                                <Divider sx={{mb: 2}}/>
                                {loadingActivities ? (
                                    <Stack alignItems="center">
                                        <CircularProgress/>
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
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Generate Resume Section */}
                    <Grid item xs={12}>
                        <Card sx={{p: 3, borderRadius: 4, boxShadow: 4}}>
                            <CardContent>
                                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                                    <DescriptionIcon fontSize="large"/>
                                    <Typography variant="h6" fontWeight="bold">
                                        Resume Builder
                                    </Typography>
                                </Stack>
                                <Divider sx={{mb: 2}}/>

                                {loadingResume ? (
                                    <Stack alignItems="center">
                                        <CircularProgress/>
                                        <Typography variant="body2" color="text.secondary" mt={2}>
                                            Generating your personalized resume...
                                        </Typography>
                                    </Stack>
                                ) : resumeText ? (
                                    <Box sx={{
                                        whiteSpace: 'pre-line',
                                        backgroundColor: '#fff',
                                        p: 3,
                                        borderRadius: 2,
                                        boxShadow: 2
                                    }}>
                                        <Typography variant="body2" sx={{fontFamily: 'monospace'}}>
                                            {resumeText}
                                        </Typography>

                                        {/* Download Button */}
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            sx={{mt: 3}}
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
                            </CardContent>
                        </Card>
                    </Grid>


                </Grid>
            </Container>
        </Box>
    );
};

export default Profile;
