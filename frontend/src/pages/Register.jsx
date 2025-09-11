import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "../api/axios";
import Logo from "../assets/logo.png"; // your logo
import Slide1 from "../assets/slide1.jpg";
import Slide2 from "../assets/slide2.jpg";

const REGISTER_IMAGES = [Slide1, Slide2];

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });
  const [passwordValid, setPasswordValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const navigate = useNavigate();

  // Slideshow effect like login page
  useState(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % REGISTER_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "email") setEmailError("");
    if (name === "password") {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^]).{8,}$/;
      setPasswordValid(regex.test(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordValid) {
      setSnack({
        open: true,
        message:
          "❌ Password must be at least 8 characters, include letters, numbers, and special characters.",
        severity: "error",
      });
      return;
    }

    try {
      await axios.post("/auth/register", form);
      setSnack({
        open: true,
        message: "✅ Registration successful! Redirecting...",
        severity: "success",
      });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      if (err.response?.data?.msg === "Email already in use") {
        setEmailError("❌ Email already exists. Try another one.");
      } else {
        setSnack({
          open: true,
          message: "❌ Registration failed. Try again.",
          severity: "error",
        });
      }
    }
  };

  return (
    <>
      {/* Fullscreen split background like login */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          display: "flex",
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${Slide1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${Slide2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Box>

      {/* Logo + App Title above the form */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: "75%",
            top: "35%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          {/* Logo + App Title */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1,
              gap: 1.5,
            }}
          >
            
           
          </Box>
          
        </Box>

        {/* Register Form */}
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            position: "absolute",
            top: "50%",
            left: "75%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "rgba(255,255,255,0.95)",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                name="username"
                label="Username"
                value={form.username}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                required
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {form.password && (
                <Typography variant="caption" color={passwordValid ? "green" : "error"}>
                  {passwordValid
                    ? "✅ Strong password"
                    : "❌ Password must be 8+ chars, include letters, numbers, and special characters."}
                </Typography>
              )}

              <Button type="submit" variant="contained" size="large" fullWidth sx={{ py: 1.5 }}>
                Register
              </Button>

              <Typography variant="body2" textAlign="center" mt={1}>
                Already have an account?{" "}
                <span
                  style={{ color: "#1976d2", cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snack.severity} variant="filled">
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Register;
