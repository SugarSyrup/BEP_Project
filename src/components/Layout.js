import React from "react";
import { Col, Container, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";

export default  function Layout({children}) {
  return (
    <Container fluid>
      <Row>
        <header fixed="top">
          <Navbar.Brand href="/" style={{appearance:'none', textDecoration:'none', color:'black', fontSize:'2rem', fontWeight:'bold', marginLeft:'1rem', marginTop:'1rem'}}>LOGO</Navbar.Brand>
        </header>
      </Row>
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
