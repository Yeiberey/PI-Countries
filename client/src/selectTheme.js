import { selectAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys);
console.log(definePartsStyle);
const brandPrimary = definePartsStyle({
  field: {
    color: "black",
    background: "rgba(0,0,0,.1)",
    borderColor: "black",
    borderRadius: "5px",
  },
  icon: {
    color: "black",
  },
});

export const selectTheme = defineMultiStyleConfig({
  variants: { brandPrimary },
  defaultProps: {
    variant: "brandPrimary",
    colorScheme: "white",
  },
});
