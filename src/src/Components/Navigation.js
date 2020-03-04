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
            <Nav.Link eventKey="link-1" href="/students-list">Elèves</Nav.Link>
          </Nav.Item>
          
          <Nav.Item as="li">
            <Nav.Link eventKey="link-2" href="/categories-list">Categories</Nav.Link>
          </Nav.Item>
          
          <Nav.Item as="li">
            <Nav.Link eventKey="link-3" href="/booking-book">Historiques Réservation</Nav.Link>
          </Nav.Item>
           
        </Nav>
      </div>
  )
}
export default Navigation;

