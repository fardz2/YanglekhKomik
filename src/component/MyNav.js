import React from 'react';

import {Navbar,Nav,Container } from 'react-bootstrap';
import {Link} from 'react-router-dom'

function MyNav(){
    return(
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                <Container>
                <Navbar.Brand href="#home">YanglekhKomik</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            
                            <Nav.Link href="#features">
                                <Link to="/">Home</Link>
                            </Nav.Link>
                            <Nav.Link href="#pricing">
                                <Link to="/about">Gendre</Link>
                            </Nav.Link>
                           
                        </Nav>
                       
                       
                    
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default MyNav;