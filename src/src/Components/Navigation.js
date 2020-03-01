import React from 'react';

import {
  Nav }
from 'react-bootstrap';

const Navigation = () => {
  return(
    <div className="navbar">
        <Nav defaultActiveKey="/" as="ul">
            <Nav.Item as="li">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link eventKey="link-1" href="/add-book">Ajout Livre</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link eventKey="link-2" href="/students-list">Elèves</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link eventKey="link-3" href="/add-student">Ajout Elève</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link eventKey="link-4" href="/categories-list">Categories</Nav.Link>
            </Nav.Item>
           {/*  <Nav.Item as="li">
              <Nav.Link eventKey="link-5" href="/add-categorie">Ajout Categorie</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link eventKey="link-2" href="/edit-student">Elèves</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link eventKey="link-2" href="/edit-book">Ajout Elève</Nav.Link>
            </Nav.Item> */}
        </Nav>
      </div>
  )
}
export default Navigation;

