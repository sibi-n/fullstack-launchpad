import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { TbLogout2 } from "react-icons/tb";
import { useAuth } from "store";

export function Nav() {
  const navigate = useNavigate();
  const { user, removeSession } = useAuth();

  function logout() {
    removeSession();
    navigate("/auth/login");
  }

  return (
    <Box padding="3" borderBottom="1px">
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
            src="/logo.png"
            alt="RailEase Logo"
          />

          <Heading as="h1" size="md" marginLeft="1">
            RailEase
          </Heading>
        </HStack>

        {!user?.isAdmin && (
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
        )}

        <Menu placement="top-end">
          <MenuButton>
            <Avatar size="md" name={user?.username} />
          </MenuButton>
          <MenuList>
            <MenuItem as="a" href="#" onClick={logout}>
              <Icon marginRight="2" as={TbLogout2} />
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Box>
  );
}
