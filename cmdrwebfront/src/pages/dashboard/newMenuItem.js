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
  Image,
  Tooltip,
  useToast,
} from "@chakra-ui/react";

import { useRef, useState } from "react";
import { newMenuItem } from "../../scripts/newMenuItem";
import { uploadImg } from "../../scripts/uploadImg";
import { dietTagData, getDietData } from "../menu/dietTags";

export const NewMenuItem = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tags, setTags] = useState(["vegan"]);
  const [variants, setVariants] = useState([]);
  const [extras, setExtras] = useState([]);
  const [imgFile, setImgFile] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imgURL, setImgURL] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleImgURLChange = (e) => setImgURL(e.target.value);

  const addVariant = (variant) => setVariants(variants.concat(variant));
  const addExtra = (extra) => setExtras(extras.concat(extra));

  const removeVariant = (variantToDelete) =>
    setVariants(variants.filter((variant) => variant != variantToDelete));
  const removeExtra = (extraToDelete) =>
    setExtras(extras.filter((extra) => extra != extraToDelete));

  const handleSubmit = () => {
    const itemObj = {
      name,
      category,
      description,
      imgURL: imgFile.name ,
      tags,
      variants,
      extras,
    };
     newMenuItem(itemObj)
      .then((res) => { 
        const {message, id} = res
      
    uploadImg(imgFile, id)
      .then((res) =>
        toast({
          title: res.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      )
      .catch((err) =>
        toast({
          title: err.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      );


        toast({
          title: message,
          description: id,
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      })
      .catch((err) =>
        toast({
          title: err.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        })

      
        
      );


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

  const fileUploader = useRef(null);
  const toast = useToast();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => setImgURL(e.target.result);
      reader.readAsDataURL(event.target.files[0]);

      setImgFile(event.target.files[0]);
    }
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
              {imgURL ? (
                <Tooltip label="Hace click en la foto para cambiarla">
                  <Image
                    style={{ borderRadius: 10, width: "100%" }}
                    rightIcon={<AttachmentIcon />}
                    onClick={() => fileUploader.current.click()}
                    src={imgURL}
                    alt={imgURL}
                  />
                </Tooltip>
              ) : (
                <Button
                  style={{ borderRadius: 10, width: "100%", height: 100 }}
                  rightIcon={<AttachmentIcon />}
                  onClick={() => fileUploader.current.click()}
                >
                  Elegir una imagen
                </Button>
              )}

              <input
                type="file"
                style={{ display: "none" }}
                ref={fileUploader}
                onChange={onImageChange}
                accept="/image"
              />

              <Stack spacing="5" w="100%" p="5">
                <Input
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Nombre del Plato / Producto"
                  name="name"
                  size="lg"
                />
                <Input
                  value={category}
                  onChange={handleCategoryChange}
                  placeholder="Categoría"
                  name="category"
                />
                <Textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Describe el Producto...	"
                  name="description"
                />
                <Input
                  value={imgURL}
                  onChange={handleImgURLChange}
                  placeholder="imgURL"
                  name="imgURL"
                />

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
