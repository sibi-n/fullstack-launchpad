import { Box, Heading, VStack, Text, FormControl, FormLabel, Input, FormErrorMessage, Button, Icon} from "@chakra-ui/react";
import { TbLogin2 } from "react-icons/tb";

function LoginPage(){

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
    
            <Button width="full" marginBottom="1" bg={'#2563EB'} color={'#FFFFFF'}>
              <Icon as={TbLogin2} marginRight="1" />
              Login
            </Button>
          </VStack>
        </Box>
      );
};

export default LoginPage;