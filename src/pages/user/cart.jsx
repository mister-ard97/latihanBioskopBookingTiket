import React from 'react';
import { connect } from 'react-redux';

class Cart extends React.Component {
    state = {
        user: ''
    }
    componentDidMount() {
        let username = localStorage.getItem('Username');
        if(username !== null) {
            username = JSON.parse(username);
            this.setState({user: username.username})
        }
    } 
    render() {
        return (
            <div>
               <p>
                    {this.props.cart.titleMovie}<br/>
                    {this.props.cart.booked}<br/>
                    {this.props.cart.price}<br/>
               </p>
            </div>
        )
    }
}

const mapToStateProps = (state) => {
    return {
        cart: state.cart
    }
}

export default connect(mapToStateProps)(Cart);