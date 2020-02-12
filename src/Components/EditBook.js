import React, { Component } from 'react';



class EditBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      collection: "",
      author: "",
      editor: "",
      oeuvre: "",
      title_category:""
    }

  }

  componentDidMount(){
    let bookId = this.props.params.id;
    fetch('/api/bookrouter/get/'+bookId)
      .then(res => {
        if(res.data.sucess) {
          const data = res.data.data[0]
          this.setState({
            dataBook: data,
            bTitle: data.title,
            bAuthor: data.author,
            bEdition: data.editor,
            bCollection: data.collection,
            bTitleCategory: data.title_category,
            bOeuvre: data.oeuvre
          })
          res.json()

        } else {
          alert("error")
        }
      })
      .catch(error =>
       alert("Error server:" + error)
      );
      
  }
  render(){
    let bookId = this.props.params.id;

    return(
      <div className="edit-form">
        <Form onSubmit={this.addBook}>
            <FormGroup  row>
                <Label sm={2}>
                    Nom du livre
                </Label>
                <Col sm={6}>
                <Input
                    type="text"
                    placeholder=".. titre"
                    value={this.state.title}
                    onChange={this.handleInputChange}
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
                    value={this.state.collection}
                    onChange={this.handleInputChange}
                    name="collection"
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
                    value={this.state.author}
                    onChange={this.handleInputChange}
                    name="author"
                />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label sm={2}>
                    Select
                </Label>
                <Col sm={6}>
                    <Input type="select" name="category" >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
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
                        value={this.state.oeuvre}
                        onChange={this.handleInputChange}
                        name="oeuvre"
                        />
                </Col>
            </FormGroup>
            

            <div className="submit_newbook">
                <Button
                className="waves-effect waves-light btn"
                type="submit"
                onClick={this.addBook}
                >
                Ajouter un nouveau livre
                </Button>
            </div>

        </Form>
      </div>
    )
  }
}
export default EditBook;

