import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';

function CustomNavBar(args) {


  return (
    <div>
      <Navbar color='dark' dark {...args}>
        <NavbarBrand  href="/">Ticketly</NavbarBrand>
          <Nav className="me-2" navbar>
            <NavItem>
              <NavLink href="/account/">Account</NavLink>
            </NavItem>
          </Nav>
          <Nav className="me-3" navbar>
            <NavItem>
              <NavLink href="/statistics">
                Statistics
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="me-3" navbar>
            <NavItem>
              <NavLink href="/logs">
                Logs
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="me-3" navbar>
            <NavItem>
              <NavLink href="/my-corporation">
                Your Corporation
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="me-3" navbar>
            <NavItem>
              <NavLink href="/my-tickets">
                Your Tickets
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="me-3" navbar>
            <NavItem>
              <NavLink href="/new-event">
                <Button color='primary'>New Event</Button>
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="me-3" navbar>
            <NavItem>
              <NavLink href="/login">
                <Button onClick={()=>localStorage.removeItem("token")}>Logout</Button>
              </NavLink>
            </NavItem>
          </Nav>
      </Navbar>
    </div>
  );
}

export default CustomNavBar;