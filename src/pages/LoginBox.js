// import { ReactComponent } from "*.svg";
import React from 'react'

class LoginBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {username: "", password: "", returnToken: this.props.returnToken}
        this.handleChangeUsername = this.handleChangeUsername.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)


    }

    handleChangeUsername(event) {
        this.setState({username: event.target.value})
    }
    handleChangePassword(event) {
        this.setState({password: event.target.value})
    }

    handleSubmit(event) {
        alert('a name was submitted: ')
        event.preventDefault()
    }

    render() {
        return (
            <div>
              <header>
                Welcome to Green Thumb, please log in below:
              </header>
              <br/>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Username:
                  <input type="text" name="username" value={this.state.username} onChange={this.handleChangeUsername}/>
                </label> <br/>
                <label>
                  Password: 
                  <input type="password" name="password" value={this.state.password} onChange={this.handleChangePassword} />
                </label> <br/>
                <input type="submit" name="submit"/>
              </form>
            </div>
          )
    }
}

export default LoginBox