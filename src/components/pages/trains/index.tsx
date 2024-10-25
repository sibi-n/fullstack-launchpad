import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { TrainsData } from "assets";
import { useState } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";

export function TrainsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [train, setTrain] = useState<any>();

  return (
    <Container maxWidth="4xl" paddingX="0">
      <HStack marginTop="12" justifyContent="space-between">
        <Box>
          <Heading fontSize="2xl">Trains</Heading>

          <Text fontWeight="medium" fontSize="sm" color="subtle">
            Create, update and delete train details
          </Text>
        </Box>

        <Button colorScheme="brand" onClick={onOpen}>
          Create Train
        </Button>
      </HStack>

      <TableContainer marginTop="8" border="1px" rounded="md">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>From</Th>
              <Th>To</Th>
              <Th isNumeric>Available Seats</Th>
              <Th isNumeric>Total Seats</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {TrainsData.map((e, index) => (
              <Tr key={index}>
                <Td>{e.name}</Td>
                <Td>
                  {e.source}
                  <Text fontSize="xs" color="subtle">
                    {e.startTime}
                  </Text>
                </Td>
                <Td>
                  {e.destination}
                  <Text fontSize="xs" color="subtle">
                    {e.endTime}
                  </Text>
                </Td>
                <Td isNumeric>{e.availableSeats}</Td>
                <Td isNumeric>{e.totalSeats}</Td>
                <Td>
                  <ButtonGroup>
                    <IconButton
                      variant="outline"
                      icon={<TbEdit />}
                      aria-label="Edit train"
                      onClick={() => {
                        setTrain(e);
                        onOpen();
                      }}
                    />

                    <Popover>
                      <PopoverTrigger>
                        <IconButton
                          variant="outline"
                          colorScheme="red"
                          icon={<TbTrash />}
                          aria-label="Delete train"
                        />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Delete Train</PopoverHeader>
                        <PopoverBody>
                          <VStack>
                            <Text color="subtle">
                              Are you sure you want to delete?
                            </Text>
                            <Button
                              colorScheme="red"
                              size="sm"
                              marginTop="2"
                              marginX="auto"
                            >
                              Confirm
                            </Button>
                          </VStack>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent minWidth="2xl">
          <ModalHeader>{train ? "Update" : "Create"} Train</ModalHeader>{" "}
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(2, 1fr)" gap="4">
              <GridItem>
                <FormControl isInvalid={false} marginBottom="2">
                  <FormLabel fontSize="sm">Name</FormLabel>
                  <Input type="text" placeholder="Train Name" />
                  <FormErrorMessage>Name is required.</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={false} marginBottom="2">
                  <FormLabel fontSize="sm">Seat Count</FormLabel>
                  <Input type="number" placeholder="Total Seats" />
                  <FormErrorMessage>Count is required.</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={false} marginBottom="2">
                  <FormLabel fontSize="sm">From</FormLabel>
                  <Input type="number" placeholder="From Where?" />
                  <FormErrorMessage>From is required.</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={false} marginBottom="2">
                  <FormLabel fontSize="sm">To</FormLabel>
                  <Input type="number" placeholder="To Where?" />
                  <FormErrorMessage>To is required.</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={false} marginBottom="2">
                  <FormLabel fontSize="sm">Departure Time</FormLabel>
                  <Input type="time" placeholder="Departure Time" />
                  <FormErrorMessage>Time is required.</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={false} marginBottom="2">
                  <FormLabel fontSize="sm">Arrival Time</FormLabel>
                  <Input type="time" placeholder="Arrival Time" />
                  <FormErrorMessage>Time is required.</FormErrorMessage>
                </FormControl>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button variant="outline">Cancel</Button>
              <Button colorScheme="brand">{train ? "Update" : "Create"}</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}
