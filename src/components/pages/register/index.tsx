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
import { useState } from "react";
import { register } from "api";

export function RegisterPage() {
  const toast = useToast();
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<{
    username?: string;
    password?: string;
    confirmPassword?: string;
  }>({ username: "", password: "" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmitted(true);

    const formData = new FormData(e.currentTarget);

    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirmPassword")?.toString();

    setFormData({
      username,
      password,
      confirmPassword,
    });

    if (
      !username ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword
    )
      return;

    const response = await register({ username, password });
    if (response.error) {
      toast({
        title: response.message,
        status: "error",
        isClosable: true,
      });
      return;
    }

    if (response.status !== 201) {
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
        <Heading size="md">Create your account</Heading>
        <Text color="subtle" marginBottom="4" fontSize="sm">
          Please enter your details
        </Text>

        <Box as="form" w="full" onSubmit={onSubmit}>
          <FormControl
            isInvalid={submitted && !formData.username}
            marginBottom="2"
          >
            <FormLabel fontSize="sm">Username</FormLabel>
            <Input type="text" name="username" />
            <FormErrorMessage>Username is required.</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={submitted && !formData.password}
            marginBottom="4"
          >
            <FormLabel fontSize="sm">Password</FormLabel>
            <Input type="password" name="password" />
            <FormErrorMessage>Password is required.</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={
              submitted &&
              (!formData.confirmPassword ||
                formData?.password !== formData?.confirmPassword)
            }
            marginBottom="4"
          >
            <FormLabel fontSize="sm">Confirm Password</FormLabel>
            <Input type="password" name="confirmPassword" />
            {!formData.confirmPassword && (
              <FormErrorMessage>Confirm password is required.</FormErrorMessage>
            )}
            {formData?.password !== formData?.confirmPassword && (
              <FormErrorMessage>
                Confirm password doesn't match
              </FormErrorMessage>
            )}
          </FormControl>

          <Button
            type="submit"
            colorScheme="brand"
            width="full"
            marginBottom="1"
          >
            <Icon as={TbLogin2} marginRight="1" />
            Register
          </Button>
        </Box>

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
