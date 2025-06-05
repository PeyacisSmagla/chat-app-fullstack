import { Avatar, Box, Button, Typography } from "@mui/material";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          src={selectedUser.profilePic}
          alt={selectedUser.fullName}
          sx={{ width: 40, height: 40, mr: 2 }}
        />
        <Box>
          <Typography variant="body1" color="text.primary">
            {selectedUser.fullName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {onlineUsers?.includes(selectedUser?._id) ? "Online" : "Offline"}
          </Typography>
        </Box>
      </Box>
      <Button
        sx={{ alignSelf: "flex-end" }}
        onClick={() => setSelectedUser(null)}
      >
        ✖️
      </Button>
    </Box>
  );
};

export default ChatHeader;
