import React, {useState, useEffect} from 'react';
import {
  Button,
  Table
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import Spinner from 'react-bootstrap/Spinner';
import { useParams, useHistory } from 'react-router-dom';
import moment from "moment";


function ShowStudent({match}) {
	const [showLoading, setShowLoading] = useState(true);
	const [error, setError] = React.useState(null);
	const history = useHistory()
	let id = match.params.id
	const [students, setStudent] = useState([]);
	const [books, setBooksRead] = useState([]);
 

  	useEffect(() => {
		const fetchStudent = async () => {
		fetch(`/api/students/student/${id}`)
		  .then(res => res.json())
		  .then(data => {
			  setStudent(data)
			  console.log(data)
		  })
		  .catch(err => {
			  console.log(err)
		  })
    }
      fetchStudent();
  }, [id]);


  useEffect(() => {
    const fetchBook = async () => {
      setShowLoading(true)
      const response = await fetch(`/api/book_borrowed/student-books/${id}`)
      const data = await response.json();
      console.log(data)
      setBooksRead(data); 
      }
      fetchBook();
  }, [id]);
  
		

  const fetchTimeLeft = async () => {
		fetch(`/api/time-left-allbook`)
		  .then(res => res.json())
		  .then(data => {
			  setBooksRead(data)
			  console.log(data)
		  })
		  .catch(err => {
			  console.log(err)
		  })
  }
  // /time-left-allbook
	return (

		<div className="students-home">
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
				students.map((student, key) => 
				
					<div key={key}>
						<h3>L'élève {student.name} est en classe {student.grade} et a {student.age} ans</h3>
					</div>
				
		  	)
      } 
		
    {/* display books read by student */}
      <h3>Liste des livres lu : </h3>

      {
				books.map((bb, key) => 
				
					<ul key={key}>
          	<li>{bb.title}</li>
					</ul>
				
		  	)
      } 
		
    
		</div>
  
   
  )
  
  // afficher les livres lus et le livre que l'élève lit en ce moment

}

export default ShowStudent;