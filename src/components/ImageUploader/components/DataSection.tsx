import React from "react";
import { Box, Typography } from "@mui/material";

export const DataSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <Box mb={3}>
    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
      {title}
    </Typography>
    <Box pl={1}>{children}</Box>
  </Box>
);
