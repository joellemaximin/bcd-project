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

const AddStudent = (props) => {
  
	const [showLoading, setShowLoading] = useState(true);
  // const [location, classes, history] = props;
  const [inputs, setInputs] = useState(
    { name: '', age: '', grade: ''}
  );
  // const [value, setValue] = React.useState();

  const handleInputChange = event => {
    event.persist();
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value});
  }

  const addStudent = async (e) => {
    e.preventDefault()
    axios.post('/api/students', inputs,
      {
      validateStatus: function (status) {
      return status < 600; // Reject only if the status code is greater than or equal to 500
      }}
    )
    .catch(function (error) {
      console.log(error)
    })  
    .then(function (response) {
      props.history.push('/students-list')  
      console.log(response)
    })
  }


return (
  <div>
    <Form onSubmit={addStudent} >
      <FormGroup row>
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
export default AddStudent;