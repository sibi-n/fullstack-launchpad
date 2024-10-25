import { Box } from "@chakra-ui/react";
import { Nav } from "components/shared";
import React from "react";
import { Outlet } from "react-router-dom";

export function AppLayout({ children }: React.PropsWithChildren) {
  return (
    <Box marginBottom="12">
      <Nav />
      <Outlet />
    </Box>
  );
}
