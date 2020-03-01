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

const EditStudent = (props) => {
  
	const [showLoading, setShowLoading] = useState(true);
  // const [location, classes, history] = props;
  const [inputs, setInputs] = useState(
    { name: '', age: '', grade: ''}
  );
  // const [value, setValue] = useState([]);

	useEffect(() => {
    setShowLoading(true)
    const id = props.match.params.id
    axios.get('/api/students/student/' + id)
      .then(data => {
        console.log(data)
        setInputs(data)
        setShowLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
    },[]
  );


  const handleInputChange = event => {
    event.persist();
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value});
  }


  const editStudent = async (e) => {
    e.preventDefault()
    const id = props.match.params.id
    axios.put('/api/students/student' + id)
      .then(res => {
        console.log(res.data)
        props.history.push('/student-list')
      })
      .catch(function (error) {
        console.log(error)
      })  
    
  }

	


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
          value= {inputs.name}
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
          value={inputs.grade}
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
          value={inputs.age}
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