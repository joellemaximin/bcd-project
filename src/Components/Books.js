import React, {Component} from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button }
    from 'reactstrap';



class Books extends Component {


    render(){
        return (
            <div>
              
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