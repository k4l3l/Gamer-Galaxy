import React from 'react';
import { Redirect } from 'react-router-dom';
import { LogoutConsumer } from '../components/context/logout-context';
import { UserConsumer } from '../components/context/user-context';

class Logout extends React.Component {

    componentWillUnmount() {
        const { logout, updateUser } = this.props;
        logout(updateUser);
    }

    render() {
        return <Redirect to='/login' />
    }
}

const LogoutWithContext = (props) => {
    return (
        <UserConsumer>
            {({ updateUser }) => (
                <LogoutConsumer>
                    {(logout) => (
                        <Logout {...props} updateUser={updateUser} logout={logout} />
                    )}
                </LogoutConsumer>
            )}
        </UserConsumer>
    )
}

export default LogoutWithContext;