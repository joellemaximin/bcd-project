import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
	Col,
  Input,
  Form,
	FormGroup,
	Container,
  Label
} from 'reactstrap';
import { 
	Spinner,
	Button, 
	FormControl
} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
const AddBooking = (props)=> {
  const [inputs, setInputs] = useState(
    {title: '', name: '', numberOfdays: '', returned_at: '', start_date: ''}
  );
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);


	useEffect(() => {
		const fetchBook = async () => {
			fetch('/api/bookborrowed/')
			.then(res => res.json())
			.then(data => {
				setInputs(data)
			})
			.catch(err => {
				console.log(err)
			})
		}
		fetchBook();
	}, []);

	useEffect(() => {
		const fetchBook = async () => {
			fetch('/api/students/')
				.then(res => res.json())
				.then(data => {
					setStudents(data)
				})
		}
		fetchBook();
	}, []);

	useEffect(() => {
		const fetchBook = async () => {
			fetch('/api/bookrouter/')
				.then(res => res.json())
				.then(data => {
					setBooks(data)
				})
		}
		fetchBook();
	}, []);


	const addBooking = async (e) => {
    e.preventDefault()
    axios.post('/api/bookborrowed/', inputs,
      {
      validateStatus: function (status) {
      return status < 600; // Reject only if the status code is greater than or equal to 500
      }}
    )
    .catch(function (error) {
      console.log(error)
    })  
    .then(function (response) {
			props.history.push('/booking-book')
			
      console.log(response)
    })
  }

  const handleInputChange = event => {
    event.persist();
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value});
	}
	


	return (
		<div className="books-home">
			<Container>
				<Form onSubmit={addBooking} >


					<FormGroup row>
						<Label sm={2}>
								Choisir l'élève
						</Label>
						<Col sm={6}>
							<FormControl 
								as="select"
								name="name"
								onChange={handleInputChange}
							>
								
							{students.map((student, key) => 
								<option value={student.id}  key={key} className="" >{student.name}</option>
							)}
							
							</FormControl>       
					</Col> 
				</FormGroup>


				<FormGroup row>
						<Label sm={2}>
								Choisir le livre
						</Label>
						<Col sm={6}>
							<FormControl 
								as="select"
								name="title"
								onChange={handleInputChange}
							>
								
							{books.map((book, key) => 
								<option value={book.id}  key={key} className="" >{book.title}</option>
							)}
							
							</FormControl>       
					</Col> 
				</FormGroup>

					<FormGroup row>
						<Label sm={2}>
							Nombre de jours
						</Label>
						<Col sm={2}>
						<Input
							value={inputs.numberOfdays || ""}
							onChange={handleInputChange}
							name="numberOfdays"
						/>
						</Col>
					</FormGroup>

					<FormGroup row>
						<Label sm={2}>
							Date de l'emprunt
						</Label>
						<Col sm={4}>
						<Input
							type="date"
							value={inputs.start_date || ""}
							onChange={handleInputChange}
							name="start_date"
						/>
						</Col>
					</FormGroup>

					<FormGroup row>
						<Label sm={2}>
							Remise du livre
						</Label>
						<Col sm={4}>
						<Input
							type="date"
							value={inputs.returned_at || ""}
							onChange={handleInputChange}
							name="returned_at"
						/>
						</Col>
					</FormGroup>


					<div className="submit_newbook">
						<Button
						className="waves-effect waves-light btn"
						type="submit"
						>
						Ajouter un nouveau livre
						</Button>
					</div>

				</Form>
			</Container>
		</div>
	
	)
	 
}

export default AddBooking;