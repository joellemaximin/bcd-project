import React, {useState, useEffect} from 'react';
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
	// const [error, setError] = React.useState(null);
	const history = useHistory()

	useEffect(() => {
		const fetchBook = async () => {
			fetch('/api/bookborrowed/')
				.then(res => res.json())
				.then(data => {
					setBook(data)
					console.log(data)
					// console.log(moment(data.returned_at).utc().format('MM/DD/YYYY'))

				})
				.catch(err => {
					console.log(err)
				})
		}
		fetchBook();
	}, []);




	

	return (
		<div className="books-home">
			
			<Button 
				onClick={() => history.push('/add-booking') }
			>
			Choisir un livre pour un élève
			</Button>

			<Table striped bordered hover >
				<thead>
					<tr>
						<th>NOM/LIVRE</th>
						<th>ELEVES</th>
						<th>DATE D'EMPRUNT</th>
						<th>DATE de RETOUR</th>
						<th>NOMBRE JOURS RESTANT</th>
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


		</div>
	
	)
	 
}

export default Bookings;