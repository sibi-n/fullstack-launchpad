import {
  Button,
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
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { TrainCard } from "components/shared";
import { TbSearch } from "react-icons/tb";
import { TrainsData } from "assets";

export function SearchPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container maxWidth="4xl" paddingX="0">
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
            <Input type="text" placeholder="Where from?" />
            <FormErrorMessage>From is required.</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={false} marginBottom="2">
            <FormLabel fontSize="sm">To</FormLabel>
            <Input type="text" placeholder="Where to?" />
            <FormErrorMessage>To is required.</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={false} marginBottom="2">
            <FormLabel fontSize="sm">Departure Date</FormLabel>
            {/* <Datepicker
              placeholder="When?"
              date={departureDate}
              onDateChange={setDepartureDate}
            /> */}
            <Input type="date" placeholder="Where to?" />
            <FormErrorMessage>From is required.</FormErrorMessage>
          </FormControl>
        </HStack>

        <Button alignSelf="end" colorScheme="brand">
          <Icon as={TbSearch} marginRight="1" />
          Search
        </Button>
      </VStack>

      <VStack marginTop="12" spacing="8">
        {TrainsData.map((e, index) => (
          <TrainCard
            key={index}
            id={e.id}
            name={e.name}
            destination={e.destination}
            source={e.source}
            startTime={e.startTime}
            endTime={e.endTime}
            totalSeats={e.totalSeats}
            availableSeats={e.availableSeats}
            ticketPrice={e.ticketPrice}
            canBook
            onBookClick={() => onOpen()}
          />
        ))}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent padding="4">
          <ModalCloseButton />
          <ModalBody>
            <Heading fontSize="xl" marginY="8" textAlign="center">
              Add Passengers
            </Heading>

            <NumberInput step={5} defaultValue={15} min={10} max={30}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="brand" marginX="auto" width="full">
              Book Ticket
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}
