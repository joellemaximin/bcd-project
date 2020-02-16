import React, { Component } from 'react';



const EditBook = (props)=> {
	const [book, setBook] = useState([]);
	const [showLoading, setShowLoading] = useState(true);

	useEffect(() => {
		const fetchBook = async () => {
      fetch('/api/bookrouter/edit-book/'+ id)
      .then(res => res.json())
      .then(data => {
        setBook(data)
        setShowLoading(false)
      })
      .catch(error =>
        alert("Error server:" + error)
      );
		}
		fetchBook();
	}, []);
	// return {books, fetchBooks};


  return(
    <div className="edit-form">
      <Form action='/api/bookrouter' onSubmit={handleSubmit}
      
      >
        <FormGroup  row>
          <Label sm={2}>
              Nom du livre
          </Label>
          <Col sm={6}>
          <Input
              type="text"
              placeholder=".. titre"
              value={book}
              onChange={(e) => setBook(e.target.value)}
              name="title"
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
            value={book}
            onChange={(e) => setBook(e.target.value)}
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
              value={book}
              onChange={(e) => setBook(e.target.value)}
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
            value={book}
            onChange={(e) => setBook(e.target.value)}
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
              
              name="title_category" 
              value={book}
              onChange={(e) => setBook(e.target.value)}
            >
            </Input>
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
              value={book}
              onChange={(e) => setBook(e.target.value)}
              name="oeuvre"
              />
          </Col>
        </FormGroup>
        
  
        <div className="submit_newbook">
          <Button
          className="waves-effect waves-light btn"
          type="sfubmit"
          >
          Modifier
          </Button>
        </div>
  
      </Form>
    </div>
  )

}
export default EditBook;

