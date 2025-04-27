import {useState} from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Stack,
    Snackbar,
    Alert,
    MenuItem,
    Grid,
    Box,
    Card,
    CardContent,
    Divider,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import API from '../api/api'; // Adjust the path if needed

const jobTypes = [
    {label: 'One-time', value: 'one-time'},
    {label: 'Recurring', value: 'recurring'},
];

const tagOptions = ['Job', 'Volunteer', 'Gig'];

const PostJob = () => {
    const [form, setForm] = useState({
        title: '',
        employer: '',
        description: '',
        pay: '',
        time: '',
        type: '',
        location: '',
        tags: [],
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    };

    const handleTagChange = (tag) => {
        setForm((prev) => ({
            ...prev,
            tags: prev.tags.includes(tag)
                ? prev.tags.filter((t) => t !== tag)
                : [...prev.tags, tag],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                title: form.title,
                employer: form.employer,             // ✅ Add employer
                description: form.description,
                pay: Number(form.pay),
                time: form.time,                      // ✅ Add time
                location: form.location,
                type: form.type,                      // ✅ Add type
                tags: form.tags,                      // ✅ Add tags
                is_active: true,                      // default true
                job_poster: localStorage.getItem('userId'),
            };

            const response = await API.post('/api/job', payload);

            console.log('Job posted successfully:', response.data);
            setSnackbarOpen(true);
            setForm({
                title: '',
                employer: '',
                description: '',
                pay: '',
                time: '',
                type: '',
                location: '',
                tags: [],
            });
        } catch (error) {
            console.error('Error posting job:', error.response?.data || error.message);
        }
    };

    return (
        <Box sx={{backgroundColor: '#f9fafb', py: 8, minHeight: '100vh'}}>
            <Container maxWidth="md">
                <Typography variant="h4" fontWeight="bold" color="primary" textAlign="center" mb={6}>
                    Let's Create an Opportunity
                </Typography>

                <Card sx={{p: 4, borderRadius: 4, boxShadow: 4}}>
                    <CardContent component="form" onSubmit={handleSubmit}>
                        {/* Job Info */}
                        <Typography variant="h6" mb={2} fontWeight="bold">
                            Job Info
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="title"
                                    label="Job Title"
                                    value={form.title}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="employer"
                                    label="Employer Name"
                                    value={form.employer}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>

                        <Box mt={4}>
                            <TextField
                                name="description"
                                label="Job Description"
                                value={form.description}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={4}
                                required
                            />
                        </Box>

                        <Divider sx={{my: 4}}/>

                        {/* Work Details */}
                        <Typography variant="h6" mb={2} fontWeight="bold">
                            Work Details
                        </Typography>

                        <Grid container spacing={3}>
                            {/* Row 1 */}
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="pay"
                                    label="Pay (e.g., $10/hr, Volunteer)"
                                    value={form.pay}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="time"
                                    label="Work Hours / Timing"
                                    value={form.time}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>

                            {/* Row 2 */}
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="location"
                                    label="Location"
                                    value={form.location}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="type"
                                    select
                                    label="Job Type"
                                    value={form.type}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                >
                                    {jobTypes.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>

                        {/* Tags */}
                        <Box mt={4}>
                            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                                Tags
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                {tagOptions.map((tag) => (
                                    <FormControlLabel
                                        key={tag}
                                        control={
                                            <Checkbox
                                                checked={form.tags.includes(tag)}
                                                onChange={() => handleTagChange(tag)}
                                            />
                                        }
                                        label={tag}
                                    />
                                ))}
                            </Stack>
                        </Box>

                        {/* Submit */}
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            size="large"
                            sx={{mt: 5}}
                            fullWidth
                        >
                            Post Gig
                        </Button>
                    </CardContent>
                </Card>

                {/* Success Snackbar */}
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setSnackbarOpen(false)}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                >
                    <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{width: '100%'}}>
                        Gig posted successfully!
                    </Alert>
                </Snackbar>
            </Container>
        </Box>
    );
};

export default PostJob;
