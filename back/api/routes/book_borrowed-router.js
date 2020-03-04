const express = require("express");
const router = express.Router();
const db = require("../models/bookborrowed_model");
const pool = require("../middleware/dbConnect")

router.use(express.json());


//counter books read by students every 3 months
// router.get('/book-read-by-student/:id', async (req, res)=>{
//     const bookFrommstudent = 'SELECT title FROM books AND name FROM students INNER JOIN book_borrowed ON books.`category_id`=categories.`id`';
//     pool.query(bookFrommstudent, function (err, result){
//       if (err) throw err;
//       res.send(result);
//       console.log(result);
  
//     });
// })


router.get("/", async (req, res) => {
  const getAllBooking = ' SELECT  students.`name`, books.`title` from `book_borrowed` JOIN students ON students.`id` = `book_borrowed`.`student_id` JOIN books ON `books`.`bookID` = `book_borrowed`.`book_id` ';
  pool.query(getAllBooking, function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result[0]);

  });
});



router.post("/", async (req, res) => {
  try {
    const book_borrowed = await db.add(req.body);
    console.log(req.body)
    res.status(200).json(book_borrowed);
  } catch (error) {
    res.status(500).json(error);
  }
}); 

//sum quantity of books read by students every months in one year

router.get('/time-left-allbook', async (req, res)=>{

  var DateEmpruntCalcule = 'SELECT id, ( UNIX_TIMESTAMP(DATE_ADD(start_date, INTERVAL numberOfdays DAY)) - UNIX_TIMESTAMP(NOW())) / 3600 / 24 timeleft FROM book_borrowed WHERE returned_at is null';
  pool.query(DateEmpruntCalcule, function (err, result){

    if (DateEmpruntCalcule <=  0) {
      statusEmprunt = 'Livre en retard'
      console.log(statusEmprunt)
      res.send(result)
    } 

    else if (DateEmpruntCalcule >= 3 ) {
      statusEmprunt = 'Le livre doit ëtre rendu dans moins de trois jours'
    }

    else if (DateEmpruntCalcule == 1){
      statusEmprunt = 'Le livre doit ëtre rendu demain'
    }

    else {
      statusEmprunt = "cool"
      console.log(statusEmprunt)
      res.send((result))

    }
  })
})

//display books read by one student
router.get("/student-books/:id", async (req, res) => {
  const getBooksByStudent = 'select books.title from book_borrowed JOIN books ON books.bookID = book_borrowed.book_id WHERE book_borrowed.student_id = ? ';
  pool.query(getBooksByStudent, [req.params.id],function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);
  })
}); 






module.exports = router;



// import React, { useState , useEffect} from 'react';
// import axios from 'axios';
// import FormControl from 'react-bootstrap/FormControl';
// import {
//   Col,
//   Input,
//   Form,
//   FormGroup,
//   Label,
//   Button }
// from 'reactstrap';
// import Spinner from 'react-bootstrap/Spinner';
// import { useParams } from 'react-router-dom';

// const EditBook = ({match})=> {
  
// 	const [showLoading, setShowLoading] = useState(true);
//   // const [location, classes, history] = props;
//   // const [books, setInputs] = useState(
//   //   {bookID: '', title: '', collection: '', author: '', oeuvre: '', category_id: '', editor: ''}
//   // );
//   const [books, setBook] = useState( {bookID: '', title: '', collection: '', author: '', oeuvre: '', category_id: '', editor: ''}
//   );
//   let id = match.params.id

//   // const Url = '/api/bookrouter/edit-book/' + props.match.params.id;
//   const [categories, setCategory] = useState([]);

//   useEffect(() => {
// 		fetchCategories();
// 	}, [])

// 	useEffect(() => {
// 		const fetchBook = async () => {
// 		  const response = await fetch(`/api/bookrouter/show-book/${id}`)
// 			const data = await response.json();
// 			console.log(data)
// 		  setBook(data);
// 		}
// 		fetchBook();
// 	}, [id]);


// 		const fetchCategories = async () => {
// 			setShowLoading(true)
//       fetch('/api/bookrouter/books/category')
// 				.then(res => res.json())
// 				.then(data => {
// 					setCategory(data)
// 					setShowLoading(false)
// 				})
// 				.catch(err => {
// 					console.log(err)
// 				})
// 		}
  


