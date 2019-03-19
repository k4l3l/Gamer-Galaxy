import React, { Component } from 'react';
import TopRated from '../components/top-rated';
import { UserConsumer } from '../components/context/user-context';

class Home extends Component {
    render() {
        const { username, isLoggedIn } = this.props;
        return (
            <main>
                <h2>Welcome to Gamer Galaxy, { 
                    isLoggedIn 
                    ? username
                    : 'Guest'
                }!</h2>
                <TopRated />
            </main>
        );
    }
}

const HomeWithContext = (props) => (
    <UserConsumer>
        {
            ({username, isLoggedIn}) => (
                <Home 
                {...props} 
                username={username} 
                isLoggedIn={isLoggedIn} 
                />
            )
        }
    </UserConsumer>
)

export default HomeWithContext;
