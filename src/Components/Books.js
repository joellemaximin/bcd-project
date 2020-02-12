import React, {Component} from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Table 
} from 'reactstrap';
import { Link } from 'react-router-dom';


class Books extends Component {
    constructor(props){
        super(props);
        this.state = {
            books: []
        }
    }

    // Fetch the book on first mount
    componentDidMount() {
        this.getList();
    }

    // Retrieves the book of items from the Express app
    getList(){
    let that = this;
    fetch('/api/bookrouter')
      .then(res => res.json())
      .then(books =>
       that.setState({books: books})
    );
    // .catch(error => console.log('erreurs me voilàà', error))
  }

    // editBook(){
    //     console.log('..update')
    // }

    // deleteBook(){
    //     console.log('..deleted')
    // }


    render(){

        return (
            <div className="books-home">  
                <Table striped bordered hover >
                    <thead dark>
                        <tr>
                            <th>Nom du livre</th>
                            <th>Edition</th>
                            <th>Autheur</th>
                            <th>Collection</th>
                            <th>Oeuvre</th>
                            <th>Categorie</th>
                            <th>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                    {this.state.books.map((item => 
                        <tr key={item.id} className="booksList">
                            <td>{item.title}</td>
                            <td>{item.edition}</td>
                            <td>{item.author}</td>
                            <td>{item.collection}</td>
                            <td>{item.oeuvre}</td>
                            <td>{item.title_category}</td>

                            
                            <td>
                                <Link variant="outline-primary"
                                to={"/edit-book/"+item.id}
                            >
                            Edit
                            </Link>
                        </td>
                        <td>
                            <Button
                            variant="danger"
                            size="sm"
                            >
                            Delete
                            </Button>
                        </td>
                    </tr>

                    ))
                    }
                    
                    </tbody>
                </Table>
         
                
                <Button
                    className="waves-effect waves-light btn"
                    onClick={this.addCategory}
                    >
                    Ajouter une category
                </Button>
                <Form>
                    <FormGroup>
                        <Label for="BookSearch">Search</Label>
                            <Input
                            type="search"
                            name="search"
                            id="BookSearch"
                            placeholder="search placeholder"
                            />
                    </FormGroup>
                </Form>
                <h3>Liste des livres</h3>

            </div>
        
        )
    }

}

export default Books;