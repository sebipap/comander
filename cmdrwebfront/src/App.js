import { Box, Heading } from "@chakra-ui/react";
import { Route, Routes, useParams } from "react-router-dom";
import { Commands } from "./pages/commands";
import { Menu } from "./pages/menu";
import { ConfirmationPage } from "./pages/confirmationPage.js";
import { Dashboard } from "./pages/dashboard";
import { NewMenuItem } from "./pages/dashboard/newMenuItem";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="commands" element={<Commands />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/newMenuItem" element={<NewMenuItem />} />

        <Route path="menu/:table" element={<Menu/>} />
        <Route path="*" element={"no existe esta pagina!"} />
        <Route path="/confirmation/:courseId" element={<ConfirmationPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
