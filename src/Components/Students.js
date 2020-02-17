import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { ListGroup, ListGroupItem } from 'reactstrap';

import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Book from './Book';

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
					setStudents(data)
					setShowLoading(false)
				})
				.catch(err => {
					console.log(err)
				})
		}
		fetchBook();
	}, []);


  const editStudent = (id) => {
		props.history.push({

			pathname: '/edit/' + id
	 
		});
	}

	const deleteStudent = (id) => {
		//setShowLoading(true);

			axios.delete('/api/student/delete/student')
     
    .then((data) => {
			setStudents({data:id})

			props.history.push({
				pathname: "/"
			})
			console.log(data)
			
						
		})
		.catch(function (error) {
			console.log(error)
		}) 
		
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
			
			{/* {showLoading && <Spinner animation='border' role='status' >
				<span className="sr-only">Chargement...</span>
	</Spinner> } */}
		{students.map((student, key) => 

		<ListGroup key={key}>
				<ListGroupItem>{student.name}</ListGroupItem>
				<ListGroupItem>{student.grade}</ListGroupItem>
				<ListGroupItem>{student.age}</ListGroupItem>
				
				<ListGroupItem>
					<Link variant="outline-primary"
						to={"/edit-student/"+ student.id}
						onClick={()=> {editStudent(student)}}

					>
					Editer
					</Link>
				</ListGroupItem>

				<ListGroupItem>
					<Link variant="outline-primary"
						to={"/edit-student/"+ student.id}
						onClick={()=> {deleteStudent(student)}}
					>
					Supprimer
					</Link>
				</ListGroupItem>

		</ListGroup>			

		)
		}
					
			
			
		
		 
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