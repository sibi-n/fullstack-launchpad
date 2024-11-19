import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  Link,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { TbLogin2 } from "react-icons/tb";
import { useAuth } from "store";
import { login } from "api";
import React, { useState } from "react";

export function LoginPage() {
  const toast = useToast();
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<{
    username?: string;
    password?: string;
  }>({ username: "", password: "" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmitted(true);

    const formData = new FormData(e.currentTarget);

    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();

    setFormData({
      username,
      password,
    });

    if (!username || !password) return;

    const response = await login({ username, password });
    if (response.error && response.status === 401) {
      toast({
        title: "Invalid credentials",
        status: "error",
        isClosable: true,
      });
      return;
    }

    if (response.status !== 200) {
      toast({
        title: "Server error",
        status: "error",
        isClosable: true,
      });
      return;
    }

    if (response.data) {
      setSession({
        username,
        role: response.data.role,
        token: response.data.accessToken,
        userId: response.data.userId,
      });

      navigate("/app");
    }
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

        <Box as="form" w="full" onSubmit={onSubmit}>
          <FormControl
            isInvalid={submitted && !formData?.username}
            marginBottom="2"
          >
            <FormLabel fontSize="sm">Username</FormLabel>
            <Input type="text" name="username" />
            <FormErrorMessage>Username is required.</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={submitted && !formData?.password}
            marginBottom="4"
          >
            <FormLabel fontSize="sm">Password</FormLabel>
            <Input type="password" name="password" />
            <FormErrorMessage>Password is required.</FormErrorMessage>
          </FormControl>

          <Button
            colorScheme="brand"
            width="full"
            marginBottom="1"
            type="submit"
          >
            <Icon as={TbLogin2} marginRight="1" />
            Login
          </Button>
        </Box>

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
