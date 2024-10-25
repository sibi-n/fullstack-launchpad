import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { appTheme } from "theme";
import Pages from "components/pages";
import { AuthProvider } from "store";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={appTheme}>
        <AuthProvider>
          <Pages />
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
