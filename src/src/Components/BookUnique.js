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

// // import { Button } from 'react-router-dom';

function BookUnique({ bookId, props}) {
	const [{title, collection, author, oeuvre,editor, categoryId}, setBook] = useState({title: '', collection: '', author: '', oeuvre: '', categoryId: '', editor: ''});
	const [showLoading, setShowLoading] = useState(true);
	const [error, setError] = React.useState(null);
	// let { id } = useParams();
	// const [books, setBook] = useState([]);
	// const url = `/api/bookrouter/book/` + props.match.params.id;

// 	// const url = '/api/bookrouter'
	// useEffect(() => {
	// 	async function fetchData() {
	// 		const response = await axios(`/api/bookrouter/book/${bookId}`);
	// 		setBook(response);
	// 	  }
	// 	  fetchData();
	// }, []);
	// 		axios
	// 		  .get('/api/bookrouter/book/')
	// 			.then(res => {
	// 				console.log(res)
	// 				setBook(res.data)
	// 			})
	// 			.catch(err => {
	// 				console.log(err)
	// 			})
	// }, []);
	// const getbook = async (id) => {
	// 	const book = '/api/bookrouter/book/' + id;

	// 	//setShowLoading(true);

	// 	axios.get(book)
	// 		.then((result) => {  
	// 			console.log(result)

	// 		});
		
	// }
	useEffect(() => {
		async function getBook(bookID) {
		  const resp = await axios(`/api/bookrouter/book/${bookID}`)
		  const data = await resp.json();
		  setBook({title: data.title, collection: data.collection, author: data.author, oeuvre: data.oeuvre, editor: data.editor, categoryId: data.category_id})
		}
	
		getBook();
	}, [bookId]);

	// const editBook = (id) => {
	// 	props.history.push({
	// 		pathname: '/edit-book/' + id
	// 	});
	// }


	const returnBook = () => {
		props.history.push({
			pathname: '/'
		});
	}

	// const uniquebook = booker.map(
	// 	(book, bookID) => <li key={bookID}>{book.title}</li>
	// );
	console.log(title)
	return (

		<div className="books-home">
			{showLoading &&
				<Spinner animation="border" role="status">
					<span className="sr-only">Loading...</span>
				</Spinner>
			}
			<p>{title}</p>
			<p>{collection}</p>
			<p>{author}</p>
			<p>{oeuvre}</p>

			{/* {book.data && book.data.map((book, i) => 
			  <div>{book.bookID}</div>)}

					 */}
			
		
      {/* <ul style={{ border: "1px black solid" }}>
				{books.data && books.data.map((book,key) => (
				<li key={key} >
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
				

		
			  </li>
			))}
			</ul>  */}

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