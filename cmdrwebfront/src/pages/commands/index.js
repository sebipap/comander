import { useEffect, useState } from "react";

import { Command } from "./Command";


export const Commands = () => {
	const [commands, setCommands] = useState(null);
	const [lastUpdate, setLastUpdate] = useState(null);

	const fetchData = () => {
	  setTimeout(() => {
	    fetch("http://192.168.1.60:5000/api/command/all", { method: "GET" })
	      .then((res) => res.json())
	      .then((res) => setCommands(res))
	      .then(() => {
		fetchData();
		setLastUpdate(Date.now());
	      });
	  }, 1000);
	};
	useEffect(fetchData, []);
    
	if(commands) return (
	  <>
	
	    <div style={{width: "100%" }}>
	    {commands.map((command) => (
	      <Command command={command} />
	    )).reverse()}
	    </div>

	  </>
	);
	else return "Loading"
      };