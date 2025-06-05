import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Settings, Logout } from "@mui/icons-material";
import { FaComments } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeMode } from "./ThemeContext";
import { useNavigate } from "react-router-dom";
import CustomToggle from "./CustomToggle";

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { toggleMode, mode } = useThemeMode();
  const { logout, authUser } = useAuthStore();

  function handleLogout() {
    logout();
  }

  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FaComments size={20} />
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            component="div"
            sx={{ fontWeight: 500, cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
          >
            ChatFlow
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            gap: isMobile ? 1 : 2,
          }}
        >
          <IconButton
            color="inherit"
            onClick={() => {
              navigate("/settings");
            }}
          >
            <Settings fontSize="1rem" />
          </IconButton>
          {authUser && (
            <>
              <div
                style={{
                  position: "absolute",
                  left: "-4.5rem",
                  top: "-.3rem",
                }}
              >
                <CustomToggle onChange={toggleMode} checked={mode === "dark"} />
              </div>
              <Avatar
                onClick={() => {
                  navigate("/profile");
                }}
                src={authUser?.profilePic}
                sx={{ width: 32, height: 32, cursor: "pointer" }}
              />

              <IconButton color="inherit" onClick={handleLogout}>
                <Logout fontSize="small" />
              </IconButton>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
