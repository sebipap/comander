import { AddIcon, AttachmentIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  CloseButton,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  VStack,
  Stack,
  Textarea,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  InputGroup,
  InputLeftElement,
  Tag,
  Avatar,
  TagLabel,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";

import { useState } from "react";
import { newMenuItem } from "../../scripts/newMenuItem";
import { dietTagData, getDietData } from "../menu/dietTags";

export const NewMenuItem = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tags, setTags] = useState(["vegan"]);
  const [variants, setVariants] = useState([]);
  const [extras, setExtras] = useState([]);
  const [fieldsData, setFieldsData] = useState({
    name: "",
    category: "",
    description: "",
    imgURL: "",
  });

  const handleFieldsChange = (event) => {
    const { value, name } = event.target;
    setFieldsData({ ...fieldsData, [name]: value });
  };

  const addVariant = (variant) => setVariants(variants.concat(variant));
  const addExtra = (extra) => setExtras(extras.concat(extra));

  const removeVariant = (variantToDelete) =>
    setVariants(variants.filter((variant) => variant != variantToDelete));
  const removeExtra = (extraToDelete) =>
    setExtras(extras.filter((extra) => extra != extraToDelete));

  const handleSubmit = async () => {
    const itemObj = { ...fieldsData,
			tags, variants, extras };
    const response = await newMenuItem(itemObj);
  };

  const CreateChildren = ({ title, values, handleAdd, handleRemove }) => {
    const [item, setItem] = useState({
      name: "",
      price: 0,
    });

    const handleChange = (event) => {
      const { name, value } = event.target;
      setItem({ ...item, [name]: value });
    };

    return (
      <Stack spacing={4} p="3">
        <Heading size={"md"}> {title} </Heading>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Precio</Th>
            </Tr>
          </Thead>
          <Tbody>
            {values.map((value) => (
              <Tr>
                <Td>{value.name}</Td>
                <Td>${value.price}</Td>
                <CloseButton onClick={() => handleRemove(value)} />
              </Tr>
            ))}
          </Tbody>
        </Table>
        <HStack>
          <InputGroup>
            <Input
              type="text"
              placeholder="Nombre "
              name="name"
              value={item.name}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="$"
            />
            <Input
              placeholder="Precio"
              type={"number"}
              name="price"
              value={item.price}
              onChange={handleChange}
            />
          </InputGroup>

          <IconButton icon={<AddIcon />} onClick={() => handleAdd(item)} />
        </HStack>
      </Stack>
    );
  };

  const DietTagsEdit = (props) => {
    const [onCustomInput, setIsOnCustomInput] = useState(false);
    const [customTag, setCustomTag] = useState("");

    const handleCustomTagInput = (event) => setCustomTag(event.target.value);

    const handleAddCustomTag = () => {
      addTag(customTag);
      setCustomTag("");
    };

    const removeTag = (tagName) => {
      setTags(tags.filter((tag) => tag != tagName));
    };

    const addTag = (tagName) => setTags(tags.concat(tagName));

    return (
      <>
        <Box p="3" rounded="md">
          <Heading size="md"> Etiquetas </Heading>
          {props.tags.map((tag) => {
            const { imgURL, name } = getDietData(tag);

            const remove = () => {
              removeTag(tag);
            };

            return (
              <Tag size="lg" borderRadius="full" m="1">
                <Avatar src={imgURL} size="xs" name={name} ml={-1} mr={2} />
                <TagLabel>{name}</TagLabel>
                <CloseButton onClick={remove} />
              </Tag>
            );
          })}

          {onCustomInput ? (
            <HStack spacing="2">
              <Input
                placeholder="Otra etiqueta"
                onChange={handleCustomTagInput}
                value={customTag}
              />{" "}
              <Button onClick={handleAddCustomTag}>Agregar</Button>
            </HStack>
          ) : (
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Añadir
              </MenuButton>
              <MenuList>
                {dietTagData.map((diet) => {
                  const add = () => {
                    addTag(diet.name);
                  };
                  if (!tags.includes(diet.name))
                    return (
                      <MenuItem onClick={add}>{diet.displayName}</MenuItem>
                    );
                })}

                <MenuItem>
                  <Button onClick={() => setIsOnCustomInput(true)}>
                    Otra...
                  </Button>
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Box>
      </>
    );
  };

  return (
    <>
      <Button
        size="md"
        height="48px"
        width="200px"
        border="2px"
        borderColor="green.500"
        onClick={onOpen}
      >
        Añadir Nuevo Plato
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nuevo Plato</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack gap={10}>
              <Button
                style={{ borderRadius: 10, width: "100%", height: 100 }}
                rightIcon={<AttachmentIcon />}
              >
                Elegir una imagen
              </Button>
              <Stack spacing="5" w="100%" p="5">
                <Input
                  value={fieldsData.name}
                  onChange={handleFieldsChange}
                  placeholder="Nombre del Plato / Producto"
		              name="name"
									size="lg"
                />
                <Input
                  value={fieldsData.category}
                  onChange={handleFieldsChange}
                  placeholder="Categoría"
		              name="category"
								/>
                <Textarea
                  value={fieldsData.description}
                  onChange={handleFieldsChange}
                  placeholder="Describe el Producto...	"
		              name="description"
								/>
                <Input
                  value={fieldsData.imgURL}
                  onChange={handleFieldsChange}
                  placeholder="imgURL"
		              name="imgURL"
								/>

                {JSON.stringify(fieldsData)}

                <CreateChildren
                  title="Variantes"
                  values={variants}
                  handleAdd={addVariant}
                  handleRemove={removeVariant}
                />

                <CreateChildren
                  title="Extras"
                  values={extras}
                  handleAdd={addExtra}
                  handleRemove={removeExtra}
                />

                <DietTagsEdit tags={tags} />
              </Stack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
