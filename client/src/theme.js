import { extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "./components/buttonTheme";
import { selectTheme } from "./selectTheme";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "white",
        color: "black",
      },
      input: {
        bg: "white",
        color: "black",
        _selected: {
          border: "5px",
        },
      },
    },
  },
  components: {
    Button: buttonTheme,
    Select: selectTheme,
  },
});
