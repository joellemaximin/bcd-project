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
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';


const Book = (props)=> {
	const [book, setBook] = useState([]);
	const [showLoading, setShowLoading] = useState(true);
	const [title, setId] = useState([])
	const [titleFrom, settitleFrom] = useState([])
	
	const handleClick = ()=> {
		settitleFrom(title)
	}

	useEffect(() => {
		// const fetchBook = async () => {
		// 	setShowLoading(true)
			axios
			  .get(`/api/bookrouter/search-by-letter/:title/${titleFrom}` )
				.then(res => {
					console.log(res)
					setBook(res.data)
				})
				.catch(err => {
					console.log(err)
				})
	}, [titleFrom]);
  
    return(
      <div className="navbar">
			<Input
				type='text'
				value={title}
				onChange={e => setId(e.target.value)}
			
			/>
			<Button
			  type='button'
			  onClick={handleClick}>Search</Button>
			<h2>{book.title}</h2>
			
		</div> 
    )
  
}
export default Book;

