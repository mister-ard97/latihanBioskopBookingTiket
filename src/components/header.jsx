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
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { onLogout, DeleteCartAll } from '../redux/actions';
import { Redirect } from 'react-router-dom';

class Header extends React.Component {
    state = {
        isOpen: false,
        idUser: 0
    }

    componentDidMount() {
        let user = sessionStorage.getItem('Username');
        if (user !== null) {
            this.setState({ idUser: user.id})
        }
    }

    CheckUsername = (param) => {
        if (param !== '') {
            document.getElementById('login').style.display = 'none';
            document.getElementById('register').style.display = 'none';
            return (
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        {param}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                            Check Profile
                        </DropdownItem>
                        <DropdownItem>
                            <Link to={'/cart?userid=' + this.props.id}>
                                <span className='text-dark mr-2'>Cart Pemesanan</span><span className="badge badge-dark">{this.props.cartCount}</span>
                            </Link>
                        </DropdownItem>
                        <DropdownItem>
                            <Link to='/change_password'>
                                <span className='text-dark mr-2'>Change User Password</span>
                            </Link>
                        </DropdownItem>
                        <DropdownItem>
                            <Link to='/change_username'>
                                <span className='text-dark mr-2'>Change Username</span>
                            </Link>
                        </DropdownItem>
                        <DropdownItem>
                            <Link to={'/history_purchase?userid=' + this.props.id}>
                                <span className='text-dark mr-2'>Purchase History</span>
                            </Link>
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => this.LogOutBtn()}>
                            Logout
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            )
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    LogOutBtn = () => {
        this.props.onLogout();
        this.props.DeleteCartAll();
        sessionStorage.removeItem('Username');
        sessionStorage.setItem('LogOut', 'Success')
        document.getElementById('login').style.display = 'block';
        document.getElementById('register').style.display = 'block';
    }

    render() {
        return (
            <div className='Custnavbar sticky-top'>
                <div className='container-fluid px-5'>
                    <Navbar dark expand="md">
                        <Link to='/'>
                            <NavbarBrand>MisterMovie</NavbarBrand>
                        </Link>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {
                                    this.props.username !== '' ?
                                    <NavItem>
                                        <Link to='/manage'>
                                            <NavLink>Manage Movie</NavLink>
                                        </Link>
                                    </NavItem> : null    
                                }
                                <NavItem>
                                    <Link to='/movies-list'>
                                        <NavLink>Movies List</NavLink>
                                    </Link>
                                </NavItem>
                                <NavItem id='register'>
                                    <Link to='/register'>
                                        <NavLink>Register</NavLink>
                                    </Link>
                                </NavItem>
                                <NavItem id='login'>
                                    <Link to='/login'>
                                        <NavLink className='ml-2 rounded-pill px-3 py-2 loginBtn text-center font-weight-bold'>Login</NavLink>
                                    </Link>
                                </NavItem>
                                {this.CheckUsername(this.props.username)}
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            </div>
        );
    }
}

const mapToStateProps = (state) => {
    return {
        id: state.user.id,
        username: state.user.username,
        status: state.user.status,
        role: state.user.role,
        cartCount: state.cart.count
    }
}

export default connect(mapToStateProps, { onLogout , DeleteCartAll})(Header);