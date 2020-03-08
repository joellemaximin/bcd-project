import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {
	Form,
	FormGroup,
	Label,
	Input,
	Button,
	Table 
} from 'reactstrap';
// import { Button } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import Book from './Book';

const SwitchButtons = (props)=> {
	const [books, setBook] = useState([]);
	
	useEffect(() => {
		const fetchBook = async () => {
			fetch('/api/bookrouter/')
				.then(res => res.json())
				.then(data => {
					setBook(data)
				})
				.catch(err => {
					console.log(err)
				})
		}
		fetchBook();
    }, []);
    

	const displayAZ = async () => {
		const display = '/api/bookrouter/order/title';

		axios.get(display)
			.then((result) => {  
				console.log(result)
			});
		
    }
    
	const displayZA = async () => {
		const display = '/api/bookrouter/order/title-desc';

		axios.get(display)
			.then((result) => {  
				console.log(result)
			});
		
	}



	return (
		<div className="buttons">
			
			<Button
              className="reverseButton"
              size="sm"
              onClick={()=> {displayAZ(books)}}
            >
            A-Z
            </Button>

            <Button
              className="inverseButton"
              size="sm"
              onClick={()=> {displayZA(books)}}
            >
            Z-A
            </Button>

		</div>
	
	)
	 
}

export default SwitchButtons;