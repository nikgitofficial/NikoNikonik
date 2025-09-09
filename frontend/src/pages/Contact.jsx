import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button, Grid, Snackbar, Alert } from "@mui/material";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can connect this to backend API to send emails or save messages
    console.log(formData);
    setOpenSnackbar(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Box sx={{ bgcolor: "#f9fafb", py: 8 }}>
      <Container maxWidth="sm">
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
          Contact Us
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Have questions, feedback, or need support? Fill out the form below, and we'll get back to you promptly.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button type="submit" variant="contained" color="primary">
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Snackbar Notification */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Your message has been sent successfully!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Contact;
