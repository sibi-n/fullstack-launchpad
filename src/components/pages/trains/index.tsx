import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
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
  Spinner,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { createTrain, deleteTrain, listTrains, updateTrain } from "api";
import { useEffect, useState } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";
import { Train } from "types/train";
import { DateTimeUtil } from "utils/date.util";

export function TrainsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [trains, setTrains] = useState<Train[]>([]);
  const [train, setTrain] = useState<Train | null>(null);
  const [formData, setFormData] = useState<Partial<Train> | undefined>(
    undefined
  );
  const toast = useToast();

  async function fetchTrains() {
    setLoading(true);

    const response = await listTrains();

    if (!response.error && response.data) {
      setTrains(response.data);
    }

    setLoading(false);
  }

  function onEdit(e: Train) {
    setSubmitted(false);
    setTrain(e);
    setFormData(e);
    onOpen();
  }

  function onCreate() {
    setSubmitted(false);
    setTrain(null);
    setFormData(undefined);
    onOpen();
  }

  function onFormUpdate(key: keyof Train, value: any) {
    if (formData) {
      setFormData({
        ...formData,
        [key]: value,
      });
    } else {
      setFormData({ [key]: value });
    }
  }

  useEffect(() => {
    fetchTrains();
  }, []);

  async function onSubmit() {
    setSubmitted(true);

    if (
      !formData?.name ||
      !formData?.source ||
      !formData?.destination ||
      !formData?.startTime ||
      !formData?.endTime ||
      !formData?.totalSeats ||
      !formData?.price
    )
      return;

    const method = train ? updateTrain : createTrain;

    const response = await method({
      trainId: formData?.trainId,
      name: formData?.name,
      source: formData?.source,
      destination: formData?.destination,
      startTime: formData?.startTime,
      endTime: formData?.endTime,
      totalSeats: +formData?.totalSeats,
      price: +formData?.price,
      isActive: formData?.isActive == 1,
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

    onClose();

    fetchTrains();
  }

  async function onDeleteTrain(id: number) {
    const response = await deleteTrain(id);

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

    fetchTrains();
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

        <Button colorScheme="brand" onClick={onCreate}>
          Create Train
        </Button>
      </HStack>

      <Box w="full" position="relative">
        {loading && (
          <Flex
            zIndex="1"
            position="absolute"
            inset="0"
            rounded="md"
            bg="rgb(0 0 0 / 25%)"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Flex>
        )}

        <TableContainer marginTop="8" border="1px" rounded="md">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Price</Th>
                <Th>From</Th>
                <Th>To</Th>
                <Th isNumeric>Available Seats</Th>
                <Th isNumeric>Total Seats</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {trains.map((e, index) => (
                <Tr key={index}>
                  <Td>{e.name}</Td>
                  <Td>{e.price}</Td>
                  <Td>
                    {e.source}
                    <HStack>
                      <Text fontSize="xs" color="subtle">
                        {DateTimeUtil.formatDate(e.startTime)}
                      </Text>
                      <Text fontSize="xs" color="subtle">
                        {DateTimeUtil.formatTime(e.startTime)}
                      </Text>
                    </HStack>
                  </Td>
                  <Td>
                    {e.destination}
                    <HStack>
                      <Text fontSize="xs" color="subtle">
                        {DateTimeUtil.formatDate(e.endTime)}
                      </Text>
                      <Text fontSize="xs" color="subtle">
                        {DateTimeUtil.formatTime(e.endTime)}
                      </Text>
                    </HStack>
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
                          onEdit(e);
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
                                onClick={() => onDeleteTrain(e.trainId)}
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
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent minWidth="2xl">
          <ModalHeader>{train ? "Update" : "Create"} Train</ModalHeader>{" "}
          <ModalCloseButton />
          <ModalBody>
            <Box as="form" w="full">
              <Grid templateColumns="repeat(2, 1fr)" gap="4">
                {!train && (
                  <>
                    <GridItem>
                      <FormControl isInvalid={false} marginBottom="2">
                        <FormLabel fontSize="sm">Name</FormLabel>
                        <Input
                          type="text"
                          placeholder="Train Name"
                          value={formData?.name}
                          onChange={(e) => onFormUpdate("name", e.target.value)}
                        />
                        <FormErrorMessage>Name is required.</FormErrorMessage>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isInvalid={false} marginBottom="2">
                        <FormLabel fontSize="sm">Price</FormLabel>
                        <Input
                          type="number"
                          placeholder="Price"
                          value={formData?.price}
                          onChange={(e) =>
                            onFormUpdate("price", e.target.value)
                          }
                        />
                        <FormErrorMessage>Price is required.</FormErrorMessage>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isInvalid={false} marginBottom="2">
                        <FormLabel fontSize="sm">From</FormLabel>
                        <Input
                          type="text"
                          placeholder="From Where?"
                          value={formData?.source}
                          onChange={(e) =>
                            onFormUpdate("source", e.target.value)
                          }
                        />
                        <FormErrorMessage>From is required.</FormErrorMessage>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isInvalid={false} marginBottom="2">
                        <FormLabel fontSize="sm">To</FormLabel>
                        <Input
                          type="text"
                          placeholder="To Where?"
                          value={formData?.destination}
                          onChange={(e) =>
                            onFormUpdate("destination", e.target.value)
                          }
                        />
                        <FormErrorMessage>To is required.</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                  </>
                )}

                <GridItem>
                  <FormControl isInvalid={false} marginBottom="2">
                    <FormLabel fontSize="sm">Departure Time</FormLabel>
                    <Input
                      type="datetime-local"
                      placeholder="Departure Time"
                      value={DateTimeUtil.dateToDateTimeLocal(
                        formData?.startTime
                      )}
                      onChange={(e) =>
                        onFormUpdate("startTime", e.target.value)
                      }
                    />
                    <FormErrorMessage>Time is required.</FormErrorMessage>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl isInvalid={false} marginBottom="2">
                    <FormLabel fontSize="sm">Arrival Time</FormLabel>
                    <Input
                      type="datetime-local"
                      placeholder="Arrival Time"
                      value={DateTimeUtil.dateToDateTimeLocal(
                        formData?.endTime
                      )}
                      onChange={(e) => onFormUpdate("endTime", e.target.value)}
                    />
                    <FormErrorMessage>Time is required.</FormErrorMessage>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl isInvalid={false} marginBottom="2">
                    <FormLabel fontSize="sm">Seat Count</FormLabel>
                    <Input
                      type="number"
                      placeholder="Total Seats"
                      value={formData?.totalSeats}
                      onChange={(e) =>
                        onFormUpdate("totalSeats", e.target.value)
                      }
                    />
                    <FormErrorMessage>Count is required.</FormErrorMessage>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl marginBottom="2">
                    <FormLabel fontSize="sm">Active</FormLabel>
                    <Switch
                      id="isActive"
                      isChecked={formData?.isActive == 1}
                      onChange={(e) =>
                        onFormUpdate("isActive", e.target.checked)
                      }
                    />
                  </FormControl>
                </GridItem>
              </Grid>
            </Box>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="brand" onClick={onSubmit}>
                {train ? "Update" : "Create"}
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}
