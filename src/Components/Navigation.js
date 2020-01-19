import React, { Component } from 'react';

import { Nav } from 'react-bootstrap'


class Navigation extends Component {
  constructor(props) {
    super(props)

  }
  render(){
    return(
      <div className="navbar">
        <Nav defaultActiveKey="/" as="ul">
            <Nav.Item as="li">
                <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link eventKey="link-1" href="/addbook">Ajout Livre</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link eventKey="link-2" href="/students">Elèves</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link eventKey="link-2" href="/addstudent">Ajout Elève</Nav.Link>
            </Nav.Item>
        </Nav>
      </div>
    )
  }
}
export default Navigation;

