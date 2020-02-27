import React, {useState, useEffect} from 'react';
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
	const [searchTerm, setSearch] = useState('')



	//input search books
// 	useEffect(() => {
// 		const fetchBook = async () => {
// 			fetch('/api/bookrouter/get')
// 				.then(res => res.json())
// 				.then(data => {
// 					setBook(data)
// 					setShowLoading(false)
// 				})
// 				.catch(err => {
// 					console.log(err)
// 				})
// 		}
// 		fetchBook();
//   }, [id]);
  
    return(
      <div className="navbar">
			<Input
				type='search'
				value={id}
				onChange={e => setId(e.target.value)}
			
			/>
			<h2>{book.title}</h2>
		</div> 
    )
  
}
export default Book;

