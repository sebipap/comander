import {
  Text,
  CloseButton,
  Stat,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Badge,
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  toast,
  Tag,
  Stack,
  HStack,
  Tooltip,
  Table,
  VStack,
  Tbody,
  Tr,
  Td,
  Th,
  StatLabel,
  useToast,
  Img,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Router, useNavigate, useParams } from "react-router-dom";
import { calculateCoursePrice } from "../../scripts/calculateCoursePrice";
import { fullCourseData } from "../../scripts/fullCourseData";
import { makeOrder } from "../../scripts/makeOrder";
import { shoppingCartPrice } from "../../scripts/shoppingCartPrice";
import { CoursesGroup } from "./courseGroup";
import { Redirect } from "react-router-dom";
import { AddIcon, Icon, ViewIcon } from "@chakra-ui/icons";

export const ShoppingCartLine = (props) => {
  const [amount, setAmount] = useState("");
  const [special, setSpecial] = useState("");
  const [courseMoment, setCourseMoment] = useState("");
  const [aditionalOptionsConfiguration, setAditionalOptionsConfiguration] =
    useState([]);
  const [variant, setVariant] = useState("");
  const [menuItem, setMenuItem] = useState({ name: "", price: 0 });
  const [extras, setExtras] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(async () => {
    const completeCourse = await fullCourseData(props.course);

    setAmount(completeCourse.amount);
    setSpecial(completeCourse.special);
    setCourseMoment(completeCourse.courseMoment);
    setAditionalOptionsConfiguration(
      completeCourse.aditionalOptionsConfiguration
    );
    setVariant(completeCourse.variant);
    setMenuItem(completeCourse.menuItem);
    setExtras(completeCourse.extras);
    setPrice(completeCourse.price);
  }, []);

  return (
    <Box rounded="l" padding={2} borderBottom={"1px solid gray"}>
      <Tooltip
        label={`Sacar del pedido ${amount} ${menuItem.name} ${variant.name} ($${
          variant.price
        })
              ${extras.map((extra) => `+ ${extra.name} ($${extra.price})`)}
              ${special}
      `}
      >
        <CloseButton
          onClick={() => props.remove(props.course)}
          di
          splay="inline"
        />
      </Tooltip>
      <HStack spacing={5}>
        <Box m={3}>
          <Text fontSize={17} color="gray">
            {amount} × {variant.name}
          </Text>

          <Text fontSize={20} display="inline">
            {menuItem.name}
          </Text>
        </Box>
        <CoursesGroup plate={menuItem} amount={amount} display="inline" />
      </HStack>
      <HStack spacing="2">
        {special && <Tag> {special}</Tag>}

        {extras.map((extra) => (
          <Tag>{extra.name}</Tag>
        ))}
      </HStack>

      <Table size="sm">
        <Tbody>
          {aditionalOptionsConfiguration.map((config) => (
            <Tr>
              <Td>{config.propertyName}</Td>
              <Td>{config.value}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Stat>
        <StatNumber>${price}</StatNumber>
        <StatHelpText></StatHelpText>
      </Stat>
    </Box>
  );
};

export const ShoppingCart = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [total, setTotal] = useState(0);
  const [redirect, setRedirect] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  let params = useParams();
  const table = params.table;
  const toast = useToast();

  useEffect(async () => {
    setTotal(await shoppingCartPrice(props.shoppingCart));
    // if (props.shoppingCart.length > 0) onOpen();
  }, [props.shoppingCart]);

  const handleMakeOrder = async () => {
    const order = {
      courses: props.shoppingCart,
      deliveryLocation: table,
    };

    setLoading(true);
    makeOrder(order)
      .then((res) => res.json())
      .then((res) => {
        toast({
          title: res.message,
          position: "top",
          duration: 4000,
          status: "success",
        });
        setLoading(false);
        navigate(`../confirmation/${res.id}`);
        props.clearShoppingCart();
        onClose();
      })
      .catch((err) => {
        toast({
          title: "Hubo un error al cargar el pedido",
          position: "top",
          duration: 3000,
          status: "error",
        });
      });
  };

  return (
    <>
      <Button
        variant="solid"
        colorScheme={"green"}
        onClick={onOpen}
        display={props.shoppingCart.length < 1 && "none"}
        w="100%"
      >
        Ver Tu Pedido
      </Button>

      {isConfirmed && (
        <Box>
          <Heading>Is Confirmed!!</Heading>
          <Button>go</Button>
        </Box>
      )}

      {isOpen && (
        <Modal onClose={onClose} size={"lg"} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Pedido</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box as={motion.div}>
                {props.shoppingCart.map((course) => (
                  <ShoppingCartLine course={course} remove={props.remove} />
                ))}

                <HStack m={5}>
                  <Stat>
                    <StatLabel>Mesa</StatLabel>
                    <StatNumber>{table}</StatNumber>
                  </Stat>

                  <Stat>
                    <StatLabel>Total</StatLabel>
                    <StatNumber>${total}</StatNumber>
                  </Stat>
                </HStack>

                <HStack
                  columns={[1, 2]}
                  position="sticky"
                  bottom="1vh"
                  rounded="lg"
                  m="5"
                  spacing={2}
                >
                  <Button onClick={onClose}>Añadir más productos</Button>

                  <a href={redirect}>
                    {" "}
                    <Button
                      colorScheme="green"
                      onClick={handleMakeOrder}
                      isLoading={loading}
                      rightIcon={<AddIcon />}
                      loadingText="Enviando Pedido"
                    >
                      Pedir
                    </Button>
                  </a>
                </HStack>
              </Box>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
