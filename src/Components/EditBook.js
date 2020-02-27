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

const EditBook = (props) => {
  
	const [showLoading, setShowLoading] = useState(false);
  // const [location, classes, history] = props;
  
  const [inputs, setInputs] = useState(
    {bookID: '', title: '', collection: '', author: '', oeuvre: '', category_id: '', editor: ''}
  );
  
  const Url = "/api/bookrouter/edit-book/:id/" + props.match.params.id;

  const [categories, setCategory] = useState({title_category: ''});
  // const [value, setValue] = React.useState();

  // useEffect(() => {
	// 	const fetchBook = async () => {
	// 		setShowLoading(true)
	// 		axios.put(Url)
	// 			.then(res => res.json())
	// 			.then(data => {
  //         setInputs(data)
  //         console.log(data)
	// 				setShowLoading(false)
	// 			})
	// 			.catch(err => {
	// 				console.log(err)
	// 			})
	// 	}
	// 	fetchBook();
	// }, []);



  const editBook = async (e) => {
    setShowLoading(true);
    e.preventDefault()
    const data = { bookID: props.match.params.id, title: inputs.title, collection: inputs.collection, author: inputs.author, oeuvre: inputs.oeuvre, category_id: inputs.category_id, editor: inputs.editor}
    axios.put(Url, data)
    .then((result) => {  
      setShowLoading(false);
      props.history.push('/')
    }).catch((error) => setShowLoading(false)
    )
  }
  
  const handleInputChange = event => {
    event.persist();
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value});
  }
	
	useEffect(() => {
		const fetchBook = async () => {
			setShowLoading(true)
      fetch('/api/bookrouter/books/category')
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
        <Input
          type="text"
          placeholder=".. mettre un SELECT"
          categories={categories.title_category || ""}
          onChange={handleInputChange}
          name="category_id"
        />
          {/* <FormControl 
            as="select"
            name="category_id"
            value= {inputs.category_id || title}
            onChange={handleInputChange}
          >
            
          {categories.map((category, id) => 
						<option key={id} className="">{category.title_category}</option>
          )}
          
          </FormControl>  */}

          
          
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


