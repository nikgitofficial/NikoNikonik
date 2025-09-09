import React from 'react';
import { Box, Grid, Typography, TextField, Button, IconButton, Divider } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';

// ✅ Import your local logo
import Logo from '../assets/logo.png'; // adjust the path if Footer.jsx is in another folder

const Footer = () => {
  const appPages = ['PublicHome', 'Dashboard', 'Login', 'Register', 'ForgotPassword', 'Profile', 'Settings'];
  const resourcesPages = ['Docs', 'Guides', 'FAQ', 'Blog', 'Analytics'];
  const companyPages = ['About', 'Careers', 'Community', 'Contact'];
  const legalPages = ['Privacy', 'Terms', 'CookieBanner', 'CookieSettings', 'Security', 'Sitemap', 'Status'];

  return (
    <Box component="footer" sx={{ bgcolor: '#f9fafb', py: { xs: 6, sm: 10 }, px: { xs: 2, sm: 4, md: 8 } }}>
      <Grid container spacing={4} maxWidth="xl" mx="auto">
        {/* Logo & Description */}
        <Grid item xs={12} sm={6} lg={4}>
          <Box>
            <Box
              component="img"
              src={Logo} // ✅ Use the local logo
              alt="Logo"
              sx={{ height: 40, mb: 2 }}
            />
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              nt. Velit officia consequat duis enim velit mollit.
            </Typography>
            <Box>
              <IconButton aria-label="Facebook" color="primary"><Facebook /></IconButton>
              <IconButton aria-label="Twitter" color="primary"><Twitter /></IconButton>
              <IconButton aria-label="LinkedIn" color="primary"><LinkedIn /></IconButton>
              <IconButton aria-label="Instagram" color="primary"><Instagram /></IconButton>
            </Box>
          </Box>
        </Grid>

        {/* App Links */}
        <Grid item xs={6} sm={3} lg={2}>
          <Typography variant="overline" color="text.secondary" sx={{ mb: 2 }}>App</Typography>
          <Box>
            {appPages.map((page) => (
              <Typography
                key={page}
                component="a"
                href={`/${page}`}
                sx={{
                  display: 'block',
                  color: 'text.primary',
                  textDecoration: 'none',
                  mb: 1,
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {page}
              </Typography>
            ))}
          </Box>
        </Grid>

        {/* Resources Links */}
        <Grid item xs={6} sm={3} lg={2}>
          <Typography variant="overline" color="text.secondary" sx={{ mb: 2 }}>Resources</Typography>
          <Box>
            {resourcesPages.map((page) => (
              <Typography
                key={page}
                component="a"
                href={`/${page}`}
                sx={{
                  display: 'block',
                  color: 'text.primary',
                  textDecoration: 'none',
                  mb: 1,
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {page}
              </Typography>
            ))}
          </Box>
        </Grid>

        {/* Company Links */}
        <Grid item xs={6} sm={3} lg={2}>
          <Typography variant="overline" color="text.secondary" sx={{ mb: 2 }}>Company</Typography>
          <Box>
            {companyPages.map((page) => (
              <Typography
                key={page}
                component="a"
                href={`/${page}`}
                sx={{
                  display: 'block',
                  color: 'text.primary',
                  textDecoration: 'none',
                  mb: 1,
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {page}
              </Typography>
            ))}
          </Box>
        </Grid>

        {/* Legal Links */}
        <Grid item xs={6} sm={3} lg={2}>
          <Typography variant="overline" color="text.secondary" sx={{ mb: 2 }}>Legal</Typography>
          <Box>
            {legalPages.map((page) => (
              <Typography
                key={page}
                component="a"
                href={`/${page}`}
                sx={{
                  display: 'block',
                  color: 'text.primary',
                  textDecoration: 'none',
                  mb: 1,
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {page}
              </Typography>
            ))}
          </Box>
        </Grid>

        {/* Newsletter Subscription */}
        <Grid item xs={12} sm={12} lg={4}>
          <Typography variant="overline" color="text.secondary" sx={{ mb: 2 }}>Subscribe to newsletter</Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              type="email"
              label="Enter your email"
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary">Subscribe</Button>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4, borderColor: 'grey.300' }} />

      <Typography variant="body2" color="text.secondary" textAlign="center">
        © Copyright 2021, All Rights Reserved by Postcraft
      </Typography>
    </Box>
  );
};

export default Footer;
