import { useState, useContext, useEffect } from "react";
import Logo from "../assets/logo.png";
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Alert,
  Snackbar,
  CircularProgress,
  InputAdornment,
  IconButton,
  Modal,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

// ✅ Import your local images
import Slide1 from "../assets/slide3.jpg";
import Slide2 from "../assets/slide2.jpg";

// ✅ Multiple images for slideshow
const LOGIN_IMAGES = [Slide1, Slide2];

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard/home");
      }
    }
  }, [user, navigate]);

  // ✅ Image slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % LOGIN_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/auth/login", form, { withCredentials: true });
      const { accessToken, refreshToken } = res.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const me = await axios.get("/auth/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });

      setUser(me.data);
      localStorage.setItem("user", JSON.stringify(me.data));
      setSnackbarOpen(true);
      setOpenModal(false);

      // ✅ Redirect based on role
      if (me.data.role === "admin") {
        navigate("/admin"); // 🔑 Admin only → /admin
      } else {
        navigate("/dashboard/home"); // 👤 User → Dashboard
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Fullscreen split background */}
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

      {/* Login Section */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
        }}
      >
        {/* Logo + App Title */}
        <Box
          sx={{
            position: "absolute",
            left: "75%",
            top: "40%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1,
              gap: 1.5,
            }}
          >
            <Box component="img" src={Logo} alt="Logo" sx={{ height: 80, width: 80 }} />
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "darkgreen" }}>
              Niko Nikonik
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: "medium" }}>
            Welcome Back
          </Typography>
        </Box>

        {/* Login Button */}
        <Button
          variant="contained"
          onClick={() => setOpenModal(true)}
          sx={{
            width: 400,
            py: 1.5,
            position: "absolute",
            left: "75%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#FF8C00",
            "&:hover": { backgroundColor: "#FF7000" },
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Login
        </Button>

        {/* Back Button */}
        <Button
          variant="outlined"
          onClick={() => navigate("/welcome")}
          sx={{
            width: 200,
            py: 1.5,
            position: "absolute",
            left: "75%",
            top: "60%",
            transform: "translate(-50%, -50%)",
            borderColor: "gray",
            color: "gray",
            fontWeight: "bold",
          }}
        >
          Back
        </Button>
      </Box>

      {/* Modal with Login Form */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "rgba(255, 255, 255, 0.95)",
            borderRadius: 4,
            p: 4,
            boxShadow: 24,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="subtitle1" align="center" gutterBottom>
            Login to continue
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              name="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>
          </Box>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Don’t have an account?{" "}
            <Link to="/register" style={{ textDecoration: "none" }}>
              Register here
            </Link>
          </Typography>
        </Box>
      </Modal>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message="Login successful!"
      />
    </>
  );
};

export default Login;
