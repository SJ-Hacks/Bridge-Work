// src/pages/Volunteering.jsx

import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchVolunteers, applyForVolunteer } from "../store/volunteerSlice";
import { splitIntoLines } from "../utils/textUtils";

const Volunteering = () => {
  const dispatch = useDispatch();
  const { volunteers, status } = useSelector((state) => state.volunteer);

  useEffect(() => {
    dispatch(fetchVolunteers());
  }, [dispatch]);

  const handleApply = (volunteerId) => {
    dispatch(applyForVolunteer({ jobId: volunteerId }));
  };

  if (status === "loading") {
    return (
      <Container sx={{ mt: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 8 }}>
    <Typography color="primary" gutterBottom textAlign="left" sx={{pb:{md:5}, pl:{md:14}, pr:{md:14}}}>
      Volunteering lets you contribute to your community and earn reward points, which you can later redeem for exciting benefits.
    </Typography>

      <Grid container spacing={4} justifyContent="center">
        {volunteers.map((volunteer) => (
          <Grid item xs={12} sm={6} md={6} key={volunteer.id}>
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
                  {volunteer.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" mb={2}>
                  {volunteer.organization || "Unknown Organization"}
                </Typography>

                <Stack spacing={1} mb={1}>
                  {splitIntoLines(volunteer.description).map((line, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{ fontSize: "1rem" }}
                    >
                      {line}
                    </Typography>
                  ))}
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <Typography variant="body2" sx={{ fontSize: "1rem" }}>
                    {volunteer.location}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body2" sx={{ fontSize: "1rem" }}>
                    Points: {volunteer.points}
                  </Typography>
                </Stack>
              </CardContent>

              <CardActions sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleApply(volunteer.id)}
                >
                  Apply Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Volunteering;
