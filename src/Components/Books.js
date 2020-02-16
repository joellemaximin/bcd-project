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
import Book from './Book';

const Books = (props)=> {
	const [books, setBook] = useState([]);
	const [showLoading, setShowLoading] = useState(true);
	const [error, setError] = React.useState(null);
	
	useEffect(() => {
		const fetchBook = async () => {
			setShowLoading(true)
			fetch('/api/bookrouter')
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



	const deleteBook = (id) => {
		setShowLoading(true);
		const book =  { title: book.title, edition: book.edition, title_category: parseInt(book.title_category), oeuvre: book.oeuvre, author: book.author};
		fetch.delete('/api/bookrouter/delete/' + props.id, book)
			.then((res) => {res.json()
				setShowLoading(false);
				props.history.push('/')
			})
			.catch((error) => setShowLoading(false));

		console.log('..update')
	}

	 // deleteBook(){
	 //     console.log('..deleted')
	 // }
	// const showDetail = (id) =>{
	// 	props.history.push({
	// 		pathname: "/edit-book/"+ id
	// 	}

    if (books.showLoading) return <Spinner animation='border' role='status' >
	<span className="sr-only">Chargement...</span>
	</Spinner> 
	return (
		<div className="books-home">
			
			{/* {showLoading && <Spinner animation='border' role='status' >
				<span className="sr-only">Chargement...</span>
	</Spinner> } */}
			

			<Book/>

			<Table striped bordered hover >
				<thead>
					<tr>
						<th>Nom du livre</th>
						<th>Edition</th>
						<th>Autheur</th>
						<th>Collection</th>
						<th>Oeuvre</th>
						<th>Categorie</th>
						<th>
						</th>

					</tr>
				</thead>
				<tbody>
					{books.map((book, key) => 
						<tr key={key} className="">
							<td>{book.title}</td>
							<td>{book.edition}</td>
							<td>{book.author}</td>
							<td>{book.collection}</td>
							<td>{book.oeuvre}</td>
							<td>{book.title_category}</td>

							
							<td>
									<Link variant="outline-primary"
									to={"/edit-book/"+book.id}
							>
							Edit
							</Link>
						</td>
						<td>
							<Button
							variant="danger"
							size="sm"
							onClick={()=> {deleteBook(book.id)}}
							>
							Delete
							</Button>
						</td>
					</tr>

					)
					}
					
				</tbody>
			</Table>
		
	     
			{/* <Button
					className="waves-effect waves-light btn"
					onClick={this.addCategory}
					>
					Ajouter une category
			</Button>
			<Form>
					<FormGroup>
						<Label for="BookSearch">Search</Label>
							<Input
							type="search"
							name="search"
							id="BookSearch"
							placeholder="search placeholder"
							/>
					</FormGroup>
			</Form> */}
			<h3>Liste des livres</h3>

		</div>
	
	)
	 
}

export default Books;