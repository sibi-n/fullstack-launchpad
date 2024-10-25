import Pages from "./components/pages/Page";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Pages />
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
