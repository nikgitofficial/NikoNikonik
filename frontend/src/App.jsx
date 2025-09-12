import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { Box } from "@mui/material";
import { AuthContext } from "./context/AuthContext";
import Layout from "./layouts/Layout"; 
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import VideoUploader from "./pages/VideoUploader";
import MediaUploader from "./pages/MediaUploader";
import ImageUploader from "./pages/ImageUploader";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

// ✅ admin pages  with dasboard layouts
import AdminPage from "./pages/AdminPage";
import AdminSettings from "./pages/AdminSettings";
import AdminHomePage from "./pages/AdminHomePage";
import ManageUsers from "./pages/ManageUsers";
import Contacts  from "./pages/Contacts";
import AdminRatings from "./pages/AdminRatings";
import AdminSubscriptions from "./pages/AdminSubscriptions";

// public pages
import About from "./pages/About";
import Careers from "./pages/Careers";
import Community from "./pages/Community";
import Contact from "./pages/Contact";  
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import CookieBanner from "./components/CookieBanner";
import CookieSettings from "./pages/CookieSettings";
import Security from "./pages/Security";
import Sitemap from "./pages/Sitemap";
import Status from "./pages/Status";
import Docs from "./pages/Docs";
import Guides from "./pages/Guides";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import Analytics from "./pages/Analytics";
import WelcomePage from "./pages/WelcomePage";
import ForgotPassword from "./pages/ForgotPassword";

// ProtectedRoute
const ProtectedRoute = ({ user, children }) => {
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// Only allow admin users
const AdminRoute = ({ user, children }) => {
  if (!user) return <Navigate to="/login" replace />; // Not logged in
  if (user.role !== "admin") return <Navigate to="/dashboard/home" replace />; // Not admin
  return children;
};

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <BrowserRouter>
        <Routes>
          {/* Wrap everything in Layout */}
          <Route element={<Layout />}>
            {/* Public routes */}
            <Route
              path="/"
              element={
                user ? (
                  user.role === "admin" ? (
                    <Navigate to="/admin" />
                  ) : (
                    <Navigate to="/dashboard/home" />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={
                !user ? (
                  <Login />
                ) : (
                  <Navigate to={user.role === "admin" ? "/admin" : "/dashboard/home"} />
                )
              }
            />
            <Route
              path="/register"
              element={
                !user ? (
                  <Register />
                ) : (
                  <Navigate to={user.role === "admin" ? "/admin" : "/dashboard/home"} />
                )
              }
            />
            <Route
  path="/forgot-password"
  element={
    !user ? (
      <ForgotPassword />
    ) : (
      <Navigate to={user.role === "admin" ? "/admin" : "/dashboard/home"} />
    )
  }
/>
            <Route path="/about" element={!user ? <About /> : <Navigate to="/dashboard/home" />} />
            <Route path="/careers" element={!user ? <Careers /> : <Navigate to="/dashboard/home" />} />
            <Route path="/community" element={!user ? <Community /> : <Navigate to="/dashboard/home" />} />
            <Route path="/contact" element={!user ? <Contact /> : <Navigate to="/dashboard/home" />} />
            <Route path="/privacy" element={!user ? <Privacy /> : <Navigate to="/dashboard/home" />} />
            <Route path="/terms" element={!user ? <Terms /> : <Navigate to="/dashboard/home" />} />
            <Route path="/cookiebanner" element={!user ? <CookieBanner /> : <Navigate to="/dashboard/home" />} />
            <Route path="/cookiesettings" element={!user ? <CookieSettings /> : <Navigate to="/dashboard/home" />} />
            <Route path="/security" element={!user ? <Security /> : <Navigate to="/dashboard/home" />} />
            <Route path="/sitemap" element={!user ? <Sitemap /> : <Navigate to="/dashboard/home" />} />
            <Route path="/status" element={!user ? <Status /> : <Navigate to="/dashboard/home" />} />
            <Route path="/docs" element={!user ? <Docs /> : <Navigate to="/dashboard/home" />} />
            <Route path="/guides" element={!user ? <Guides /> : <Navigate to="/dashboard/home" />} />
            <Route path="/faq" element={!user ? <FAQ /> : <Navigate to="/dashboard/home" />} />
            <Route path="/blog" element={!user ? <Blog /> : <Navigate to="/dashboard/home" />} />
            <Route path="/analytics" element={!user ? <Analytics /> : <Navigate to="/dashboard/home" />} />
            <Route path="/welcome" element={!user ? <WelcomePage /> : <Navigate to="/dashboard/home" />} />

            {/* Dashboard layout with nested routes (normal users only) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute user={user}>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route path="home" element={<Home />} />
              <Route path="video-uploader" element={<VideoUploader />} />
              <Route path="media-uploader" element={<MediaUploader />} />
              <Route path="image-uploader" element={<ImageUploader />} />
              <Route path="profile-pic" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Admin-only route (with nested routes) */}
            <Route
              path="/admin"
              element={
                <AdminRoute user={user}>
                  <AdminPage />
                </AdminRoute>
              }
            >
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<AdminHomePage />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="ratings" element={<AdminRatings />} />
              <Route path="subscriptions" element={<AdminSubscriptions />} /> 
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
