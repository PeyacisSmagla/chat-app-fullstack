import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { Password, PhotoCamera } from "@mui/icons-material";
import { useAuthStore } from "../store/useAuthStore";

const Profile = () => {
  const { authUser, isUpdateProfile, updateProfile } = useAuthStore();
  const { email, fullName, profilePic } = authUser || {};
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // const imageUrl = URL.createObjectURL(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          My Profile
        </Typography>

        <Box sx={{ position: "relative", display: "inline-block", mb: 3 }}>
          <Avatar
            src={selectedImage || profilePic}
            sx={{ width: 120, height: 120, mx: "auto" }}
          />
          <IconButton
            component="label"
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "background.paper",
              boxShadow: 1,
              "&:hover": { backgroundColor: "grey.100" },
            }}
            disabled={isUpdateProfile}
          >
            <PhotoCamera />
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleImageChange}
            />
          </IconButton>
        </Box>

        <Typography fullWidth>{email}</Typography>
        <Typography fullWidth>{fullName}</Typography>
      </Paper>
    </Container>
  );
};

export default Profile;
