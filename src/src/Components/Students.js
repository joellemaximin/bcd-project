import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
	Table 
} from 'reactstrap';
import { 
	Spinner,
	Button 
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch
} from '@fortawesome/free-solid-svg-icons'
import { withRouter, useHistory, Link } from 'react-router-dom';

//.list-group-item : border: 0


const Students = (props)=> {
	const [students, setStudents] = useState([]);
	const [showLoading, setShowLoading] = useState(true);
	const [error, setError] = React.useState(null);
	const history = useHistory()

	useEffect(() => {
		const fetchBook = async () => {
			setShowLoading(true)
			fetch('/api/students')
				.then(res => res.json())
				.then(data => {
					setShowLoading(false)
					setStudents(data)
				})
				.catch(err => {
					console.log(err)
				})
		}
		fetchBook();
	}, []);


  const editStudent = (id) => {
		props.history.push({
			pathname: '/edit-student/' + id
		});
	}

	const deleteStudent = (id) => {
		setShowLoading(true);
		const deleteUrl = '/api/students/delete/' + id;
			axios.delete(deleteUrl)
			.then((result) => {  

				props.history.push('/students-list')  
				console.log(result)

			});
		
	}
	
	const displayStudent = (id) => {
		props.history.push({
			pathname: '/profile-student/' + id
		});
	}

//display books readed or reading by students.. get title, name from books borrowed  

	if (students.showLoading) return <Spinner animation='border' role='status' >
	<span className="sr-only">Chargement...</span>
	</Spinner> 
	return (
		<div className="students-home">
			
			{ 
				showLoading && 
				<Spinner animation='border' role='status' >
					<span className="sr-only">Chargement...</span>
				</Spinner> 
			}
		
			<Button onClick={() => history.push('/add-student') } >Ajouter un élève </Button>

			<Table striped bordered hover >
				<thead>
					<tr>
						<th>NOM/PRENOM</th>
						<th>Classe</th>
						<th>Age</th>
						<th></th>

					</tr>
				</thead>
				<tbody>
					{students.map((student, key) => 
						<tr key={key} className="">
							<td>{student.name}</td>
							<td>{student.grade}</td>		
							<td>{student.age}</td>		
	
							<td>
								<Button 
									variant="primary"
									size="sm"
									onClick={()=> {editStudent(student.id)}}
									>
									Edit
								</Button>
							</td>
							<td>
								<Button
									style={{ whiteSpace: "pre" }}
									variant="primary"
									size="sm"
									onClick={()=> {displayStudent(student.id)}}
								>
									<FontAwesomeIcon icon={faSearch} />
								</Button>
							</td>
							<td>

								<Button 
								variant="danger"
								size="sm"
								
								onClick={()=>
									{deleteStudent(student.id)}
								}
								>
									X
								</Button>
							</td>
				
						</tr>

					)
					}
					
				</tbody>
			</Table>
	
	

		</div>
	
	)
	 
}

export default Students;