import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFullTimeJobs, applyForFullTime } from "../store/fullTimeSlice";
import {
  Container, Typography, Grid, Card, CardContent, Button, Snackbar, Alert, CircularProgress, Stack
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const splitIntoLines = (text, maxLineLength = 50) => {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  words.forEach(word => {
    if ((currentLine + word).length <= maxLineLength) {
      currentLine += word + " ";
    } else {
      lines.push(currentLine.trim());
      currentLine = word + " ";
    }
  });

  if (currentLine.length > 0) {
    lines.push(currentLine.trim());
  }

  return lines;
};

const FullTime = () => {
  const dispatch = useDispatch();
  const { fullTimeJobs, status, applyStatus } = useSelector((state) => state.fulltime);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    dispatch(fetchFullTimeJobs());
  }, [dispatch]);

  useEffect(() => {
    if (applyStatus === "succeeded") {
      setOpenSnackbar(true);
    }
  }, [applyStatus]);

  const handleApply = (jobId) => {
    dispatch(applyForFullTime({ jobId }));
  };

  if (status === "loading") {
    return (
      <Container sx={{ mt: 8, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 8 }}>
    <Typography color="primary" gutterBottom textAlign="left" sx={{pb:{md:5}, pl:{md:14}}}>
    Full-time jobs are stable, professional employment opportunities to help you build your long-term career.
    </Typography>

      <Grid container spacing={4} justifyContent="center">
        {fullTimeJobs.map((job) => (
          <Grid item xs={12} sm={6} md={6} key={job._id}>
            <Card
              variant="outlined"
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 3,
                borderColor: "grey.300",
                p: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: 6,
                  transform: "translateY(-4px)",
                  borderColor: "primary.main",
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold" mb={0.5}>
                  {job.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" mb={2}>
                  {job.organization}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <MonetizationOnIcon fontSize="small" />
                  <Typography variant="body2" sx={{ fontSize: "1rem" }}>{job.pay ? `$${job.pay}` : "N/A"}</Typography>
                </Stack>

                <Stack direction="row" alignItems="flex-start" spacing={1} mb={1}>
                  <DescriptionIcon fontSize="small" sx={{ mt: "2px" }} />
                  <Stack>
                    {splitIntoLines(job.description).map((line, index) => (
                      <Typography key={index} variant="body2" sx={{ fontSize: "1rem" }}>
                        {line}
                      </Typography>
                    ))}
                  </Stack>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <LocationOnIcon fontSize="small" />
                  <Typography variant="body2" sx={{ fontSize: "1rem" }}>{job.location}</Typography>
                </Stack>
              </CardContent>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => handleApply(job._id)}
                disabled={applyStatus === "loading"}
              >
                {applyStatus === "loading" ? <CircularProgress size={20} /> : "Apply Now"}
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setOpenSnackbar(false)} sx={{ width: "100%" }}>
          Application submitted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FullTime;
