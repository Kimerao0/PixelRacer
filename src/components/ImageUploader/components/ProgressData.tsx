import React from "react";
import { Typography, Box, LinearProgress } from "@mui/material";

const ProgressData: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  return (
    <Box component={"div"} sx={{ mb: 2 }}>
      <Typography variant="h6" sx={{ fontSize: 18 }}>
        {title}
      </Typography>
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          variant="determinate"
          value={(Number(value) / 700) * 100}
          sx={{
            height: 10,
            borderRadius: 5,
          }}
        />
      </Box>
    </Box>
  );
};

export default ProgressData;
