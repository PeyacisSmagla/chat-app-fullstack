import React, { useState } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { login, isLogin } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();

    if (!formData.email) return toast.error("Email is required");
    if (!formData.password) return toast.error("Password is required");

    login(formData);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          width: "100%",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {!isMobile && (
          <Box
            sx={{
              width: "50%",
              backgroundImage:
                'url("https://source.unsplash.com/600x800/?technology,login")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}

        <Box
          sx={{
            width: isMobile ? "100%" : "50%",
            padding: isMobile ? 3 : 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Welcome Back 👋
          </Typography>
          <Typography
            variant="body2"
            align="center"
            sx={{ color: "text.secondary", mb: 3 }}
          >
            Please enter your login details
          </Typography>

          <Box component="form" onSubmit={handleLogin} noValidate>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              size="small"
              margin="dense"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              size="small"
              margin="dense"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              sx={{ mb: 1 }}
            />

            <Box sx={{ textAlign: "right", mb: 2 }}>
              <MuiLink
                component={Link}
                to="/forgot-password"
                underline="hover"
                color="primary"
                variant="body2"
                display="none"
              >
                Forgot password?
              </MuiLink>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: 1.2,
                textTransform: "none",
                fontWeight: "bold",
                backgroundColor: "primary.main",
              }}
            >
              {isLogin ? "Logging in..." : "Login"}
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2">
              Don’t have an account?{" "}
              <MuiLink
                component={Link}
                to="/signup"
                underline="none"
                sx={{ color: "primary.main", fontWeight: "bold" }}
              >
                Sign Up
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
