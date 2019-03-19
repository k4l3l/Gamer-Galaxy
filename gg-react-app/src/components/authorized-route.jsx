import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserConsumer } from './context/user-context';

const AuthorizedRoute = (props) => {
    const {isLoggedIn, allowedRoles=[], roles } = props;
    const isRoleAllowed = !allowedRoles.length || (
        roles
        .map(role => role.toLowerCase())
        .some(role => allowedRoles.includes(role))
    );

    return (!isLoggedIn || !isRoleAllowed
    ? <Redirect to='/login' />
    : <Route {...props} />)
}

const AuthorizedRouteWithContext = (props)=> {
    return (
        <UserConsumer>
        {
            ({ isLoggedIn, roles }) => (
                <AuthorizedRoute 
                {...props} 
                roles={roles}
                isLoggedIn={isLoggedIn} />
            )
        }
        </UserConsumer>
        
    )
}

export default AuthorizedRouteWithContext;