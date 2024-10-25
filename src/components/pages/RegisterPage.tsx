import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function RegisterPage() {
  return (
    <Box
      background="white"
      width="full"
      minWidth="400px"
      rounded="lg"
      paddingX="8"
      paddingY="10"
    >
      <VStack>
        <Heading size="md">Create your account</Heading>
        <Text color="subtle" marginBottom="4" fontSize="sm">
          Please enter your details
        </Text>

        <FormControl isInvalid={false} marginBottom="2">
          <FormLabel fontSize="sm">Username</FormLabel>
          <Input type="text" />
          <FormErrorMessage>Username is required.</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={false} marginBottom="4">
          <FormLabel fontSize="sm">Password</FormLabel>
          <Input type="password" />
          <FormErrorMessage>Password is required.</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={false} marginBottom="4">
          <FormLabel fontSize="sm">Confirm Password</FormLabel>
          <Input type="password" />
          <FormErrorMessage>Password is required.</FormErrorMessage>
        </FormControl>

        <Button colorScheme="blue" width="full" marginBottom="1">
          Register
        </Button>

        <Text fontSize="sm">
          Already have an account?
          <Link marginLeft="1" color="brand" as={RouterLink} to="/auth/login">
            Login
          </Link>
        </Text>
      </VStack>
    </Box>
  );
}
