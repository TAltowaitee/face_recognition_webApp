import React from 'react';
// import { userInfo } from 'os';


class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          signInEmail: '',
          signInPassword: ''
        }
      }

    onEmilChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPassworddChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3003/signin',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if(user.id) {
                    this.props.onRouteChange('home');
                    this.props.loaduser(user);
                 }
            })
    }
    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br4 ba shadow-5 b--black-10 mv4 w-100 w-100-m w-25-l mw6  center">
              <div className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                            <input 
                                onChange = {this.onEmilChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                            <input 
                                onChange = {this.onPassworddChange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input 
                            onClick = {this.onSubmitSignIn}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in" />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick = {() => onRouteChange('register')} href="#0" className="f6 link dim black db pointer">Register</p>
                    </div>
                 </div>
                </div>
            </article>
        );
    }
    
}

export default Signin;