//   // const editBook = (e) => {
//   //   setShowLoading(true);
//   //   e.preventDefault();
//   //   const data = { title: books.title, collection: books.collection, author: books.author, oeuvre: books.oeuvre, category_id: inputs.category_id, editor: inputs.editor};
//   //   axios.put(`/api/bookrouter/edit-book/${id}`, data)
//   //     .then((result) => {
//   //       setShowLoading(false);
//   //       console.log(result.data.id)
//   //       // props.history.push('show-book/' + result.data.id)
//   //     }).catch((error) => setShowLoading(false));
//   // };


//   const editBook = async (e) => {
//     e.preventDefault()
//     axios.put(`/api/bookrouter/edit-book/${id}`, books,
//       {
//       validateStatus: function (status) {
//       return status < 600; // Reject only if the status code is greater than or equal to 500
//       }}
//     )
//     .catch(function (error) {
//       console.log(error)
//     })  
//     .then(function (response) {
//       // props.history.push('/')
//       console.log(response)
//     })
//   }


//   const handleInputChange = event => {
//     event.persist();
//     setBook({
//       ...books,
//       [event.target.name]: event.target.value});
//   }
	
	

//   // const editBook =  (e) => {
//   //   setShowLoading(true)
//   //   e.preventDefault()
//   //   const data = {title: inputs.title, collection: inputs.collection, author: inputs.author, oeuvre: inputs.oeuvre, category_id: inputs.category_id, editor: inputs.editor}
//   //   axios.put(Url, data)
//   //     .then((result => {
//   //       // setInputs(data)
//   //       setShowLoading(false)
//   //       props.history.push('/show-book/' + result.data.id)
//   //     }).catch((error) => setShowLoading(false)));
    
//   // }


  
// return (
//   <div>
//     {showLoading &&
//       <Spinner animation="border" role="status">
//         <span className="sr-only">Loading...</span>
//       </Spinner>
//     }
//     <Form onSubmit={editBook} >
//       <FormGroup  row>
//         <Label sm={2}>
//             Nom du livre
//         </Label>
//         <Col sm={6}>
//         <Input
//             type="text"
//             placeholder=".. titre"
//             value= {books.title}
//             onChange={handleInputChange}
//             name="title"
//             required
//         />
//         </Col>
//       </FormGroup>

//       <FormGroup row>
//         <Label sm={2}>
//             Collection
//         </Label>
//         <Col sm={6}>
//         <Input
//           type="text"
//           placeholder=".. collection"
//           value={books.collection}
//           onChange={handleInputChange}
//           name="collection"
//         />
//         </Col>
//       </FormGroup>

//       <FormGroup row>
//         <Label sm={2}>
//             Editeur
//         </Label>
//         <Col sm={6}>
//         <Input
//             type="text"
//             placeholder=".. éditeur"
//             value={books.editor}
//           onChange={handleInputChange}
//             name="editor"
//         />
//         </Col>
//       </FormGroup>

//       <FormGroup row>
//         <Label sm={2}>
//             Auteur
//         </Label>
//         <Col sm={6}>
//         <Input
//           type="text"
//           placeholder=".. auteur"
//           value={books.author}
//           onChange={handleInputChange}
//           name="author"
//         />
//         </Col>
//       </FormGroup>

//       <FormGroup row>
//         <Label sm={2}>
//             Genre
//         </Label>
//         <Col sm={6}>
   
//           <FormControl 
//             as="select"
//             name="category_id"
//           onChange={handleInputChange}
//           >
            
//           {categories.map((category, key) => 
// 						<option value={category.id}  key={key} className="" >{category.title_category}</option>
//           )}
          
//           </FormControl>  
//         </Col> 
//       </FormGroup>

//       <FormGroup row>
//         <Label sm={2}>
//           Oeuvre
//         </Label>
//         <Col sm={6}>
//           <Input
//             type="text"
//             placeholder=".. oeuvre"
//             value={books.oeuvre}
//           onChange={handleInputChange}
//             name="oeuvre"
//             />
//         </Col>
//       </FormGroup>
      

//       <div className="submit_newbook">
//         <Button
//         className="waves-effect waves-light btn"
//         type="submit"
//         > Enregistrer
//         </Button>
//       </div>

//     </Form>
//   </div>
//   )
// }
// export default EditBook;


