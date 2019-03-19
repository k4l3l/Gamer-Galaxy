import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './views/home';
import NotFound from './views/not-found';
import Login from './views/login';
import Logout from './views/logout';
import CreateGame from './views/create-game';
import Header from './components/header';
import Footer from './components/footer';
import { UserProvider, defaultUserState } from './components/context/user-context';
import { LogoutProvider } from './components/context/logout-context';
import AuthorizedRoute from './components/authorized-route';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    const userFromStorage = window.localStorage.getItem('user');
    const parsedUser = userFromStorage ? JSON.parse(userFromStorage) : {};
    this.state = {
      user: {
        ...defaultUserState,
        ...parsedUser,
        updateUser: this.updateUser,
      }
    };
  }

  updateUser = (user) => {
    this.setState({ user });
  }

  logout = (updateUser) => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('auth_token');
    updateUser({...defaultUserState, updateUser: this.updateUser});
  }

  render() {
    const { user } = this.state;
    return (
      <div className="container">
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <Router>
              <UserProvider value={ user }>
              <LogoutProvider value={this.logout}>
                <Header />
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/login" component={Login} />                  
                  <Route path="/logout" component={Logout} />                  
                  <AuthorizedRoute path="/create-game" component={CreateGame} allowedRoles={['admin']} />
                  <Route component={NotFound} />
                </Switch>
                <Footer />
                </LogoutProvider>
              </UserProvider>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
