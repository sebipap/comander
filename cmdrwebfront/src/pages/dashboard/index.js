import { Button, Heading, SimpleGrid, Switch } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { MenuNav } from "../menu/menuNav";
import { NewMenuItem } from "./newMenuItem";

export const Dashboard = () => (
	<>

		{/* <MenuNav  /> */}

		<Heading>
			Dashboard!
		</Heading>

		<SimpleGrid spacing={3}>


			<NewMenuItem />



			<Button
				size='md'
				height='48px'
				width='200px'
				border='2px'
				borderColor='green.500'
			>
				Modificar Platos
			</Button>

			<Button
				size='md'
				height='48px'
				width='200px'
				border='2px'
				borderColor='green.500'
			>
				Cambiar Precios
			</Button>

		</SimpleGrid>



	</>
)