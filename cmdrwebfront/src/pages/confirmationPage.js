import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../config";

export const ConfirmationPage = () => {
  let params = useParams();
  const id = params.courseId;
  const [status, setStatus] = useState("idle");

  const isIdle = status == "idle";
  const isPreparing = status == "preparing";
  const isReady = status == "ready";

  useEffect(() => {
    setInterval(() => {
      fetch(`${server}/api/order/status/${id}`)
        .then((res) => res.json())
        .then((res) => setStatus(res.status));
    }, 2000);
  }, []);

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
        {isIdle ? (
          <Alert status="info">
            <HStack>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="md"
              />
              <Text>Tu pedido se está procesando</Text>
            </HStack>
          </Alert>
        ) : isPreparing ? (
          <>
            <Alert status="success">
              <AlertIcon />
              <Text>Tu pedido se procesó</Text>
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
          </>
        ) : (
          isReady && (
            <>

<Alert status="success">
                <AlertIcon />
                <Text>Tu pedido se procesó</Text>
              </Alert>
              <Alert status="success">
                <AlertIcon />
                <Text>Tu pedido se cocinó</Text>
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
                  <Text>Tu pedido se está listo para servir</Text>

                </HStack>
              </Alert>

            </>
          )
        )}
      </VStack>
      <a href="/menu/7">Hacer Otro Pedido</a>

    </Box>
  );
};
