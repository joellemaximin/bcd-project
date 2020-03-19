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


// const AddBooking = (props)=> {
//   const [inputs, setInputs] = useState(
//     {numberOfdays: '', returned_at: '', start_date: ''}
//   );
//   const [students, setStudents] = useState([]);
//   const [books, setBooks] = useState([]);
//   const [showLoading, setShowLoading] = useState(false);
// //   const [isBooking, setBook] = useState(false);

// 	const handleInputChange = event => {
// 	event.persist();
// 	setInputs({
//     ...inputs,
// 	[event.target.name]: event.target.value});
// 	// (inputs.filter(input => input.books !== books));
    
// 	}

//     const addBooking = async (e) => {
// 		setShowLoading(true);
// 		e.preventDefault()			

// 		axios.post('/api/bookborrowed/', inputs)
// 			.catch((error) => {
// 				console.log(error)
// 			})
			
// 		.then((response) => {
// 			setShowLoading(false);
// 			// setBooks(data)
// 			// setBook({books: [...filterBook, inputs]})
// 			props.history.push('/booking-book')
// 		});
		

// 	}

// 	const fetchStudents = async () => {
// 		fetch('/api/students/')
// 		.then(res => res.json())
// 		.then(data => {
// 			setStudents(data);
// 		});
// 	};


// 	const fetchBook = async () => {
// 		fetch('/api/bookrouter/books-left/')
// 		.then(res => res.json())
// 		.then(data => {
// 			setBooks(data)
// 		});
// 	};


// 	useEffect(() => {
// 		fetchBook();
// 		fetchStudents();
// 	}, []);
	
	

// 	// if(books.filter(book => book.title !== inputs.title)) {

// 	// useEffect(()=> {
// 	// 	// setBook({books: [...filterBook, inputs]})
	 
// 	// 	setBooks(results)
// 	// 	console.log(results)
// 	// } ,[])

// 	// const onChange =(e)=> {
// 	// 	setResult(e.target.value);
// 	// }

// 	// const filterBook = books.filter(book => book.title !== inputs.title)



// 	return (
// 		<div className="books-home">
// 			<Container>
// 				<Form onSubmit={addBooking} >
// 					<FormGroup row>
// 						<Label sm={2}>
// 								Choisir l'élève
// 						</Label>
// 						<Col sm={6}>
// 							<FormControl 
// 								as="select"
// 								name="student_id"
// 								onChange={handleInputChange}
// 							>

// 							{students.map((student, key) => 
// 								<option value={student.id} key={key}>{student.name}</option>
// 							)}
							
// 							</FormControl>       
// 					    </Col> 
// 				</FormGroup>


// 				<FormGroup row>
// 						<Label sm={2}>
// 								Livre disponible
// 						</Label>
// 						<Col sm={6}>
// 							<FormControl 
// 								as="select"
// 								name="book_id"
// 								onChange={handleInputChange}
// 							>
								
// 							{books.map((book, key) => 
// 								<option value={book.bookID} key={key}>{book.title}</option>
// 							)}
							
// 							</FormControl>       
// 					</Col> 
// 				</FormGroup>

// 					<FormGroup row>
// 						<Label sm={2}>Nombre de jours</Label>
// 						<Col sm={2}>
// 						<Input
// 							value={inputs.numberOfdays || ""}
// 							onChange={handleInputChange}
// 							name="numberOfdays"
// 						/>
// 						</Col>
// 					</FormGroup>

// 					<FormGroup row>
// 						<Label sm={2}>
// 							Date de l'emprunt
// 						</Label>
// 						<Col sm={4}>
// 						<Input
// 							type="date"
// 							value={inputs.start_date || ""}
// 							onChange={handleInputChange}
// 							name="start_date"
// 						/>
// 						</Col>
// 					</FormGroup>

// 					<FormGroup row>
// 						<Label sm={2}>
// 							Remise du livre
// 						</Label>
// 						<Col sm={4}>
// 						<Input
// 							type="date"
// 							value={inputs.returned_at || ""}
// 							onChange={handleInputChange}
// 							name="returned_at"
// 						/>
// 						</Col>
// 					</FormGroup>


// 					<div className="submit_newbook">
// 						<Button
// 						className="waves-effect waves-light btn"
// 						type="submit"
// 						>
// 						Ajouter un nouveau livre
// 						</Button>
// 					</div>

// 				</Form>

// 				<div>

// 				</div>
// 			</Container>
// 		</div>

const AddBooking = (props)=> {
	const [inputs, setInputs] = useState(
	  {numberOfdays: '', returned_at: '', start_date: ''}
	);
	const [students, setStudents] = useState([]);
	const [books, setBooks] = useState([]);
	const [showLoading, setShowLoading] = useState(false);
  
	  const handleInputChange = event => {
	  event.persist();
	  setInputs({
	  ...inputs,
	  [event.target.name]: event.target.value});
	  }
  
	const addBooking = async (e) => {
	  setShowLoading(true);
	  e.preventDefault()
		axios.post('/api/bookborrowed/', inputs)
		.catch(function (error) {
			console.log(error)
		})  
	  .then(function (response) {
		setShowLoading(false);
		props.history.push('/booking-book')
			console.log(response)
		})
  
	  }
  
  
	  useEffect(() => {
		  const fetchStudents = async () => {
			  fetch('/api/students/')
				  .then(res => res.json())
				  .then(data => {
					  setStudents(data)
				  })
		  }
		  fetchStudents();
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
								  name="student_id"
								  onChange={handleInputChange}
							  >
  
							  {students.map((student, key) => 
								  <option value={student.id} key={key}>{student.name}</option>
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
								  name="book_id"
								  onChange={handleInputChange}
							  >
								  
							  {books.map((book, key) => 
								  <option value={book.bookID} key={key}>{book.title}</option>
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