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
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';

const EditBook = ({match, props})=> {
  
  const [showLoading, setShowLoading] = useState(true);
  let id = match.params.id
  // const [location, classes, history] = props;
  const [inputs, setInputs] = useState([]
    // {bookID: '', title: '', collection: '', author: '', oeuvre: '', category_id: '', editor: ''}
  );

  // const Url = '/api/bookrouter/edit-book/' + props.match.params.id;
  const [categories, setCategory] = useState([]);

 
	useEffect(() => {
		async function fetchBook() {
		  const response = await fetch(`/api/bookrouter/show-book/${id}`)
			const data = await response.json();
			console.log(data)
		  setInputs(data);
		}
		fetchBook();
	}, [id]);


  useEffect(() => {
		const fetchCategories = async () => {
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
		fetchCategories();
  }, []);


  // const editBook = (e) => {
  //   setShowLoading(true);
  //   e.preventDefault();
  //   const data = { title: inputs.title, collection: inputs.collection, author: inputs.author, oeuvre: inputs.oeuvre, category_id: inputs.category_id, editor: inputs.editor};
  //   axios.put(`/api/bookrouter/edit-book/${id}`, data)
  //     .then((result) => {
  //       setShowLoading(false);
  //       console.log(result.data.id)
  //       // props.history.push('show-book/' + result.data.id)
  //     }).catch((error) => setShowLoading(false));
  // };


  const editBook = async (e) => {
    e.preventDefault()
    axios.put(`/api/bookrouter/edit-book/${id}`, inputs,
      {
      validateStatus: function (status) {
      return status < 600; // Reject only if the status code is greater than or equal to 500
      }}
    )
    .catch(function (error) {
      console.log(error)
    })  
    .then(function (response) {
      // props.history.push('/')
      console.log(response)
    })
  }


  const handleInputChange = event => {
    event.persist();
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value});
  }
	
	

  // const editBook =  (e) => {
  //   setShowLoading(true)
  //   e.preventDefault()
  //   const data = {title: inputs.title, collection: inputs.collection, author: inputs.author, oeuvre: inputs.oeuvre, category_id: inputs.category_id, editor: inputs.editor}
  //   axios.put(Url, data)
  //     .then((result => {
  //       // setInputs(data)
  //       setShowLoading(false)
  //       props.history.push('/show-book/' + result.data.id)
  //     }).catch((error) => setShowLoading(false)));
    
  // }


  
return (
  <div>
    {showLoading &&
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    }
    <Form onSubmit={editBook} >
      <FormGroup  row>
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
        > Enregistrer
        </Button>
      </div>

    </Form>
  </div>
  )
}
export default EditBook;


