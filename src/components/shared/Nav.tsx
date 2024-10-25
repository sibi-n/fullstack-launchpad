import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Box,
  Heading,
  HStack,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import logo from "../../assets/logo.png";

export default function Nav() {
  return (
    <Box padding="3" borderBottom="1px" borderColor="gray.100">
      <HStack
        maxWidth="4xl"
        height="full"
        marginX="auto"
        justifyContent="space-between"
      >
        <HStack>
          <Image
            height="10"
            width="10"
            rounded="md"
            src={logo}
            alt="RailEase Logo"
          />

          <Heading as="h1" size="md" marginLeft="1">
            RailEase
          </Heading>
        </HStack>

        <HStack spacing="10">
          <Link as={RouterLink} fontWeight="medium" children="Home" to="/" />
          <Link
            as={RouterLink}
            fontWeight="medium"
            children="Search"
            to="search"
          />
          <Link
            as={RouterLink}
            fontWeight="medium"
            children="Booking History"
            to="history"
          />
        </HStack>

        <Menu placement="top-end">
          <MenuButton>
            <Avatar size="md" name={"John Doe"} />
          </MenuButton>
          <MenuList>
            <MenuItem as="a" href="#">
              Profile
            </MenuItem>
            <MenuItem as="a" href="#">
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Box>
  );
}
