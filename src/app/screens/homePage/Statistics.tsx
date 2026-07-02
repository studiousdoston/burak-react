import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";

export default function Statistics() {
  return (
    <div className="static-frame">
      <Container>
        <Stack className="stat-info">
          <Stack className="stat-box">
            <Box className="stat-num">18</Box>
            <Box className="stat-text">Restaurant</Box>
          </Stack>
              <Divider height="64" width="2" bg="#e3c08d" />
          <Stack className="stat-box">
            <Box className="stat-num">8</Box>
            <Box className="stat-text">Experience</Box>
          </Stack>
              <Divider height="64" width="2" bg="#e3c08d" />
          <Stack className="stat-box">
            <Box className="stat-num">50+</Box>
            <Box className="stat-text">Menu</Box>
          </Stack>
             <Divider height="64" width="2" bg="#e3c08d" />
          <Stack className="stat-box">
            <Box className="stat-num">200+</Box>
            <Box className="stat-text">Clients</Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
