import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import Signup from "./pages/Signup";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to={"/"} />}
        />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
