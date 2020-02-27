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
import Spinner from 'react-bootstrap/Spinner';

// import { Button } from 'react-router-dom';

const BookUnique = (props)=> {
	const [booker, setBook] = useState([]);
	const [showLoading, setShowLoading] = useState(true);
	const [error, setError] = React.useState(null);
	
	const url = '/api/bookrouter'
	useEffect(() => {
		const fetchBook = async () => {
			setShowLoading(true)
			fetch(url)
				.then(res => res.json())
				.then(data => {
					setBook(data)
					setShowLoading(false)
				})
				.catch(err => {
					console.log(err)
				})
		}
		fetchBook();
	}, []);

	const editBook = (id) => {
		props.history.push({
			pathname: '/edit-book/' + id
		});
	}




	const returnBook = () => {
		props.history.push({
			pathname: '/'
		});
	}



	return (
		<div className="books-home">
			{showLoading &&
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    }
			<Button
				variant="default"
				size="lg"
				onClick={()=> {returnBook()}}

				>
				Return
			</Button>

			{booker.map((book, key) => 

			<div key={key} >
				<h2>Nom du livre: </h2>
				  <p>{book.title}</p>
				<h2>Edition: </h2>
					<p>{book.edition}</p>
				<h2>Auheur:</h2>
					<p>{book.author}</p>
				<h2>Collection:</h2>
					<p>{book.collection}</p>
				<h2>Oeuvre</h2>
					<p>{book.oeuvre}</p>
				<h2>Categorie:</h2>
					<p>{book.title_category}</p>
				<h2>Action</h2>

				<Button variant="outline-primary"
					// to={"/edit-book/"+ book.id}
					size="sm"
					onClick={()=> {editBook(book.bookID)}}
				>
				Editer
				</Button>
			

	
			</div>
			)}

		</div>
	
	)
	 
}

export default BookUnique;