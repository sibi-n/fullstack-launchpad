import { Center, Heading, HStack, Image, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "store";

export function AuthLayout({ children }: React.PropsWithChildren) {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user]);

  return (
    <Center minHeight="100dvh" background="gray.100">
      <VStack>
        <HStack marginBottom="8">
          <Image
            height="10"
            width="10"
            rounded="md"
            src="/logo.png"
            alt="RailEase Logo"
          />

          <Heading as="h1" size="lg" marginLeft="1">
            RailEase
          </Heading>
        </HStack>

        <Outlet />
      </VStack>
    </Center>
  );
}
