import React from 'react';


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          registerName: '',
          registerEmail: '',
          registerPassword: ''
        }
      }
    onNameChange = (event) => {
        this.setState({registerName: event.target.value})
    }

    onEmilChange = (event) => {
        this.setState({registerEmail: event.target.value})
    }

    onPassworddChange = (event) => {
        this.setState({registerPassword: event.target.value})
    }

    onSubmitRegister = () => {
        fetch('http://localhost:3003/register',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user) {
                    this.props.loaduser(user);
                    this.props.onRouteChange('home');
                }
                
            })
    }
    
    render() {
        return (
            <article className="br4 ba shadow-5 b--black-10 mv4 w-100 w-100-m w-25-l mw6  center">
              <div className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f5" htmlFor="name">Name</label>
                            <input 
                                onChange = {this.onNameChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"
                                id="name" />
                        </div>
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
                            onClick = {this.onSubmitRegister}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register" />
                    </div>
                 </div>
                </div>
            </article>
        );
    }
}  

export default Register;