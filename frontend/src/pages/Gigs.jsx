import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigs } from "../store/gigsSlice";
import { createApplication } from "../store/applicationSlice";
import { useUser } from "../context/UserContext";


import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  Container,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// Helper function to split text nicely
const splitIntoLines = (text, maxLineLength = 50) => {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  words.forEach((word) => {
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

const Gigs = () => {
  const dispatch = useDispatch();
  const { user } = useUser();

  const { gigs, status } = useSelector((state) => state.gigs);
  const [open, setOpen] = useState(false);
  const [selectedGig, setSelectedGig] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchGigs());
  }, [dispatch]);

  const handleOpen = (gig) => {
    setSelectedGig(gig);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedGig(null);
  };

  const handleConfirmApply = () => {
    if (selectedGig) {
      dispatch(
        createApplication({
          job_id: selectedGig._id,
          applicant: user._id,
          poster: selectedGig.poster || user._id, // fallback to user if poster is not there
        })
      );
      setSnackbarOpen(true);
      handleClose();
    }
  };

  if (status === "loading") {
    return (
      <Container sx={{ mt: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (status === "failed") {
    return (
      <Container sx={{ mt: 8 }}>
        <Typography color="error">Failed to load gigs.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 8 }}>
      <Typography color="primary" gutterBottom textAlign="left" sx={{pb:{md:5}, pl:{md:14}}}>
        Gigs are temporary one-time or recurring jobs you can get hired for and paid by the hour.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {gigs.map((gig) => (
          <Grid item xs={12} sm={6} md={6} key={gig._id}>
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
                  {gig.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" mb={2}>
                  {gig.organization}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <MonetizationOnIcon fontSize="small" />
                  <Typography variant="body2">{gig.pay}</Typography>
                </Stack>

                <Stack direction="row" alignItems="flex-start" spacing={1} mb={1}>
                  <DescriptionIcon fontSize="small" sx={{ mt: "2px" }} />
                  <Stack>
                    {splitIntoLines(gig.description).map((line, index) => (
                      <Typography key={index} variant="body2">
                        {line}
                      </Typography>
                    ))}
                  </Stack>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <AccessTimeIcon fontSize="small" />
                  <Typography variant="body2">{gig.time || "Flexible"}</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <LocationOnIcon fontSize="small" />
                  <Typography variant="body2">{gig.location}</Typography>
                </Stack>
              </CardContent>

              <CardActions sx={{ mt: 2 }}>
                <Button variant="contained" color="primary" fullWidth onClick={() => handleOpen(gig)}>
                  Apply Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Apply Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Apply for Gig</DialogTitle>
        <DialogContent>
          {selectedGig && (
            <>
              <Typography variant="h6" fontWeight="bold" mb={1}>
                {selectedGig.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" mb={2}>
                {selectedGig.organization}
              </Typography>
              <Typography variant="body2" mb={2}>
                Are you sure you want to apply for this opportunity?
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmApply} color="primary" variant="contained">
            Confirm Apply
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)} sx={{ width: "100%" }}>
          Application submitted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Gigs;
