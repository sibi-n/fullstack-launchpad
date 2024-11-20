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
import { useMemo } from "react";
import { DateTimeUtil } from "utils/date.util";

interface TrainCardProps {
  id?: number;
  name: string;
  destination: string;
  source: string;
  startTime: Date;
  endTime: Date;
  totalSeats: number;
  availableSeats?: number;
  ticketPrice?: number;
  canBook: boolean;
  onBookClick?: (id: number) => void;
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

  const parseDuration = useMemo(() => {
    return DateTimeUtil.parseDuration(startTime, endTime);
  }, [startTime, endTime]);

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

        {ticketPrice && (
          <Tag
            variant="outline"
            colorScheme="green"
            size="lg"
            fontWeight="bold"
          >
            ₹ {ticketPrice}
          </Tag>
        )}
      </HStack>

      <HStack width="full" justifyContent="space-between">
        <Box>
          <Heading fontSize="lg">{source}</Heading>

          <HStack color="brand.500" fontSize="xs" fontWeight="semibold">
            <Text>{DateTimeUtil.formatDate(startTime)}</Text>
            <Text>{DateTimeUtil.formatTime(startTime)}</Text>
          </HStack>
        </Box>

        <HStack flex={1} justifyContent="center">
          <Divider maxWidth="20" />
          <Text fontSize="xs" fontWeight="medium" color="subtle" marginX="2">
            {parseDuration?.hours}h {parseDuration.minutes}min
          </Text>
          <Divider maxWidth="20" />
        </HStack>

        <Box>
          <Heading fontSize="lg">{destination}</Heading>

          <HStack color="brand.500" fontSize="xs" fontWeight="semibold">
            <Text>{DateTimeUtil.formatDate(endTime)}</Text>
            <Text>{DateTimeUtil.formatTime(endTime)}</Text>
          </HStack>
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
              if (onBookClick && id) onBookClick(id);
            }}
          >
            Book Ticket
          </Button>
        )}
      </HStack>
    </VStack>
  );
}
