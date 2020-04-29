const db = require("../../data/dbConfig");

module.exports = {
  find,
  // get,
  // findById,
  remove,
  // update
};


function find() {
  return db("books");
}



//remove from db
function remove(bookID) {
  return db("books")
    .where({ bookID })
    .del();
}

// import React, { useState , useEffect} from 'react';
// import axios from 'axios';
// import FormControl from 'react-bootstrap/FormControl';
// import {
//   Col,
//   Input,
//   Form,
//   FormGroup,
//   Label,
//   Button}
// from 'reactstrap';
// import Spinner from 'react-bootstrap/Spinner';


// const EditBook = ({match, props})=> {
  
//   const [showLoading, setShowLoading] = useState(true);
//   const [inputs, setInputs] = useState([]);
//   let id = match.params.id
//   const [categories, setCategory] = useState([]);
//   const [items, setData] = useState({title:"", collection:"", author:"", oeuvre:"", category_id:"", editor:""});

//   //  const url = `/api/bookrouter/edit-book/${id}`
	
// 	useEffect(()=>{
//     const fetchBook = async () => {
//       const response = await fetch(`/api/bookrouter/show-book/${id}`)
//       const data = await response.json();
//       console.log(data)
// 		  setData(data[0])
//     }
// 		fetchBook();
//   }, [id]);
  
//   // useEffect(
//   //   ()=>{
//   //     axios.get(`/api/bookrouter/show-book/${id}`)
//   //     .then(res=>{
//   //       setData(res.data)
//   //     }).catch(err=>console.log(err))
//   //   }, [id]
//   // )
  

//   const submit = async (e) => {
//     e.preventDefault()
//     axios.put(`/api/bookrouter/editbook/${id}`, items)
//     .then(data =>{
//       setData(data)
//       console.log(data)
//       props.history.push('/')
//     })
//     .catch(function (error) {
//       console.log(error)
//     }) 
//   }


//   // function handleInputChange(e) {
//   //   e.persist();
//   //   const newData={...data}
//   //   newData[e.target.id]=e.target.value 
//   //   setData(newData);
//   // }


//   useEffect(() => {
// 		const fetchCategories = async () => {
// 			setShowLoading(true)
//       fetch('/api/categories')
// 				.then(res => res.json())
// 				.then(data => {
// 					setCategory(data)
// 					setShowLoading(false)
// 				})
// 				.catch(err => {
// 					console.log(err)
// 				})
// 		}
// 		fetchCategories();
//   }, []);

//   const handleInputChange = event => {
//     event.persist();
//     setData({
//       ...items,
//       [event.currentTarget.name]: event.currentTarget.value});
//   }
  
//   return (
//   <div>
//     {showLoading &&
//       <Spinner animation="border" role="status">
//         <span className="sr-only">Loading...</span>
//       </Spinner>
//     }
//       <Form onSubmit={submit} >
//         <FormGroup row>
//           <Label sm={2}>
//               Nom du livre
//           </Label>
//           <Col sm={6}>
//           <Input
//             type="text"
//             value= {items.title}
//             onChange={handleInputChange}
//             name="title"
//             required
//           />
//           </Col>
//         </FormGroup>

//         <FormGroup row>
//           <Label sm={2}>
//               Collection
//           </Label>
//           <Col sm={6}>
//           <Input
//             type="text"
//             value={items.collection}
//             onChange={handleInputChange}
//             name="collection"
//           />
//           </Col>
//         </FormGroup>

//         <FormGroup row>
//           <Label sm={2}>
//               Editeur
//           </Label>
//           <Col sm={6}>
//           <Input
//             type="text"
//             value={items.editor}
//             onChange={handleInputChange}
//             name="editor"
//           />
//           </Col>
//         </FormGroup>

//         <FormGroup row>
//           <Label sm={2}>
//               Auteur
//           </Label>
//           <Col sm={6}>
//           <Input
//             type="text"
//             value={items.author}
//             onChange={handleInputChange}
//             name="author"
//           />
//           </Col>
//         </FormGroup>

//         <FormGroup row>
//           <Label sm={2}>
//               Genre
//           </Label>
//           <Col sm={6}>
    
//             <FormControl 
//               as="select"
//               name="category_id"
//               onChange={handleInputChange}
//               >
              
//             {categories.map((category, key) => 
//               <option value={category.id}  key={key} className="" >{category.title_category}</option>
//             )}
            
//             </FormControl>  
//           </Col> 
//         </FormGroup>

//         <FormGroup row>
//           <Label sm={2}>
//             Oeuvre
//           </Label>
//           <Col sm={6}>
//             <Input
//               type="text"
//               value={items.oeuvre}
//               onChange={handleInputChange}
//               name="oeuvre"
//               />
//           </Col>
//         </FormGroup>
        

//         <div className="submit_newbook">
//           <Button
//             className="waves-effect waves-light btn"
//             type="submit"
//           > Enregistrer
//           </Button>
//         </div>

//       </Form>
//     </div>
//   )
// }
// export default EditBook;


