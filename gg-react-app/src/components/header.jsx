import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserConsumer } from './context/user-context';

const Header = (props) =>  {    
    const { roles } = props;
    const isAdmin = roles
        .map(role => role.toLowerCase())
        .includes('admin');
        
    return(
        <header className="mastfoot mt-auto">
            <div className="inner">
            <nav className="nav nav-masthead justify-content-center">
                <NavLink className="nav-link" to="/">Home</NavLink>                
                {
                    props.isLoggedIn
                    ? 
                    isAdmin ? (<React.Fragment>
                        <NavLink className="nav-link" to="/create-game">Create Game</NavLink>
                        <NavLink className="nav-link" to="/logout">Logout</NavLink>
                        </React.Fragment>)
                    :(
                    <React.Fragment>
                    <NavLink className="nav-link" to="/store">Store</NavLink>
                    <NavLink className="nav-link" to="/my-orders">My orders</NavLink>
                    <NavLink className="nav-link" to="/cart">Cart</NavLink>
                    <NavLink className="nav-link" to="/logout">Logout</NavLink>
                    </React.Fragment>
                    )
                    : <NavLink className="nav-link" to="/login">Log in</NavLink>
                }
            </nav>
            </div>
        </header>
    )
}

const HeaderWithContext = (props) => {
    return (
    <UserConsumer>
        {
            (props) => (
                <Header {...props} props={props} />
            )
        }
    </UserConsumer>
    )
}

export default HeaderWithContext;