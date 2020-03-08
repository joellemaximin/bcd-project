import React, {useState, useEffect} from 'react';
import {
	Button,
} from 'reactstrap';
import { useParams, useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';


function NoMatch() {

	const history = useHistory()


	return (

		<div className="error-page">
            <Container>
                <h1>404</h1>
                <span>Je pense que vous vous êtes perdu..</span>
                <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => {
                        history.goBack()
                }}>
                    Retour
                </Button>   
            </Container>     
        </div>
	
	)
	 
}

export default NoMatch;