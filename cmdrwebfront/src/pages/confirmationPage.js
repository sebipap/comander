import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export const ConfirmationPage = () => {
  let params = useParams();
  const id = params.courseId;

  return (
    <Box>
      <Alert
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Tu pedido fue enviado!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Abajo podras ver el estado de tu pedido. Gracias por elegirnos!
        </AlertDescription>
      </Alert>

      <VStack w="100%" p={4}>
        <Alert status="success">
          <HStack>
            <AlertIcon />
            <Text>Pedido Procesado</Text>
          </HStack>
        </Alert>

        <Alert status="info">
          <HStack>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="md"
            />
            <Text>Tu pedido se está cocinando</Text>
          </HStack>
        </Alert>

        <Alert status="info">
          <HStack>
            <AlertIcon />
            <Text>Te avisaremos cuando tu pedido esté listo para entregar</Text>
          </HStack>
        </Alert>

      </VStack>
    </Box>
  );
};
