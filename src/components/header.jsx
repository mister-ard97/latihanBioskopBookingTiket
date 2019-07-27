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

class Header extends React.Component {
    state = {
        isOpen: false,
        idUser: null,
        loading: true
    }

    componentDidMount() {
        let user = localStorage.getItem('Username');
        if (user !== null) {
            user = JSON.parse(user)
            document.getElementById('login', 'register').style.display = 'none';
            this.setState({ idUser: user.id, loading: false})
        } else {
            document.getElementById('login', 'register').style.display = 'block';
            this.setState({idUser: 0, loading: false})
        }
    }

    renderHeader = () => {
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

    CheckUsername = (param) => {
        if (param !== '') {
            document.getElementById('login').style.display = 'none';
            document.getElementById('register').style.display = 'none';
            return (
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        {this.props.username}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                            <Link to={'/cart'}>
                                <span className='text-dark mr-2'>Cart Pemesanan</span><span className="badge badge-dark">{this.props.cartCount}</span>
                            </Link>
                        </DropdownItem>
                        <DropdownItem>
                            <Link to='/change_username'>
                                <span className='text-dark mr-2'>Change Username</span>
                            </Link>
                        </DropdownItem>
                        <DropdownItem>
                            <Link to='/change_password'>
                                <span className='text-dark mr-2'>Change User Password</span>
                            </Link>
                        </DropdownItem>
                        <DropdownItem>
                            <Link to={'/history_purchase'}>
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
        localStorage.removeItem('Username');
        localStorage.setItem('LogOut', 'Success')
        document.getElementById('login').style.display = 'block';
        document.getElementById('register').style.display = 'block';
    }

    render() {
        return (
            this.renderHeader()
        )
    }
}

const mapToStateProps = (state) => {
    return {
        id: state.user.id,
        username: state.user.username,
        cartCount: state.cart.count
    }
}

export default connect(mapToStateProps, { onLogout , DeleteCartAll})(Header);