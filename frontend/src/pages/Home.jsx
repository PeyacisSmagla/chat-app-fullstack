import React from "react";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";
import NoChatSelected from "../components/NoChatSelected";

const Home = () => {
  const theme = useTheme();
  const { selectedUser } = useChatStore();

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper
        elevation={3}
        sx={{
          width: "80%",
          height: "80vh",
          display: "flex",
          overflow: "hidden",
          bgcolor: theme.palette.background.paper,
          boxShadow: theme.shadows[5],
        }}
      >
        <Sidebar />

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            bgcolor: theme.palette.background.default,
          }}
        >
          {selectedUser ? <ChatContainer /> : <NoChatSelected />}
        </Box>
      </Paper>
    </Box>
  );
};

export default Home;
