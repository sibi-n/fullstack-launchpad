import {
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { TrainCard } from "components/shared";
import { TbSearch } from "react-icons/tb";
import { FormEvent, useEffect, useState } from "react";
import { Train } from "types/train";
import { bookTicket, listTrains, searchTrains } from "api";
import { useAuth } from "store";

export function SearchPage() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState<"list" | "book" | "">("");
  const [passengers, setPassengers] = useState(1);
  const { user } = useAuth();
  const [bookingTrainId, setBookingTrainId] = useState(-1);
  const [search, setSearch] = useState<{
    source?: string;
    destination?: string;
    date?: string;
  }>({
    source: "",
    destination: "",
    date: "",
  });

  async function fetchTrains() {
    setLoading("list");

    const response = await listTrains();

    if (!response.error && response.data) {
      setTrains(response.data);
    }

    setLoading("");
  }

  function onSearchUpdate(key: keyof typeof search, value: any) {
    if (search) {
      setSearch({
        ...search,
        [key]: value,
      });
    } else {
      setSearch({ [key]: value });
    }
  }

  async function onSearchSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!search.source || !search.destination || !search.date) return;

    setLoading("list");

    const response = await searchTrains({
      source: search.source,
      destination: search.destination,
      date: search.date,
    });

    if (!response.error && response.data) {
      setTrains(response.data);
    }

    setLoading("");
  }

  function onBookClick(trainId: number) {
    setPassengers(1);
    setBookingTrainId(trainId);
    onOpen();
  }

  async function onBookSubmit() {
    if (passengers <= 0 || !user?.userId) return;

    setLoading("book");

    const response = await bookTicket({
      userId: user?.userId,
      trainId: bookingTrainId,
      seatCount: passengers,
    });

    if (response.error) {
      toast({
        title: response.message,
        status: "error",
        isClosable: true,
      });
      return;
    }

    if (!response.ok) {
      toast({
        title: "Server error",
        status: "error",
        isClosable: true,
      });
      return;
    }

    toast({
      title: "Ticket booked successfully!",
      status: "success",
      isClosable: true,
    });

    setLoading("");
    setBookingTrainId(-1);
    onClose();
  }

  useEffect(() => {
    fetchTrains();
  }, []);

  return (
    <Container maxWidth="4xl" paddingX="0">
      <form onSubmit={onSearchSubmit}>
        <VStack
          border="1px"
          rounded="md"
          width="full"
          padding="8"
          marginTop="12"
          alignItems="normal"
          spacing="4"
        >
          <Heading fontSize="2xl">Find your Journey</Heading>

          <HStack spacing="8">
            <FormControl isInvalid={false} marginBottom="2">
              <FormLabel fontSize="sm">From</FormLabel>
              <Input
                type="text"
                placeholder="Where from?"
                name="source"
                value={search.source}
                onChange={(e) => {
                  onSearchUpdate("source", e.target.value);
                }}
              />
              <FormErrorMessage>From is required.</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={false} marginBottom="2">
              <FormLabel fontSize="sm">To</FormLabel>
              <Input
                type="text"
                name="destination"
                placeholder="Where to?"
                value={search.destination}
                onChange={(e) => {
                  onSearchUpdate("destination", e.target.value);
                }}
              />
              <FormErrorMessage>To is required.</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={false} marginBottom="2">
              <FormLabel fontSize="sm">Departure Date</FormLabel>
              <Input
                type="date"
                name="date"
                placeholder="When?"
                value={search.date}
                onChange={(e) => {
                  onSearchUpdate("date", e.target.value);
                }}
              />
              <FormErrorMessage>Date is required.</FormErrorMessage>
            </FormControl>
          </HStack>

          <ButtonGroup alignSelf="end">
            {(search?.source || search?.destination || search?.date) && (
              <Button
                type="reset"
                value="Reset"
                onClick={() => {
                  setSearch({ source: "", destination: "", date: "" });
                }}
              >
                Clear
              </Button>
            )}

            <Button type="submit" colorScheme="brand">
              <Icon as={TbSearch} marginRight="1" />
              Search
            </Button>
          </ButtonGroup>
        </VStack>
      </form>

      <VStack marginTop="12" spacing="8">
        {loading && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}

        {trains?.length ? (
          trains.map((e, index) => (
            <TrainCard
              key={index}
              id={e.trainId}
              name={e.name}
              destination={e.destination}
              source={e.source}
              startTime={e.startTime}
              endTime={e.endTime}
              totalSeats={e.totalSeats}
              availableSeats={e.availableSeats}
              ticketPrice={e.price}
              canBook
              onBookClick={() => onBookClick(e.trainId)}
            />
          ))
        ) : (
          <Text>No trains found</Text>
        )}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent padding="4">
          <ModalCloseButton />
          <ModalBody>
            <Heading fontSize="xl" marginY="8" textAlign="center">
              Add Passengers
            </Heading>

            <NumberInput
              step={1}
              defaultValue={1}
              min={1}
              max={30}
              value={passengers}
              onChange={(valueString) => setPassengers(+valueString)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </ModalBody>

          <ModalFooter>
            <Button
              disabled={loading === "book"}
              onClick={onBookSubmit}
              colorScheme="brand"
              marginX="auto"
              width="full"
              isLoading={loading === "book"}
            >
              Book Ticket
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}
