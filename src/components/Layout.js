import React from "react";
import { Container, Nav, Row } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';

export default  function Layout({children}) {
  return (
    <Container fluid>
      <Navbar expand="lg" className="bg-body-tertiary" style={{backgroundColor:'black', position:'sticky'}}>
        <Container>
          <Navbar.Brand href="/" style={{fontSize:'2rem', fontWeight:'bold'}}>LOGO</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/ask">Link</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main style={{width:"90%",margin:'auto'}}>
        {children}
      </main>
      <Row>
        <footer>
          
        </footer>
      </Row>
    </Container>
  );
}
