import React, {useState, useEffect} from 'react';
import {
	Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import Spinner from 'react-bootstrap/Spinner';
import { useParams, useHistory } from 'react-router-dom';


function ShowBook({match}) {
	const [showLoading, setShowLoading] = useState(true);
	const [error, setError] = React.useState(null);
	const history = useHistory()
	let id = match.params.id
	const [books, setBook] = useState([]);


	
	useEffect(() => {
	const fetchBook = async () => {
		setShowLoading(true)
		const response = await fetch(`/api/bookrouter/show-book/${id}`)
		const data = await response.json();
		console.log(data)
		setBook(data); 
		}
		fetchBook();
	}, [id]);


	return (

		<div className="books-home">
			{/* {showLoading &&
				<Spinner animation="border" role="status">
					<span className="sr-only">Loading...</span>
				</Spinner>
			} */}

			<Button
				variant="outline-primary"
				size="lg"
				onClick={() => {
					history.goBack()
			   }}>
				<FontAwesomeIcon icon={faArrowAltCircleLeft} />
			</Button>

			{
				books.map((book, key) => 
				
					<ul key={key}>
						<h3>Nom du livre:</h3>
						<ol>{book.title}</ol>

						<h3>Nom de collection:</h3>
						<ol>{book.collection}</ol>

						<h3>Editeur:</h3>
						<ol>{book.editor}</ol>

						<h3>Nom de l'auteur:</h3>
						<ol>{book.author}</ol>

						<h3>Nom de l'oeuvre:</h3>
						<ol>{book.oeuvre}</ol>

						<h3>Categorie:</h3>
						<ol>{book.title_category}</ol>

					</ul>
				
		  	)} 
		
		</div>
	
	)
	 
}

export default ShowBook;