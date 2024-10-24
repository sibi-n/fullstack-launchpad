import { baseTheme, extendTheme } from "@chakra-ui/react";
import { getColor } from "@chakra-ui/theme-tools";
import { theme } from "@chakra-ui/theme";

const borderColor = getColor(theme, "gray.200", "gray");

export const appTheme = extendTheme({
  fonts: {
    body: "Inter, system-ui, sans-serif",
    heading: "Inter, Georgia, serif",
  },
  colors: {
    brand: {
      100: "#eaf0fd",
      200: "#c6d6fa",
      300: "#6792f1",
      400: "#356eec",
      500: "#2563EB",
      600: "#19429e",
      700: "#153988",
      800: "#123175",
      900: "#102a65",
      default: "#2563EB",
      bg: "#2563EB",
      text: "#fff",
      card: "#0A99FF",
    },
    subtle: baseTheme.colors.gray[600],
  },
  styles: {
    global: {
      "html, body": {
        bg: "white",
        color: "gray.700",
        fontWeight: "medium",
      },
      a: {
        color: "brand.600",
        _hover: {
          textDecoration: "none",
        },
      },
    },
  },
  layerStyles: {
    base: {
      bg: "gray.50",
      border: "1px solid",
      borderColor,
    },
  },
  borders: {
    "1px": `1px solid ${borderColor}`,
    "2px": `2px solid ${borderColor}`,
  },
});
