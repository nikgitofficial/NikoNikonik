import React from "react";
import { Box, Container, Typography, Divider } from "@mui/material";

const Terms = () => {
  return (
    <Box sx={{ bgcolor: "#f9fafb", py: 8 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
          Terms and Conditions
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Please read these terms and conditions carefully before using the Personal Media Manager platform.
        </Typography>

        <Divider sx={{ my: 4 }} />

        {/* Sections */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mt: 3 }}>
            1. Acceptance of Terms
          </Typography>
          <Typography color="text.secondary" paragraph>
            By accessing or using our platform, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, you should not use our services.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: "bold", mt: 3 }}>
            2. User Responsibilities
          </Typography>
          <Typography color="text.secondary" paragraph>
            Users are responsible for maintaining the confidentiality of their account credentials and for all activities that occur under their account. Users must not upload illegal, harmful, or unauthorized content.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: "bold", mt: 3 }}>
            3. Use of Services
          </Typography>
          <Typography color="text.secondary" paragraph>
            Personal Media Manager provides media storage and management services. You agree to use the platform only for lawful purposes and in accordance with these Terms.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: "bold", mt: 3 }}>
            4. Intellectual Property
          </Typography>
          <Typography color="text.secondary" paragraph>
            All content, designs, and software on this platform are the property of Personal Media Manager. Users retain ownership of their uploaded media but grant the platform the right to store and manage it.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: "bold", mt: 3 }}>
            5. Limitation of Liability
          </Typography>
          <Typography color="text.secondary" paragraph>
            Personal Media Manager is not liable for any damages, loss of data, or interruptions to the service. Users use the platform at their own risk.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: "bold", mt: 3 }}>
            6. Modifications to Terms
          </Typography>
          <Typography color="text.secondary" paragraph>
            We may update these Terms and Conditions periodically. Continued use of the platform constitutes acceptance of any changes.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: "bold", mt: 3 }}>
            7. Contact
          </Typography>
          <Typography color="text.secondary" paragraph>
            If you have any questions about these Terms and Conditions, please contact us at <strong>support@personalmediamanager.com</strong>.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Terms;
