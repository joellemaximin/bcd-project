import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
	Button,
	Table 
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

//.list-group-item : border: 0


const Students = (props)=> {
	const [students, setStudents] = useState([]);
	const [showLoading, setShowLoading] = useState(true);
	const [error, setError] = React.useState(null);
	
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
	
	// props.history.push({
	// 	pathname: "/edit-book/"+ id
	// }
	// const onChangeItemName = (itemId) => {
	// 	setNotesDummyData(notesDummyData.filter(({ id }) => id !== itemId));
	// };
		

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
		
	
			<Table striped bordered hover >
				<thead>
					<tr>
						<th>NOM/PRENOM</th>
						<th>Classe</th>
						<th>Age</th>
						<th>Actions</th>

					</tr>
				</thead>
				<tbody>
					{students.map((student, key) => 
						<tr key={key} className="">
							<td>{student.name}</td>
							<td>{student.grade}</td>		
							<td>{student.age}</td>		
	
							<td>
							<Button variant="outline-primary"
									size="sm"
									onClick={()=> {editStudent(student.id)}}
								>
								Edit
							</Button>

							<Button 
							variant="outline-primary"
							size="sm"
							
							onClick={()=>
							
								{deleteStudent(student.id)}
							}
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

		</div>
	
	)
	 
}

export default Students;