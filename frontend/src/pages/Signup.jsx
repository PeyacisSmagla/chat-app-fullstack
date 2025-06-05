import { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const validateForm = (formData) => {
  const { fullName, email, password } = formData;
  if (!fullName.trim()) return toast.error("Full name is required");

  if (!email.trim()) return toast.error("Email is required");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return toast.error("Enter a valid email address");

  if (!password) return toast.error("Password is required");

  if (password.length < 6)
    return toast.error("Password must be at least 6 characters");

  return true;
};

export default function Signup() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isSignUp, signUp } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm(formData);
    if (success === true) signUp(formData);
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          width: "70%",
          overflow: "hidden",
          borderRadius: 2,
        }}
        elevation={3}
      >
        <Box
          sx={{
            display: isMobile ? "none" : "block",
            width: "50%",
            backgroundImage:
              'url("https://source.unsplash.com/600x800/?signup,technology")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Box sx={{ width: isMobile ? "100%" : "50%", padding: 4 }}>
          <Typography variant="h5" gutterBottom align="center">
            Create Account
          </Typography>

          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              size="small"
              label="Full Name"
              margin="dense"
              variant="outlined"
              sx={{ mb: 2 }}
              required
              value={formData.fullName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, fullName: e.target.value }))
              }
            />
            <TextField
              fullWidth
              size="small"
              label="Email"
              margin="dense"
              type="email"
              variant="outlined"
              sx={{ mb: 2 }}
              required
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <TextField
              fullWidth
              size="small"
              label="Password"
              margin="dense"
              type="password"
              variant="outlined"
              sx={{ mb: 2 }}
              required
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                py: 1,
                backgroundColor: "primary.main",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              {isSignUp ? "Loading..." : "Sign Up"}
            </Button>
          </Box>

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button
                  variant="text"
                  sx={{
                    color: "primary.main",
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  Login
                </Button>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
