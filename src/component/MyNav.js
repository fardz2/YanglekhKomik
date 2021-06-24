import React ,{useState}from 'react';
import {Navbar,Nav,Container, Form,FormControl, Button } from 'react-bootstrap';
import {Link , useHistory} from 'react-router-dom'

function MyNav(){
    const [search , setSearch] = useState("")
    let history = useHistory()
    const handleSearch = (e)=>{
        setSearch(e.target.value)
    }

    const submitSearch = (e)=>{
        e.preventDefault()
        history.push(`/search?q=${search}`)
        setSearch("")
    }
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
                                <Link to="/about">Genre</Link>
                            </Nav.Link>
                           
                        </Nav>
                        <Form className="d-flex" onSubmit={submitSearch}>
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="mr-2"
                                aria-label="Search"
                                onChange={handleSearch}
                                value={search}
                            />
                            <Button variant="outline-success" type="submit">Search</Button>

                        </Form>
                       
                       
                    
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default MyNav;