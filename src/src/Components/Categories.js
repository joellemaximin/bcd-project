import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {
	Form,
	FormGroup,
	Label,
	Input,
	Button,
	Table 
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const Categories = (props)=> {
	const [categories, setCategory] = useState([]);
	const [showLoading, setShowLoading] = useState(true);
	const [error, setError] = React.useState(null);
	
	useEffect(() => {
		const fetchBook = async () => {
			setShowLoading(true)
			fetch('/api/categories')
				.then(res => res.json())
				.then(data => {
					setCategory(data)
					setShowLoading(false)
				})
				.catch(err => {
					console.log(err)
				})
		}
		fetchBook();
	}, []);


  const editCat = (id) => {
		props.history.push({
			pathname: '/edit-cat/' + id
		});
	}

	//pas de remove category
	
	// props.history.push({
	// 	pathname: "/edit-category/"+ id
	// }
	// const onChangeItemName = (itemId) => {
	// 	setNotesDummyData(notesDummyData.filter(({ id }) => id !== itemId));
	// };
		

	if (categories.showLoading) return <Spinner animation='border' role='status' >
	<span className="sr-only">Chargement...</span>
	</Spinner> 
	return (
		<div className="categories-home">
			
			{/* {showLoading && <Spinner animation='border' role='status' >
				<span className="sr-only">Chargement...</span>
	</Spinner> } */}
			

			<Table striped bordered hover >
				<thead>
					<tr>
						<th>Titre de la catégorie</th>

					</tr>
				</thead>
				<tbody>
					{categories.map((category, key) => 
						<tr key={key} className="">
							<td>{category.title_category}</td>		
						<td>
						<Button variant="outline-primary"
								size="sm"
								onClick={()=> {editCat(category.id)}}
							>
							Edit
						</Button>
						<Button 
						  variant="outline-primary"
						  size="sm" 
						  disabled
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

export default Categories;