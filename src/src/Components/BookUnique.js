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
import { useParams } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

// // import { Button } from 'react-router-dom';

function BookUnique({match, props}) {
	// const [{title, collection, author, oeuvre,editor, categoryId}, setBook] = useState({title: '', collection: '', author: '', oeuvre: '', categoryId: '', editor: ''});
	const [showLoading, setShowLoading] = useState(true);
	const [error, setError] = React.useState(null);
	let id = match.params.id
	const [book, setBook] = useState([]);



	
	useEffect(() => {
		async function fetchBook() {
		  const response = await fetch(`/api/bookrouter/book/${id}`)
			const data = await response.json();
			console.log(data.bookID)
		  setBook(data)
		}
	
		fetchBook();
	}, [id]);

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
			{/* {showLoading &&
				<Spinner animation="border" role="status">
					<span className="sr-only">Loading...</span>
				</Spinner>
			} */}

		  {book && (
				<div>
					<p>{book.title}</p>
					<p>{book.collection}</p>
					<p>{book.editor}</p>
					<p>{book.author}</p>
					<p>{book.oeuvre}</p>
					<p>{book.category_id}</p>
					
					<Button variant="outline-primary"
						// to={"/edit-book/"+ book.id}
						size="sm"
						onClick={()=> {editBook(book.bookID)}}
					>
					Editer
					</Button>
				
				</div>
      )}

		

			<Button
				variant="default"
				size="lg"
				onClick={()=> {returnBook()}}

				>
				Return
			</Button>

		</div>
	
	)
	 
}

export default BookUnique;