import { DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton, Tooltip } from "@chakra-ui/react";

export const DeleteButton = (props) => {
  return (
    <Box>
      <Tooltip label={props.label}>
        <IconButton
          icon={<DeleteIcon />}
          {...props}
          colorScheme={"red"}
					variant={"ghost"}
          size="sm"
        />
      </Tooltip>
    </Box>
  );
};
