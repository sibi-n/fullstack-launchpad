import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";

interface TrainCardProps {
  id: string;
  name: string;
  destination: string;
  source: string;
  startTime: string;
  endTime: string;
  totalSeats: number;
  availableSeats: number;
  ticketPrice: number;
  canBook: boolean;
  onBookClick?: (id: string) => void;
}

export function TrainCard(props: TrainCardProps) {
  const {
    id,
    name,
    destination,
    source,
    availableSeats,
    endTime,
    startTime,
    ticketPrice,
    totalSeats,
    canBook,
    onBookClick,
  } = props;

  return (
    <VStack border="1px" rounded="md" width="full" padding="8" spacing="6">
      <HStack width="full" justifyContent="space-between">
        <Box>
          <Heading fontSize="lg">
            #{id} - {name}
          </Heading>

          {/* <Text fontSize="xs" fontWeight="medium" color="subtle">
            8h25min
          </Text> */}
        </Box>

        <Tag variant="outline" colorScheme="green" size="lg" fontWeight="bold">
          ₹ {ticketPrice}
        </Tag>
      </HStack>

      <HStack width="full" justifyContent="space-between">
        <Box>
          <Heading fontSize="lg">{source}</Heading>

          <Text color="brand.500" fontSize="xs" fontWeight="semibold">
            {startTime}
          </Text>
        </Box>

        <HStack flex={1} justifyContent="center">
          <Divider maxWidth="20" />
          <Text fontSize="xs" fontWeight="medium" color="subtle" marginX="2">
            8h 25min
          </Text>
          <Divider maxWidth="20" />
        </HStack>

        <Box>
          <Heading fontSize="lg">{destination}</Heading>

          <Text color="brand.500" fontSize="xs" fontWeight="semibold">
            {endTime}
          </Text>
        </Box>
      </HStack>

      <HStack width="full" justifyContent="space-between">
        {canBook ? (
          <HStack color="green.500" spacing="0" alignItems="end">
            <Text fontSize="xl" fontWeight="bold" lineHeight="1">
              {availableSeats}
            </Text>
            <Text lineHeight="1">/{totalSeats} seats available</Text>
          </HStack>
        ) : (
          <Text
            color="green.500"
            fontSize="xl"
            fontWeight="bold"
            lineHeight="1"
          >
            {totalSeats} Seats
          </Text>
        )}

        {canBook && (
          <Button
            colorScheme="brand"
            size="sm"
            variant="outline"
            onClick={() => {
              if (onBookClick) onBookClick(id);
            }}
          >
            Book Ticket
          </Button>
        )}
      </HStack>
    </VStack>
  );
}
