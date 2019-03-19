import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../services/auth-service';
import { UserConsumer } from '../components/context/user-context';

class Login extends Component {
    static service = new AuthService();

    state = {
        email: '',
        password: '',
        error: '',
    }

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value,
        })
    }

    handleSubmit = ( event ) => {
        event.preventDefault();
        const { email, password } = this.state;
        const { updateUser } = this.props;

        const credentials = {
            email, 
            password
        };

        this.setState({error: ''}, 
            async () => {
                try{
                    const result = await Login.service.login(credentials);
                    if(!result.success){
                        if(result.errors){
                            const errors = Object.values(result.errors).join(' ');
                            throw new Error(errors);
                        }
                        throw new Error(result.message);
                    }
                    
                    window.localStorage.setItem('auth_token', result.token);
                    window.localStorage.setItem('user', JSON.stringify({
                        ...result.user,
                        isLoggedIn: true,
                    }));
                    
                    updateUser({
                        ...result.user,
                        isLoggedIn: true,
                        updateUser,
                    });             

                } catch(error) {
                    this.setState({
                        error: error.message,
                    });
                }
            }
        );        
    }

    render() {  
        const { email, password, error } = this.state;
        const { isLoggedIn } = this.props;
        if(isLoggedIn){
            return (
                <Redirect to='/' />
            );
        }
        return (
            <div>
                {
                    error.length
                    ? <p>Something went wrong: {error}</p>
                    : null
                }
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            name="email" 
                            aria-describedby="emailHelp" 
                            value={email} 
                            onChange={this.handleChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            name="password" 
                            value={password}
                            onChange={this.handleChange}
                        />
                    </div>                
                    <button type="submit" className="btn btn-primary">Log in</button>
                </form>
            </div>            
        );
    }
}

const LoginWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({isLoggedIn, updateUser}) => (
                    <Login 
                        {...props}
                        isLoggedIn={isLoggedIn}
                        updateUser={updateUser}
                    />
                )
            }
        </UserConsumer>
    )
}

export default LoginWithContext;
