import { Box, Heading } from "@chakra-ui/react";
import { Route, Routes, useParams } from "react-router-dom";
import { Commands } from "./pages/commands";
import { Menu } from "./pages/menu";
import { ConfirmationPage } from "./pages/confirmationPage.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="commands" element={<Commands />} />
        <Route path="menu/:table" element={<Menu/>} />
        <Route path="*" element={"no existe esta pagina!"} />
        <Route path="/confirmation/:courseId" element={<ConfirmationPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
