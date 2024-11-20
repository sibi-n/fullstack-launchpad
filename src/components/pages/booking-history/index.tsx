import { Container, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { listBookingHistory } from "api";
import { TrainCard } from "components/shared";
import { useEffect, useState } from "react";
import { useAuth } from "store";
import { BookingHistory } from "types/train";

export function BookingHistoryPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<BookingHistory[]>([]);

  async function fetchHistory() {
    if (!user?.userId) return;

    setLoading(true);

    const response = await listBookingHistory(user?.userId);

    if (!response.error && response.data) {
      setHistory(response.data);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <Container maxWidth="4xl" paddingX="0">
      <Heading fontSize="2xl" marginTop="12">
        Booking History
      </Heading>

      <Text fontWeight="medium" fontSize="sm" color="subtle">
        View all of your booking history
      </Text>

      <VStack marginTop="8" spacing="8">
        {loading && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}

        {history.map((e, index) => (
          <TrainCard
            key={index}
            id={e.trainId}
            name={e.name}
            destination={e.destination}
            source={e.source}
            startTime={e.startTime}
            endTime={e.endTime}
            totalSeats={e.seatCount}
            canBook={false}
          />
        ))}
      </VStack>
    </Container>
  );
}
