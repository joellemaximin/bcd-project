import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
	Table 
} from 'reactstrap';
import { 
	Spinner,
	Button 
} from 'react-bootstrap';
import moment from "moment";
import { useHistory } from "react-router-dom";

const Bookings = ()=> {
	const [books, setBook] = useState([]);
	const [isLoading, setShowLoading] = useState(true);
  	const [hasError, setErrors] = useState(false);
	const history = useHistory()
	const [time, setTimer] = useState([])
	// const [message, setMessage] = useState('')


  const fetchBook = async () => {
		setShowLoading(true)
		await fetch('/api/bookborrowed/')
		.then(res => res.json())
		.then(data=> {
			setShowLoading(false)
			setBook(data)
			console.log(data)
		})
		.catch(err => setErrors(err))

	}


	const fetchTime = async () => {
		const res	= await fetch('/api/bookborrowed/time-left-allbook/')
		res
			.json()
			.then(res=> setTimer(res))
			.catch(err => setErrors(err))
	}	
	// var dataF = isNaN(parseInt(data)) ? 0 : parseInt(data);
		

	const deleteBooking = async () => {
		const delteUrl = '/api/bookborrowed/delete/old-books/'
		setShowLoading(true);
		// if (window.confirm(`Are you sure you want to delete "${book.title}"`)) {
		axios.delete(delteUrl)
		.then((result) => {  
			// props.history.push('/booking-book');
			console.log(result)

		});		
	}

	useEffect(() => {
		fetchBook();
		fetchTime();
	}, []);
	
	
	
	
	
	return (
		<div className="books-home">
			{/* {isLoading && <p>Wait I'm Loading comments for you</p>} */}

			<Button 
				onClick={() => history.push('/add-booking') }
			>
			Choisir un livre pour un élève
			</Button>
{/*
      	{
			(message !== '' || books.length === 0 && <p className='text-danger'>{message}</p>)
		}
	    	 {
				books.length > 0 && */}
					<Table striped bordered hover>
					<thead>
						<tr>
							<th>NOM/LIVRE</th>
							<th>ELEVES</th>
							<th>DATE D'EMPRUNT</th>
							<th>DATE de RETOUR</th>
							<th>NOMBRE de jours pris</th>
						</tr>
					</thead>
					<tbody>
						{books.map((book, key) => 
							<tr key={key} className="">
								<td>{book.title}</td>
								<td>{book.name}</td>
								<td>{moment(book.start_date).utc().format('MM/DD/YYYY')}</td>
								<td>{moment(book.returned_at).utc().format('MM/DD/YYYY')}</td>
								<td>{book.numberOfdays} jours</td>
								
							</tr>
								
						)}
						
					</tbody>
				</Table>
			{/* }  */}
			

      		<h3>Liste des élèves qui lisent et nombre de jours restant</h3>
			{
				time.map((book, key) => 
				
					<ul key={key}>
						<ol>{book.title}</ol>
						<ol>{book.name}</ol>
						<ol>{isNaN(parseInt(book.timeleft)) ? 0 : parseInt(book.timeleft)} jours</ol>
					</ul>
				)
			} 

			<Button
				style={{ whiteSpace: "pre" }}
				variant="outline-danger"
				size="sm"
				//faire apparaitre une boxe de confirmation si suppression de beaucoup de livres en les affichant
				onClick={()=> {
					deleteBooking()}
				}
				> Supprimé les livres dépassés
			</Button>

     
		</div>
	
	)
	 
}

//if(window.confirm('Are you sure to delete this record?')){deleteBook(book.bookID)}}}

export default Bookings;