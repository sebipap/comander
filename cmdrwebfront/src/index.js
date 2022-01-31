import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Container>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Container>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
