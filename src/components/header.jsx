import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

export default class Header extends React.Component {
    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
   
    render() {
        return (
            <div className='Custnavbar'>
               <div className='container-fluid px-5'>
                    <Navbar dark expand="md">
                        <NavbarBrand href="/">MisterMovie</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/manage">Manage Movie</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/register">Register</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink 
                                        href="/login" 
                                        className='rounded-pill px-3 py-2 loginBtn text-center font-weight-bold'>Login
                                    </NavLink>
                                </NavItem>
                                
                            </Nav>
                        </Collapse>
                    </Navbar>
               </div>
            </div>
        );
    }
}