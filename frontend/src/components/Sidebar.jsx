import { Box, Typography, Avatar } from "@mui/material";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import SidebarSkeleton from "./SideBarSkeleton";
import { useTheme } from "@emotion/react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const theme = useTheme();
  const { getUsers, setSelectedUser, isUsersLoading, selectedUser, users } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <Box
      sx={{
        width: "15rem",
        bgcolor: theme.palette.background.sidebar,
        borderRight: `1px solid ${theme.palette.divider}`,
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" color="primary" gutterBottom>
        Chats
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Online contacts
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          pr: 1,
        }}
      >
        {users?.length === 0 ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", mt: 4 }}
          >
            No users found.
          </Typography>
        ) : (
          users.map((user) => {
            const isSelected = selectedUser === user?._id;

            return (
              <Box
                key={user?._id}
                onClick={() => setSelectedUser(user)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 1,
                  borderRadius: 1,
                  mb: 1,
                  cursor: "pointer",
                  bgcolor: isSelected
                    ? theme.palette.action.selected
                    : "transparent",
                  "&:hover": {
                    bgcolor: theme.palette.action.hover,
                  },
                }}
              >
                <Avatar
                  src={user.profilePic}
                  alt={user.fullName}
                  sx={{ width: 40, height: 40, mr: 2 }}
                />
                <Box>
                  <Typography variant="body1" color="text.primary">
                    {user.fullName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {onlineUsers?.includes(user?._id) ? "Online" : "Offline"}
                  </Typography>
                </Box>
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
