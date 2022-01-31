import {useState, useEffect} from "react"

export const  Clock = (props) => {
	const [time, setTime] = useState(0)
	const [from, setFrom] = useState(props.from)
    
	const incrementTime = () => setTime()
    
	const tick = () => {
	  setTimeout(() => {
	    incrementTime()
	    tick()
	  }, 1000)
	}
    
	useEffect(tick, [])
    
	return <h3>
		{Math.round((Date.now() - props.from)/1000)}

	</h3>
		
      }