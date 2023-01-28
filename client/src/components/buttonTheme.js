import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const brandPrimary = defineStyle({
  bg: "rgba(0,0,0,.1)",
  color: "black",
  borderRadius: "5px",
  p: "5px 10px",
  _hover: {
    bg: "rgba(2, 124, 218)",
    color: "white",
    textDecoration: "underline",
  },
});

export const buttonTheme = defineStyleConfig({
  variants: { brandPrimary },
  defaultProps: {
    // size: "xl",
    variant: "brandPrimary",
  },
});
