import { Box } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../shared/Nav";

export default function AppLayout() {
  return (
    <Box marginBottom="12">
      <Nav />
      <Outlet />
    </Box>
  );
}
