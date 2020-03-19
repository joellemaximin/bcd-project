import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "./styles.css";
import { useHistory } from "react-router-dom";
import {Table} from 'reactstrap';
import { Spinner, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch,faCheckCircle} from '@fortawesome/free-solid-svg-icons'


const Books = (props)=> {
	const [books, setBook] = useState([]);
	const [showLoading, setShowLoading] = useState(true);
	// const [error, setError] = React.useState(null);
	const [counter, setCounter] = useState([]);
	const [filtered ,setFilterd] = useState([]);
	const [result , setResult] = useState("");
	const history = useHistory()

	// const handleClose = () => setShow(false);
	// const handleShow = () => setShow(true);
  
	const fetchBook = async () => {
		setShowLoading(true)
		fetch('/api/bookrouter/')
			.then(res => res.json())
			.then(data => {
				setShowLoading(false)
				setBook(data)
				setFilterd(data);//filter update of tiltes
			
			})
			.catch(err => {
				console.log(err)
			})
	}


    const editBook = (id) => {
		props.history.push({
			pathname: '/edit-book/' + id
		});
	}

 
    const displayBook = (id) => {
		props.history.push({
			pathname: '/book/' + id
		});
	}

	const deleteBook = async (id) => {
		const delteUrl = '/api/bookrouter/delete/book/' + id;

		setShowLoading(true);
		// if (window.confirm(`Are you sure you want to delete "${book.title}"`)) {

			axios.delete(delteUrl)
			.then((result) => {  
				props.history.push('/');
				console.log(result)

			});
		// }
		
	}


	function getCount() {
		setShowLoading(true)
		fetch('/api/bookrouter/counter/countBooks')
		.then(res => res.json())
		.then(data => {
			// console.log(data)
			setCounter(data)
		})
		.catch(err => {
			console.log(err)
		})
	}
	
	//componentDidMount? apres entrer 

	useEffect(()=> {
		const results = filtered.filter(res=> res.title.toLowerCase().includes(result)); 
		setBook(results)
	} ,[result])
	
	const onChange =(e)=> {
		setResult(e.target.value);
	}

	useEffect(() => {
		getCount();
		fetchBook();
	}, [])


	
	return (
		<div className="books-home">
			{/* <SwitchButton /> */}
			
			{showLoading && <Spinner animation='border' role='status' >
				<span className="sr-only">Chargement...</span>
			</Spinner> } 
		{/* {isLoading ? (
			<Spinner />
		) : (
			 */}

			<input 
				type="text"
				placeholder="recherchez un livre .."
				value={result}
				onChange={onChange}
			/>	


			<Button 
				variant="outline-primary"
				size="sm"
				onClick={() =>
					history.push('/add-booking') } 
			>
			Emprunter un livre
			</Button>

			
			<Button
				variant="outline-primary"
				size="sm"
				onClick={() => 
					history.push('/add-book') } 
			>
			Ajouter un livre
			</Button>

			

			<h3>Il y a {counter} livres enregistrés. </h3>

			
			<Table striped bordered hover >
				<thead>
					<tr>
						<th></th>
						<th>Titre du livre</th>
						<th>Edition</th>
						<th>Auteur</th>
						<th>Collection</th>
						<th>Oeuvre</th>
						<th>Niveau Classe</th>
						<th>
						  Actions
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
							<Button
								variant="outline-primary"
								size="sm"
								onClick={()=> {editBook(book.bookID)}}
							>
							Edit
							</Button>
				
							<Button
                				style={{ whiteSpace: "pre" }}
								variant="outline-primary"
								size="sm"
								onClick={()=> {displayBook(book.bookID)}}
							>
								<FontAwesomeIcon icon={faSearch} />
							</Button>
			
						
							<Button	
								style={{ whiteSpace: "pre" }}
								variant="outline-danger"
								size="sm"	
								onClick={()=> {deleteBook(book.bookID)}}
							> X
							</Button>
							
						</td>
							
					</tr>

					)}
					
				</tbody>
			</Table>
		</div>
	
	)
	 
}


	// {deleteBook(book.bookID)}

export default Books;