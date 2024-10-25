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
import { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formsubmitted, setFormSubmitted] = useState(false);

  function onLogin() {
    setFormSubmitted(true);
    console.log("useraname: " + username + ", password: " + password);
  }

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
        <Heading size="md">Welcome Back!</Heading>
        <Text color="subtle" marginBottom="4" fontSize="sm">
          Enter details to login
        </Text>

        <FormControl isInvalid={formsubmitted && !username} marginBottom="2">
          <FormLabel fontSize="sm">Username</FormLabel>
          <Input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <FormErrorMessage>Username is required.</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formsubmitted && !password} marginBottom="4">
          <FormLabel fontSize="sm">Password</FormLabel>
          <Input
            type={showPassword ? "text" : "password"}
            min={8}
            max={25}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <FormErrorMessage>Password is required.</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          width="full"
          marginBottom="1"
          onClick={onLogin}
        >
          Login
        </Button>

        <Text fontSize="sm">
          New user?
          <Link
            marginLeft="1"
            color="brand"
            as={RouterLink}
            to="/auth/register"
          >
            Register
          </Link>
        </Text>
      </VStack>
    </Box>
  );
}

export default LoginPage;
