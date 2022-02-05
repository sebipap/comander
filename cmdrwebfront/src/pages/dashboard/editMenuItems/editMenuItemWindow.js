import {
  AddIcon,
  AttachmentIcon,
  ChevronDownIcon,
  DeleteIcon,
  SpinnerIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
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
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Image,
  Tooltip,
  useToast,
  Container,
  Text,
} from "@chakra-ui/react";

import { useRef, useState } from "react";
import { DeleteButton } from "../../../components/DeleteButton";
import { deleteMenuItem } from "../../../scripts/deleteMenuItem";
import { newMenuItem } from "../../../scripts/newMenuItem";
import { uploadImg } from "../../../scripts/uploadImg";
import { dietTagData, getDietData } from "../../menu/dietTags";
import { MenuItemImage } from "../../menu/menuItemImage";

export const EditMenuItemWindow = (props) => {
  const [name, setName] = useState(props.item.name);
  const [category, setCategory] = useState(props.item.category.name);
  const [description, setDescription] = useState(props.item.description);
  const [imgURL, setImgURL] = useState(props.item.imgURL);
  const [variants, setVariants] = useState(props.item.variants);
  const [tags, setTags] = useState(props.item.tags);
  const [extras, setExtras] = useState(props.item.extras);
  const [aditionalOptions, setAditionalOptions] = useState(
    props.item.aditionalOptions
  );
  const [imgFile, setImgFile] = useState(null);
  const [loading, setLoading] = useState(false)

  const handleNameChange = (e) => setName(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const addVariant = (variant) => setVariants(variants.concat(variant));
  const addExtra = (extra) => setExtras(extras.concat(extra));
  const addAditionalOption = (option) =>
    setAditionalOptions(aditionalOptions.concat(option));

  const removeVariant = (variantToDelete) =>
    setVariants(variants.filter((variant) => variant != variantToDelete));
  const removeExtra = (extraToDelete) =>
    setExtras(extras.filter((extra) => extra != extraToDelete));

  const removeAditionalOption = (optionToDelete) =>
    setAditionalOptions(
      aditionalOptions.filter((option) => option != optionToDelete)
    );

  const addChildOption = (propertyName, optionName) => {
    const oldParentOption = aditionalOptions.find(
      (option) => option.propertyName == propertyName
    );
    const newParentOption = {
      ...oldParentOption,
      options: oldParentOption.options.concat(optionName),
    };
    setAditionalOptions(
      aditionalOptions
        .filter((option) => option.propertyName != propertyName)
        .concat(newParentOption)
    );
  };

  const handleSubmit = () => {
    const itemObj = {
      name,
      category,
      description,
      imgURL: imgFile ? imgFile.name : imgURL,
      tags,
      variants,
      extras,
      aditionalOptions,
    };
    setLoading(true)
    newMenuItem(itemObj)
      .then((res) => {
        const { message, id, error } = res;

        toast({
          title: error ? "Error Al Guardar!" : "Guadado!",
          description: error ? error : message,
          status: error ? "error" : "success",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false)

        if (imgFile && !error) {
          uploadImg(imgFile, id)
            .then((res) =>
              {toast({
                title: "Se Guardó la Imagen",
                description: res.message,
                status: "success",
                duration: 9000,
                isClosable: true,
              })
              setLoading(false)}

            )
            .catch((err) =>
              toast({
                title: err.message,
                status: "error",
                duration: 9000,
                isClosable: true,
              })
            );
        }
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

  const handleRemove = () => {
    deleteMenuItem(props.item._id)
      .then((res) =>
        toast({
          title: res.error ? "Error Al Guardar!" : "Guadado!",
          description: res.error ? res.error : res.message,
          status: res.error ? "error" : "success",
          duration: 9000,
          isClosable: true,
        })
      )
      .catch((err) =>
        toast({
          title: err,
          description: err,
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      );
  };

  const RemoveButton = () => {
    const [onRemove, setOnRemove] = useState(false);

    return onRemove ? (
      <Button colorScheme={"red"} rightIcon={<DeleteIcon />}>
        Confirmar
      </Button>
    ) : (
      <Button
        colorScheme={"red"}
        variant={"outline"}
        onClick={() => setOnRemove(true)}
        rightIcon={<DeleteIcon />}
      >
        Eliminar
      </Button>
    );
  };

  const ConfigurationArea = ({ title, values, handleAdd, handleRemove }) => {
    const [item, setItem] = useState({
      name: "",
      price: 0,
    });

    const handleChange = (event) => {
      const { name, value } = event.target;
      setItem({ ...item, [name]: value });
    };

    return (
      <Stack spacing={4} p="3" border={"1px solid #DDDDDD "} rounded="lg">
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
                <DeleteButton
                  onClick={() => handleRemove(value)}
                  label={`Eliminar "${value.name}"`}
                />
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
        <Stack p="3" spacing="3" border={"1px solid #DDDDDD "} rounded="lg">
          <Heading size="md"> Etiquetas </Heading>
          <Container>
            {props.tags.map((tag) => {
              const { imgURL, name } = getDietData(tag);

              const remove = () => removeTag(tag);

              return (
                <Tag size="lg" borderRadius="full" m="1">
                  <Avatar src={imgURL} size="xs" name={name} ml={-1} mr={2} />
                  <TagLabel>{name}</TagLabel>
                  <DeleteButton label={`Eliminar ${name}`} onClick={remove} />
                </Tag>
              );
            })}
          </Container>

          {onCustomInput ? (
            <HStack>
              <Input
                placeholder="Otra etiqueta"
                onChange={handleCustomTagInput}
                value={customTag}
              />
              <IconButton icon={<AddIcon />} onClick={handleAddCustomTag} />
            </HStack>
          ) : (
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                rightIcon={<AddIcon />}
              >
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
        </Stack>
      </>
    );
  };

  const AddConfiguration = () => {
    const [isOnAdd, setIsOnAdd] = useState(false);
    const [propertyName, setPropertyName] = useState("");
    const handlePropertyName = (event) => setPropertyName(event.target.value);
    const handleIsOnAdd = () => setIsOnAdd(true);

    const handleAddConfiguration = () => {
      addAditionalOption({ propertyName: propertyName, options: [] });
    };

    return (
      <Container p="3">
        {isOnAdd ? (
          <HStack>
            <Input
              placeholder="Nueva Configuracion del producto"
              value={propertyName}
              onChange={handlePropertyName}
            />

            <IconButton
              colorScheme={"teal"}
              icon={<AddIcon />}
              onClick={() => handleAddConfiguration()}
            />
          </HStack>
        ) : (
          <Button
            colorScheme="teal"
            w="100%"
            onClick={handleIsOnAdd}
            rightIcon={<AddIcon />}
          >
            Agregar Nueva Configuracion
          </Button>
        )}
      </Container>
    );
  };

  const AditionalOption = ({ option }) => {
    const [newOption, setNewOption] = useState("");
    const handleNewOption = (e) => setNewOption(e.target.value);

    const handleAddNewOption = () => {
      addChildOption(option.propertyName, newOption);
    };

    return (
      <Stack p="3" border="1px solid #DDDDDD" rounded={"md"} spacing="3">
        <DeleteButton
          onClick={() => removeAditionalOption(option)}
          label={`Eliminar configuracion "${option.propertyName}"`}
        />

        <Heading size="md">{option.propertyName}</Heading>

        {option.options.map((op) => (
          <li>{op}</li>
        ))}

        <HStack>
          <Input
            placeholder="Opcion"
            onChange={handleNewOption}
            value={newOption}
          />
          <IconButton icon={<AddIcon />} onClick={handleAddNewOption} />
        </HStack>
      </Stack>
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
    <Modal isOpen="true" size="xl" onClose={props.close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{name ? `Editar ${name}` : "Nuevo Plato"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack gap={10}>
            {imgURL ? (
              <Tooltip label="Hace click en la foto para cambiarla">
                <Box>
                  {imgFile ? (
                    <Image
                      src={imgURL}
                      style={{ borderRadius: 10, width: "100%" }}
                      onClick={() => fileUploader.current.click()}
                    />
                  ) : (
                    <MenuItemImage
                      item={props.item}
                      style={{ borderRadius: 10, width: "100%" }}
                      onClick={() => fileUploader.current.click()}
                    />
                  )}
                </Box>
              </Tooltip>
            ) : (
              <Button
                w="100%"
                h={200}
                rightIcon={<AttachmentIcon />}
                onClick={() => fileUploader.current.click()}
                rounded={"lg"}
                colorScheme={"teal"}
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

              <Heading size="lg">Configuraciones</Heading>

              <ConfigurationArea
                title="Variantes"
                values={variants}
                handleAdd={addVariant}
                handleRemove={removeVariant}
              />

              <ConfigurationArea
                title="Extras"
                values={extras}
                handleAdd={addExtra}
                handleRemove={removeExtra}
              />

              <DietTagsEdit tags={tags} />

              {aditionalOptions.map((option) => (
                <AditionalOption option={option} />
              ))}

              <AddConfiguration />
            </Stack>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={4}>
            <Button onClick={props.close}>Cancelar</Button>

            <RemoveButton />

            <Button
              colorScheme="green"
              onClick={handleSubmit}
              isLoading={loading}
              rightIcon={<AddIcon />}
              loadingText='Guardando'

            >
              Guardar
            </Button>
  
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
