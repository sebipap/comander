import {
  Box,
  Button,
  CloseButton,
  Heading,
  HStack,
  Text,
  Input,
  Image,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  VStack,
  Badge,
  RadioGroup,
  Stack,
  Radio,
  Checkbox,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { calculateCoursePrice } from "../../scripts/calculateCoursePrice";
import { CoursesGroup } from "./courseGroup";
import { DietTags } from "./dietTags";

export const PlateWindow = (props) => {
  const {
    _id,
    name,
    token,
    description,
    category,
    imgURL,
    posibleCourseMoments,
    tags,
    variants,
    extras,
    aditionalOptions,
  } = props.item;
  const [course, setCourse] = useState({});
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(0);
  const [special, setSpecial] = useState("");
  const [checkedExtras, setCheckedExtras] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [courseMoment, setCourseMoment] = useState(posibleCourseMoments[0]);
  const [aditionalOptionsConfiguration, setAditionalOptionsConfiguration] =
    useState(
      aditionalOptions.map((aditionalOption) => {
        return {
          propertyName: aditionalOption.propertyName,
          value: aditionalOption.options[0],
        };
      })
    );

  const handleSpecial = (event) => setSpecial(event.target.value);

  useEffect(async () => {
    const newCourse = {
      menuItemVariant_id: selectedVariant._id,
      amount,
      special,
      courseMoment,
      extras_ids: checkedExtras.map((extra) => extra._id),
      aditionalOptionsConfiguration,
      menuItemName: name
    };

    setCourse(newCourse);

    setPrice(await calculateCoursePrice(newCourse));
  }, [selectedVariant, amount, courseMoment, checkedExtras, special, aditionalOptionsConfiguration]);

  const increment = () => setAmount((amount) => amount + 1);

  const decrement = () =>
    setAmount((amount) => (amount > 1 ? amount - 1 : amount));

  const addToCart = () => {
    props.addToShoppingCart(course);
  };

  const BottomFloatingButtonGroup = () => (
    <HStack
      position="sticky"
      bottom="1vh"
      bg="white"
      p="3"
      m="5"
      spacing={2}
      rounded="lg"
      shadow="lg"
    >
      <HStack>
        <Button onClick={decrement}> - </Button>
        <Heading>{amount}</Heading>
        <Button onClick={increment}>+ </Button>
      </HStack>
      <Button colorScheme="green" size="lg" onClick={addToCart}>
        Añadir {amount} al pedido por ${price}
      </Button>
    </HStack>
  );

  const VariantsSection = () => {
    const handleVariant = (variantName) =>
      setSelectedVariant(
        variants.find((variant) => variant.name == variantName)
      );

    return (
      <Stack spacing="5">
        <Heading size="md">Elige la opcion</Heading>
        <RadioGroup value={selectedVariant.name} onChange={handleVariant}>
          <Stack>
            {variants.map((variant) => (
              <Radio value={variant.name}>
                {variant.name} <Badge>${variant.price}</Badge>
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </Stack>
    );
  };

  const CourseMomentSection = () => {
    const handleCourseMoment = (courseMomentName) =>
      setCourseMoment(
        posibleCourseMoments.find(
          (courseMoment) => courseMoment == courseMomentName
        )
      );

    const displayType = (type) => {
      switch (type) {
        case "main":
          return "Plato Principal";
        case "starter":
          return "Entrada";
        case "dessert":
          return "Postre";
        case "drink":
          return "Bebida";
        default:
          return type;
      }
    };

    return (
      <Stack spacing="5">
        <Heading size="md">Elija cuándo quiere comerlo</Heading>
        <RadioGroup value={courseMoment} onChange={handleCourseMoment}>
          <Stack>
            {posibleCourseMoments.map((type) => (
              <Radio value={type}>{displayType(type)}</Radio>
            ))}
          </Stack>
        </RadioGroup>
      </Stack>
    );
  };

  const ExtrasSection = () => {
    const handleCheckBox = (extraName) => {
      const extra = extras.find((extra) => extra.name == extraName);
      checkedExtras.includes(extra)
        ? setCheckedExtras(
            checkedExtras.filter((extra) => extra.name != extraName)
          )
        : setCheckedExtras(checkedExtras.concat(extra));
    };

    return (
      <Stack spacing="5">
        <Heading size="md">Configure su pedido</Heading>
        <Stack>
          {extras.map((extra) => (
            <Checkbox
              value={extra.name}
              isChecked={checkedExtras.includes(extra)}
              onChange={() => handleCheckBox(extra.name)}
            >
              {extra.name}{" "}
              {extra.price != 0 && (
                <Badge>
                  {extra.price > 0 && "+"} ${extra.price}
                </Badge>
              )}
            </Checkbox>
          ))}
        </Stack>
      </Stack>
    );
  };

  const AditionalOptionsSection = () => {
    const handleAditionalOptionChange = (propertyName) => (value) => {
      const newConfigs = aditionalOptionsConfiguration.map((config) =>
        config.propertyName == propertyName ? { propertyName, value } : config
      );

      setAditionalOptionsConfiguration(newConfigs);
    };
    return aditionalOptions.map((aditionalOption) => {
      const aditionalOptionConfig = aditionalOptionsConfiguration.find(
        (aditionalOptionConfig) =>
          aditionalOptionConfig.propertyName == aditionalOption.propertyName
      );

      return (
        <Stack spacing="5">
          <Heading size="md">{aditionalOption.propertyName}</Heading>
          <RadioGroup
            value={aditionalOptionConfig.value}
            onChange={handleAditionalOptionChange(aditionalOption.propertyName)}
          >
            <Stack>
              {aditionalOption.options.map((option) => (
                <Radio value={option}>{option}</Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Stack>
      );
    });
  };

  return (
    <Modal isOpen="true" size="xl" onClose={props.close}>
      <ModalOverlay
        css={{ backdropFilter: "blur(10px)" }}
        bg="rgba(100,100,100,0.2)"
        onClick={props.close}
      />

      <ModalContent>
        <ModalBody>
          <CloseButton onClick={props.close} />

          <VStack gap={10} >
            <Image src={imgURL} style={{ borderRadius: 10, width: "100%" }} />
            <Stack spacing="5"  w="100%" p="5">
              <Heading size="lg">{name}</Heading>

              <Heading size="md">${selectedVariant.price}</Heading>

              <Text>{description}</Text>

              <DietTags tags={tags} />

              {variants.length >= 2 && <VariantsSection />}

              {extras.length >= 1 && <ExtrasSection />}

              {posibleCourseMoments.length >= 2 && <CourseMomentSection />}

              {aditionalOptions.length >= 1 && <AditionalOptionsSection />}

              <Input
                placeholder="Pedido especial?"
                size="lg"
                value={special}
                onChange={handleSpecial}
              />

              <CoursesGroup plate={props.item} amount={amount} />

              {/* <Text w="500px">{JSON.stringify(course)}</Text> */}
            </Stack>

            <BottomFloatingButtonGroup />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
