import React, { useState , useEffect} from 'react';
import axios from 'axios';
import FormControl from 'react-bootstrap/FormControl';
import {
  Col,
  Input,
  Form,
  FormGroup,
  Label,
  Button }
from 'reactstrap';

const EditStudent = () => {
  
	const [showLoading, setShowLoading] = useState(true);
  // const [location, classes, history] = props;
  const [inputs, setInputs] = useState(
    { name: '', age: '', grade: ''}
  );
  const [students, setStudents] = useState([]);
  // const [value, setValue] = React.useState();

  const handleInputChange = event => {
    event.persist();
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value});
  }

  const editStudent = async (e) => {
    // e.preventDefault()
    // axios.post('/api/students', inputs,
    //   {
    //   validateStatus: function (status) {
    //   return status < 600; // Reject only if the status code is greater than or equal to 500
    //   }}
    // )
    // .catch(function (error) {
    //   console.log(error)
    // })  
    // .then(function (response) {
    //   console.log(response)
    // })
  }

	
	useEffect(() => {
	// 	const fetchBook = async () => {
	// 		setShowLoading(true)
    //   fetch('/api/bookrouter/student')
	// 			.then(res => res.json())
	// 			.then(data => {
	// 				setStudents(data)
	// 				setShowLoading(false)
	// 			})
	// 			.catch(err => {
	// 				console.log(err)
	// 			})
	// 	}
	// 	fetchBook();
	}, []);


return (
  <div>
    <Form onSubmit={editStudent} >
      <FormGroup  row>
        <Label sm={2}>
           Nom/Prénom
        </Label>
        <Col sm={6}>
        <Input
            type="text"
            value= {inputs.name || ""}
            onChange={handleInputChange}
            name="name"
            required
        />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label sm={2}>
            Grade
        </Label>
        <Col sm={6}>
        <Input
          type="text"
          value={inputs.grade || ""}
          onChange={handleInputChange}
          name="grade"
        />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label sm={2}>
            Age
        </Label>
        <Col sm={3}>
        <Input
            type="text"
            value={inputs.age || ""}
            onChange={handleInputChange}
            name="age"
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
  </div>
  )
}
export default EditStudent;