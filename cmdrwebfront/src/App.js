import { Box, Heading, MenuItem } from "@chakra-ui/react";
import { Route, Routes, useParams } from "react-router-dom";
import { Commands } from "./pages/commands";
import { Menu } from "./pages/menu";
import { ConfirmationPage } from "./pages/confirmationPage.js";
import { EditMenuItems } from "./pages/dashboard/editMenuItems";
import { Orders } from "./pages/dashboard/orders";
import { Prices } from "./pages/dashboard/prices";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard/commands" element={<Commands />} />
        <Route path="/dashboard/orders" element={<Orders />} />
        <Route path="/dashboard/items" element={<EditMenuItems />} />
        <Route path="/dashboard/prices" element={<Prices />} />


        <Route path="menu/:table" element={<Menu/>} />
        <Route path="*" element={"no existe esta pagina!"} />
        <Route path="/confirmation/:courseId" element={<ConfirmationPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
