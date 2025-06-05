import React from "react";
import { Box, Skeleton } from "@mui/material";

const SidebarSkeleton = () => {
  return (
    <Box
      sx={{
        minWidth: "15rem",
        height: "100%",
        bgcolor: "background.sidebar",
        borderRight: 1,
        borderColor: "divider",
        p: 2,
      }}
    >
      <Skeleton variant="text" width="80%" height={30} sx={{ mb: 2 }} />

      {[...Array(5)].map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          width="100%"
          height={40}
          sx={{ mb: 1, borderRadius: 1 }}
        />
      ))}
    </Box>
  );
};

export default SidebarSkeleton;
