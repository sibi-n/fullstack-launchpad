import { Container, Heading, Text, VStack } from "@chakra-ui/react";
import { TrainsData } from "assets";
import { TrainCard } from "components/shared";

export function BookingHistoryPage() {
  return (
    <Container maxWidth="4xl" paddingX="0">
      <Heading fontSize="2xl" marginTop="12">
        Booking History
      </Heading>

      <Text fontWeight="medium" fontSize="sm" color="subtle">
        View all of your booking history
      </Text>

      <VStack marginTop="8" spacing="8">
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
            canBook={false}
          />
        ))}
      </VStack>
    </Container>
  );
}
