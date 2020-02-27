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

const AddBook = (props) => {
  
	const [showLoading, setShowLoading] = useState(true);
  // const [location, classes, history] = props;
  const [inputs, setInputs] = useState(
    {title: '', collection: '', author: '', oeuvre: '', editor: ''}
  );
  //  title_category: '', , category_id: ''
  //const [categories, setCategory] = useState([]);
  // const [value, setValue] = React.useState();

  const handleInputChange = event => {
    event.persist();
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value});
  }

  const addBook = async (e) => {
    e.preventDefault()
    axios.post('/api/bookrouter', inputs,
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
      console.log(response)
    })
  }

	
	// useEffect(() => {
	// 	const fetchBook = async () => {
	// 		setShowLoading(true)
  //     fetch('/api/bookrouter/books/category')
	// 			.then(res => res.json())
	// 			.then(data => {
	// 				setCategory(data)
	// 				setShowLoading(false)
	// 			})
	// 			.catch(err => {
	// 				console.log(err)
	// 			})
	// 	}
	// 	fetchBook();
	// }, []);


return (
  <div>
    <Form onSubmit={addBook} >
      <FormGroup  row>
        <Label sm={2}>
            Nom du livre
        </Label>
        <Col sm={6}>
        {/* <Input
            type="integer"
            placeholder=".. N°"
            value= {inputs.id || ""}
            onChange={handleInputChange}
            name="id"
            
        /> */}
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
        {/* <Col sm={6}>
   
          <FormControl 
            as="select"
            name="category_id"
            value= {inputs.category_id || ""}
            onChange={handleInputChange}
          >
            
          {categories.map((category, key) => 
						<option key={key} className="">{category.title_category}</option>
          )}
          
          </FormControl>  

          
          
        </Col>  */}
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

    // useEffect(() => { 
    //   async const fetchBook = async () => {
    //     fetch('/api/bookrouter', {
    //       method: "POST",
    //       body: JSON.stringify(book),
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json"
    //       }
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //       setBook(data)
    //       setShowLoading(false)
    //     })
    //     .catch(error =>
    //     alert("Error server:" + error)
    //     ); 
    //   }
    //   fetchBook();
    // },  [book]);

//     useEffect(() => {
//       const fetchBook = async (body) => {
//         const response = await fetch('/api/bookrouter', {
//         method: "POST",
//         body,
//         headers: {
//           // 'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         }
//         })
//         const data = await response.json();
//         if(!response.ok) {
//           throw new Error(data)
//         }
//         setTitle(data);  // what comes back is set to a JS variable called 'data'


