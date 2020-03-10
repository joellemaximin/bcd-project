import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { useAlert } from 'react-alert'
import FormControl from 'react-bootstrap/FormControl';
import {
  Col,
  Input,
  Form,
  FormGroup,
  Label,
  Button }
from 'reactstrap';

const AddBook = (props) => {
  // const alert = useAlert()
	const [showLoading, setShowLoading] = useState(true);
  // const [location, classes, history] = props;
  const [inputs, setInputs] = useState(
    {title: '', collection: '', author: '', oeuvre: '', editor: ''}
  );
  //  title_category: '', , category_id: ''
  const [categories, setCategory] = useState([]);


  const handleInputChange = event => {
    event.persist();
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value});
  }

  const addBook = async (e) => {
    e.preventDefault()
    axios.post('/api/bookrouter/', inputs,
      {
      validateStatus: function (status) {
      return status < 600; // Reject only if the status code is greater than or equal to 500
      }}
    )
    .catch(function (error) {
      console.log(error)
    })  
    .then(function (response) {
      props.history.push('/')
      // console.log(response)
    })
  }

	
	useEffect(() => {
		const fetchCategories = async () => {
			setShowLoading(true)
      fetch('/api/categories')
				.then(res => res.json())
				.then(data => {
          setShowLoading(false)
          // console.log(data)
					setCategory(data)
				})
				.catch(err => {
					console.log(err)
				})
		}
		fetchCategories();
	}, []);


return (
  <div>
    <Form onSubmit={addBook} >
      <FormGroup row>
        <Label sm={2}>
            Nom du livre
        </Label>
        <Col sm={6}>
        <Input
            type="text"
            placeholder=".. titre"
            value= {inputs.title || ""}
            onChange={handleInputChange}
            name="title"
            required
        />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label sm={2}>
            Collection
        </Label>
        <Col sm={6}>
        <Input
          type="text"
          placeholder=".. collection"
          value={inputs.collection || ""}
          onChange={handleInputChange}
          name="collection"
        />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label sm={2}>
            Editeur
        </Label>
        <Col sm={6}>
        <Input
            type="text"
            placeholder=".. éditeur"
            value={inputs.editor || ""}
            onChange={handleInputChange}
            name="editor"
        />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label sm={2}>
            Auteur
        </Label>
        <Col sm={6}>
        <Input
          type="text"
          placeholder=".. auteur"
          value={inputs.author || ""}
          onChange={handleInputChange}
          name="author"
        />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label sm={2}>
            Genre
        </Label>
        <Col sm={6}>
   
          <FormControl 
            as="select"
            name="category_id"
            onChange={handleInputChange}
          >
            
          {categories.map((category, key) => 
						<option value={category.id}  key={key} className="" >{category.title_category}</option>
          )}
          
          </FormControl>
        </Col> 
      </FormGroup>

      <FormGroup row>
        <Label sm={2}>
          Oeuvre
        </Label>
        <Col sm={6}>
          <Input
            type="text"
            placeholder=".. oeuvre"
            value={inputs.oeuvre || ""}
            onChange={handleInputChange}
            name="oeuvre"
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
export default AddBook;
