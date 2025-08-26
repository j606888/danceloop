import * as React from "react";
import MuiCircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CircularProgress({ value }: { value: number }) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        width: "50px",
        height: "50px",
      }}
    >
      <MuiCircularProgress variant="determinate" size={50} value={value} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: "text.secondary" }}
        >{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default CircularProgress;
