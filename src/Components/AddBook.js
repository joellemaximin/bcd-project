import React, {Component} from 'react';
import { Form} from 'react-bootstrap'
import {
    Col,
    Input, 
    FormGroup,
    Label,
    Button }
from 'reactstrap';


class AddBook extends Component {

    constructor(props){
        super(props);
        //setting up state
        this.state = {
            title: "",
            collection: "",
            author: "",
            editor: "",
            oeuvre: "",
            category_id:""
        }
        this.submitBook = this.submitBook.bind(this)
    }

    // handleInputChange = event => {
    //     this.setState ({
    //         [event.target.name]: event.target.value
    //     })
    // }
    onChangeBook = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    submitBook = e => {
        e.preventDefault();

        const data = {
            title: this.state.title,
            collection: this.state.collection,
            author: this.state.author,
            editor: this.state.editor,
            oeuvre: this.state.oeuvre,
            category_id: this.state.category_id,

        }
        // for (let name of data.keys()) {
        //     const name = form.elements[name];
        // }
        // if (!e.target.checkValidity()) {
        //     this.setState({ displayErrors: true });
        //     return;
        //   }
        //   this.setState({ displayErrors: false });
          
        fetch('/api/bookrouter', {
            method: 'POST',
            body: JSON.stringify(data), // data can be `string` or {object}!

            headers:{ 'Content-Type': 'application/json' } })
        
            .then(res => res.json())
        
            .catch(error => console.error('Error:', error))
        
            .then(response => console.log('Success:', response));
        
        // const bookObject = {
        //     title: this.state.title,
        //     collection: this.state.collection,
        //     author: this.state.author,
        //     editor: this.state.editor,
        //     oeuvre: this.state.oeuvre,
        //     category_id: this.state.title
        // };
        // fetch.post('/api/bookrouter', bookObject)
        // .then(response=>{
        //     if (response.data.success===true) {
        //       alert(response.data.message)
        //     }
        //     else {
        //       alert(response.data.message)
        //     }
        //   }).catch(error=>{
        //     alert("Error 34 "+error)
        // })
        // this.setState({ title: '', collection: '', author: '', editor: '', oeuvre: '', title_category: '' })
    

    }

    render(){
        
        console.log(this.state)
        const { displayErrors } = this.state;

        
        return (
            <div className="add-form">
                <Form action='/api/bookrouter' onSubmit={this.submitBook}
                noValidate
                className={displayErrors ? 'displayErrors' : ''}
        >
                    <FormGroup  row>
                        <Label sm={2}>
                            Nom du livre
                        </Label>
                        <Col sm={6}>
                        <Input
                            type="text"
                            placeholder=".. titre"
                            value={this.state.title}
                            onChange={this.onChangeBook}
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
                            onChange={this.onChangeBook}
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
                            value={this.state.editor}
                            onChange={this.onChangeBook}
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
                            value={this.state.author}
                            onChange={this.onChangeBook}
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
                                value={this.state.category_id}
                                onChange={this.onChangeBook}
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
                                value={this.state.oeuvre}
                                onChange={this.onChangeBook}
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

}

export default AddBook;