import React from "react";
import { Box, Container, Typography, Divider } from "@mui/material";

const Privacy = () => {
  return (
    <Box sx={{ bgcolor: "#f9fafb", py: 8 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
          Privacy Policy
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when using our app.
        </Typography>

        <Divider sx={{ my: 4 }} />

        {/* Sections */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mt: 3 }}>
            1. Information We Collect
          </Typography>
          <Typography color="text.secondary" paragraph>
            We may collect personal information such as your name, email, and any media files you upload to our platform. This information is used solely to provide and improve our services.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: "bold", mt: 3 }}>
            2. How We Use Your Information
          </Typography>
          <Typography color="text.secondary" paragraph>
            Your data is used to provide you with access to your media, improve our services, and communicate important updates. We do not sell or share your personal information with third parties for marketing purposes.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: "bold", mt: 3 }}>
            3. Data Security
          </Typography>
          <Typography color="text.secondary" paragraph>
            We implement industry-standard security measures to protect your information. Uploaded media files are securely stored, and access is restricted to authorized personnel only.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: "bold", mt: 3 }}>
            4. User Rights
          </Typography>
          <Typography color="text.secondary" paragraph>
            You have the right to access, update, or delete your personal information. You can also request that we stop processing your data at any time.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: "bold", mt: 3 }}>
            5. Changes to This Policy
          </Typography>
          <Typography color="text.secondary" paragraph>
            We may update this Privacy Policy from time to time. We recommend reviewing this page periodically to stay informed about how we protect your information.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: "bold", mt: 3 }}>
            6. Contact Us
          </Typography>
          <Typography color="text.secondary" paragraph>
            If you have any questions about this Privacy Policy or how we handle your information, please contact us at <strong>support@personalmediamanager.com</strong>.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Privacy;
