import { Center, Heading, HStack, Image, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import logo from '../../assets/logo.png';

export function AuthLayout() {
  return (
    <Center minHeight="100dvh" background="gray.100">
      <VStack>
        <HStack marginBottom="8">
          <Image
            height="10"
            width="10"
            rounded="md"
            src={logo}
          />

          <Heading size="lg" marginLeft="1">
            RailEase
          </Heading>
        </HStack>

        <Outlet />
      </VStack>
    </Center>
  );
}

export default AuthLayout;