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
        this.state = {
            //books: []
            title: "",
            collection: "",
            author: "",
            edition: "",
            oeuvre: "",
            category:""
        }

        this.addBook = this.addBook.bind(this)
    }
    /*

    componentDidMount(){
        this.fetchBooks();
    }
bb
    fetchBooks(){
        let that = this;
        fetch('/books')
            .then(res => res.json())
            .then(allbooks =>
                that.setState({books: allbooks})
            )
    }
    */

    handleInputChange = event => {
        this.setState ({
            [event.target.name]: event.target.value
        })
    }

    addBook = e => {
        e.preventDefault();
        console.log(this.state)
    

    }

    render(){
        
        console.log(this.state)
        
        
        return (
            <div className="">
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

export default AddBook;