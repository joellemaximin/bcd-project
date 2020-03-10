import React, { useState , useEffect} from 'react';
import axios from 'axios';
import FormControl from 'react-bootstrap/FormControl';
import {
  Col,
  Input,
  Form,
  FormGroup,
  Label,
  Button}
from 'reactstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useParams, useHistory } from 'react-router-dom';


const EditBook = ({match})=> {
  
  const [showLoading, setShowLoading, reset] = useState(true);
  const [inputs, setInputs] = useState([]);
  let id = match.params.id
  const [categories, setCategory] = useState([]);
  const [items, setData] = useState({title:'', collection:'', author:'', oeuvre:'', editor:''});
	const history = useHistory()



  const handleInputChange=(e)=> {
    e.persist();
    const newData={...items}
    newData[e.currentTarget.name]=e.currentTarget.value 
    setData(newData);
    // setData({
    //   ...items,
    //   [e.currentTarget.name]: e.currentTarget.value});
  }

  const submit = async (e) => {
    e.preventDefault()
    axios.put(`/api/bookrouter/editbook/${id}`, items,
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
  
	useEffect(()=>{
    const fetchBook = async () => {
      // const id = props.match.params.id
      const response = await fetch(`/api/bookrouter/show-book/${id}`)
      const data = await response.json();
      //console.log(data)
		  setData(data[0])
    }
		fetchBook();
  }, [id]);
  

  // function submit(e){
  //   e.preventDefault()
  //   alert(`eeee ${items}`)

  //   axios.put(`/api/bookrouter/editbook/${id}`, items)
  //   .catch(function (error) {
  //     console.log(error)
  //   }) 
  //   .then(response =>{
  //     console.log(response)
  //   })
  // }

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




  return (
  <div>
    {showLoading &&
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    }
      <Form onSubmit={submit} >
        <FormGroup row>
          <Label sm={2}>
              Nom du livre
          </Label>
          <Col sm={6}>
          <Input
            type="text"
            value={items.title || ''}
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
            value={items.collection || ''}
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
            value={items.editor || ''}
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
            value={items.author || ''}
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
              <option value={category.id}  key={key} >{category.title_category}</option>
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
              value={items.oeuvre || ''}
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


