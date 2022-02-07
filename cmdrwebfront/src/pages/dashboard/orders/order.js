import { CheckIcon, CloseIcon, SpinnerIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  CloseButton,
  Heading,
  HStack,
  IconButton,
  Progress,
  ProgressLabel,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { server } from "../../../config";
import { changeOrderStatus } from "../../../scripts/changeOrderStatus";

const Course = ({ course }) => {
  const {
    amount,
    special,
    courseMoment,
    aditionalOptionsConfiguration,
    variant,
    menuItem,
    extras,
    price,
  } = course;
  return (
    <Box>
      <Text>
        {amount} x {menuItem.name} : {variant.name}{" "}
      </Text>
      <Box ml={10}>
        <Text>{special}</Text>
        <Text>
          {aditionalOptionsConfiguration.map((option) => (
            <Text>
              {" "}
              {option.propertyName}: {option.value}{" "}
            </Text>
          ))}
        </Text>

        <Text>
          {extras.map((extra) => (
            <Text>+{extra.name}</Text>
          ))}
        </Text>
      </Box>
    </Box>
  );
};

export const Order = ({ order }) => {
  const [courses, setCourses] = useState([]);
  const [end, setEnd] = useState(0);
  const [timeToAccept, setTimeToAccept] = useState(0);
  const { _id, requestTimeDate, deliveryLocation, status, orderNote } = order;

  let date = new Date(null);
  date.setMilliseconds(end - Date.parse(requestTimeDate)); // specify value for SECONDS here
  var delayClock = date.toISOString().substring(14, 19);

  const delayTreshold = 300;
  const delaySeconds = (end - Date.parse(requestTimeDate)) / 1000;
  const percentageToDelayed = (delaySeconds / delayTreshold) * 100;
  const isDelayed = delaySeconds > delayTreshold;

  const isAccepted = status == "preparing" || status == "finished";
  const isPrepared = status == "finished";
  const isFinished = status == "finished";
  const isRejected = status == "rejected";

  const message = isPrepared
    ? `Pedido listo ${isDelayed ? "con demora" : ""}`
    : isRejected
    ? `Pedido Rechazado`
    : `Pedido ${isDelayed ? "demorado" : ""} en ${
        isAccepted ? "preparacion" : "espera"
      }`;

  const acceptOrder = () => {
    changeOrderStatus({ id: _id, newStatus: "preparing" }).then((res) => {
      console.log(JSON.stringify(res));
    });
    setTimeToAccept(delaySeconds);
  };

  const rejectOrder = () => {
    changeOrderStatus({ id: _id, newStatus: "rejected" }).then((res) => {
      console.log(JSON.stringify(res));
    });
  };

  useEffect(() => {
    setInterval(() => {
      setEnd(Date.now());
    }, 1000);
  }, []);

  useEffect(() => {
    fetch(server + "/api/order/courses/" + _id)
      .then((res) => res.json())
      .then((res) => setCourses(res));
  }, []);

  return (
    <Box
      p={5}
      m={3}
      shadow="lg"
      rounded="lg"
      bg={isDelayed ? "red.100" : "blue.100"}
    >
      <Box
        mt="-10"
        bg={isDelayed ? "red.100" : "blue.100"}
        w="fit-content"
        h="fit-content"
        rounded={"full"}
      >
        <CircularProgress
          value={percentageToDelayed}
          color={isDelayed ? "red.400" : "blue.400"}
          size="60px"
        >
          <CircularProgressLabel fontWeight={"bold"}>
            {delayClock}
          </CircularProgressLabel>
        </CircularProgress>
      </Box>

      <SimpleGrid columns={2} spacing="1" m="2">
        <Stack>
          {isAccepted ? (
            <Badge>
              Aceptado en {parseInt(timeToAccept) } segundos
              <CheckIcon />
            </Badge>
          ) : isRejected ? (
            <Badge>
              Rechazado <CloseIcon />
            </Badge>
          ) : (
            <Badge>En Espera </Badge>
          )}
          <Progress
            colorScheme={isRejected ? "red" : "blue"}
            size="xs"
            value={(isAccepted || isRejected) && 100}
            isIndeterminate={!isAccepted && !isRejected}
          />
        </Stack>
        <Stack>
          {isPrepared ? (
            <Badge>
              Listo <CheckIcon />
            </Badge>
          ) : isAccepted ? (
            <Badge>Preparando </Badge>
          ) : (
            <Badge> ...</Badge>
          )}
          <Progress
            colorScheme={isDelayed ? "red" : "blue"}
            size="xs"
            value={0}
            isIndeterminate={isAccepted && !isPrepared}
          />
        </Stack>
      </SimpleGrid>

      <Alert status={isDelayed ? "error" : "info"} size="lg">
        <AlertIcon />
        <AlertTitle mr={2}>
          Mesa {deliveryLocation} - {message}
        </AlertTitle>
        <AlertDescription></AlertDescription>
      </Alert>

      {status}
      {orderNote != "unknown extras" && <Text>{orderNote}</Text>}

      {courses.map((course) => (
        <Course course={course} />
      ))}

      <HStack spacing="5">
        {isAccepted ? (
          <>
            <Button
              rightIcon={<CloseButton />}
              colorScheme="red"
              variant={"ghost"}
              onClick={rejectOrder}
            >
              Cancelar
            </Button>
            <Button
              rightIcon={<CheckIcon />}
              onClick={acceptOrder}
              colorScheme="green"
              variant={"ghost"}
            >
              Marcar como listo
            </Button>
          </>
        ) : (
          <>
            <Button
              rightIcon={<CloseButton />}
              colorScheme="red"
              variant={"ghost"}
              onClick={rejectOrder}
            >
              Rechazar
            </Button>
            <Button
              rightIcon={<CheckIcon />}
              onClick={acceptOrder}
              colorScheme="green"
              variant={"ghost"}
            >
              Aceptar
            </Button>
          </>
        )}
      </HStack>
    </Box>
  );
};
