import React, { useState , useEffect} from 'react';
import axios from 'axios';
import {
	Col,
	Input,
	Form,
	FormGroup,
	Label,
	Button }
from 'reactstrap';

const AddCate = () => {

	const [showLoading, setShowLoading] = useState(true);
	// const [location, classes, history] = props;
	const [inputs, setInputs] = useState(
		{ title_category: ''}
	);

	const handleInputChange = event => {
		event.persist();
		setInputs({
			...inputs,
			[event.target.name]: event.target.value});
	}

	const submitAdd = async (e) => {
		e.preventDefault()
		axios.post('/api/categories/', inputs,
			{
			validateStatus: function (status) {
			return status < 600; // Reject only if the status code is greater than or equal to 500
			}}
		)
		.catch(function (error) {
			console.log(error)
		})
		.then(function (response) {
			console.log(response)
		})
	}


	useEffect(() => {
		const fetchBook = async () => {
			setShowLoading(true)
				fetch('/api/categories/')
				.then(res => res.json())
				.then(data => {
					setInputs(data)
					setShowLoading(false)
				})
				.catch(err => {
					console.log(err)
				})
		}
		fetchBook();
	}, []);


		return (
		<div>
				<Form onSubmit={submitAdd} >
						<FormGroup  row>
							<Label sm={2}>
						Niveau d'élève
						</Label>
						<Col sm={6}>
						<Input
							type="text"
							value= {inputs.title_category || ""}
							onChange={handleInputChange}
							name="title_category"
							required
						/>
						</Col>
				</FormGroup>

				<div className="submit_newbook">
						<Button
						className="waves-effect waves-light btn"
						type="submit"
						>
						Ajouter un nouveau niveau
						</Button>
				</div>

				</Form>
	</div>
	)
}
export default AddCate;