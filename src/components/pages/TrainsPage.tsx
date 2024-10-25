import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
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
import { FormEvent, useEffect, useState } from "react";
import { trains as StaticTrainData } from "../../assets/db";

type Train = {
  id: string;
  name: string;
  destination: string;
  source: string;
  startTime: string;
  endTime: string;
  totalSeats: number;
  availableSeats: number;
  ticketPrice: number;
};

export default function TrainsPage() {
  const [trains, setTrains] = useState<Train[]>(StaticTrainData);
  const [filteredTrains, setFilteredTrains] =
    useState<Train[]>(StaticTrainData);
  const [search, setSearch] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function fetchTrains() {
    const response = await fetch("http://localhost:8080/trains");
    const data = await response.json();
    console.log(response);
    setTrains(data);
    setFilteredTrains(data);
  }

  useEffect(() => {
    // fetchTrains();
  }, []);

  useEffect(() => {
    console.log("search: ", search);
    const tempTrains = trains;
    const filterted = tempTrains.filter((e) =>
      e.name.toLowerCase().startsWith(search.toLowerCase())
    );
    setFilteredTrains(filterted);
  }, [search]);

  function onCreateTrain(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e);

    const formData = new FormData(e.currentTarget);
    const train = formData.get("train");
    const seatCount = formData.get("seatCount");
    const from = formData.get("from");
    const to = formData.get("to");
    const startTime = formData.get("startTime");
    const endTime = formData.get("endTime");

    console.log({ train, seatCount, from, to, startTime, endTime });
  }

  return (
    <Container maxWidth="4xl" paddingX="0">
      <HStack marginTop="12" justifyContent="space-between">
        <Box>
          <Heading fontSize="2xl">Trains</Heading>

          <Text fontWeight="medium" fontSize="sm" color="subtle">
            Create, update and delete train details
          </Text>
        </Box>

        <Button onClick={onOpen} colorScheme="blue">
          Create Train
        </Button>
      </HStack>

      <VStack justifyContent="start" alignItems="start" marginY="4">
        <Text>Search</Text>
        <Input
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </VStack>

      <TableContainer
        marginTop="8"
        border="1px"
        borderColor="gray.100"
        rounded="md"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>From</Th>
              <Th>To</Th>
              <Th isNumeric>Available Seats</Th>
              <Th isNumeric>Total Seats</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredTrains.map((train, index) => {
              return (
                <Tr key={index}>
                  <Td>{train.name}</Td>
                  <Td>
                    {train.source}
                    <Text fontSize="xs" color="subtle">
                      {train.startTime}
                    </Text>
                  </Td>
                  <Td>
                    {train.destination}
                    <Text fontSize="xs" color="subtle">
                      {train.endTime}
                    </Text>
                  </Td>
                  <Td>{train.availableSeats}</Td>
                  <Td>{train.totalSeats}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minWidth="2xl">
          <ModalHeader>Create a Train</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onCreateTrain}>
              <Grid templateColumns="repeat(2, 1fr)" gap="8">
                <GridItem>
                  <FormControl isInvalid={false} marginBottom="2">
                    <FormLabel fontSize="sm">Name</FormLabel>
                    <Input type="text" placeholder="Train Name" name="train" />
                    <FormErrorMessage>Name is required.</FormErrorMessage>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl isInvalid={false} marginBottom="2">
                    <FormLabel fontSize="sm">Seat Count</FormLabel>
                    <Input
                      type="number"
                      placeholder="Total Seats"
                      name="seatCount"
                    />
                    <FormErrorMessage>Count is required.</FormErrorMessage>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl isInvalid={false} marginBottom="2">
                    <FormLabel fontSize="sm">From</FormLabel>
                    <Input type="text" placeholder="From Where?" name="from" />
                    <FormErrorMessage>From is required.</FormErrorMessage>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl isInvalid={false} marginBottom="2">
                    <FormLabel fontSize="sm">To</FormLabel>
                    <Input type="text" placeholder="To Where?" name="to" />
                    <FormErrorMessage>To is required.</FormErrorMessage>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl isInvalid={false} marginBottom="2">
                    <FormLabel fontSize="sm">Departure Time</FormLabel>
                    <Input
                      type="text"
                      placeholder="Departure Time"
                      name="startTime"
                    />
                    <FormErrorMessage>Time is required.</FormErrorMessage>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl isInvalid={false} marginBottom="2">
                    <FormLabel fontSize="sm">Arrival Time</FormLabel>
                    <Input
                      type="text"
                      placeholder="Arrival Time"
                      name="endTime"
                    />
                    <FormErrorMessage>Time is required.</FormErrorMessage>
                  </FormControl>
                </GridItem>
              </Grid>

              <HStack marginY="4" justifyContent="end">
                <Button onClick={onClose} mr={3}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="blue">
                  Create
                </Button>
              </HStack>
            </form>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </Container>
  );
}
