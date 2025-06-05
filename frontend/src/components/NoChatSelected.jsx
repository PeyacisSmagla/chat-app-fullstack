import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const NoChatSelected = () => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      bgcolor={theme.palette.background.paper}
      color={theme.palette.text.secondary}
      textAlign="center"
      p={4}
    >
      <ChatBubbleOutlineIcon
        sx={{ fontSize: 60, mb: 2, color: theme.palette.primary.main }}
      />
      <Typography variant="h6" gutterBottom>
        No Chat Selected
      </Typography>
      <Typography variant="body2">
        Select a conversation from the sidebar to start chatting.
      </Typography>
    </Box>
  );
};

export default NoChatSelected;
