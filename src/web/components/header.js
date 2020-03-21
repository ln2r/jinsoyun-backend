import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * TODO:
 * - database menu only available when logged in
 * - add login with discord option
 */

export default class ElementMenu extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                <Navbar.Brand href="/">Jinsoyun</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/db/">Database</Nav.Link>                        
                        <Nav.Link href="/stats/">Statistic</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )}
    }
