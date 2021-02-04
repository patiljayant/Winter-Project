import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../assets/logo - Copy.png'
import ReactFormInputValidation from 'react-form-input-validation';
import axios from 'axios'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import '../assets/Login-Register.css';


class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  fields: {
			username: "",
			password:""
		  },
		  errors: {},
		  submissionError : ""
		};
		this.form = new ReactFormInputValidation(this);
		this.form.useRules({
			username: "required|email",
			password: "required"
		});
		this.form.onformsubmit = (fields) => {
			axios.post('/api/apiRoutes/login',fields)
			     .then(res => {
					  const user = res.data;
					  if(user.isLoggedIn){
						this.setState({
							...this.state,
							submissionError: ""
						});
					  this.props.checkLoginstatus(user)
					}

					else{
						this.setState({
							...this.state,
							submissionError: "Invalid Credentials"
						});
					}
					    
			  })
		}
	  }
    render() {
        return (
	<div >       
    <body>
	<br/>
	<div className='text-center text-danger submission-error '>
		{this.state.submissionError}
	</div>
	

	<div className='container'>
            <br/><br/><br/>
            <div className="row main-content">
			<div className="col-md-4 text-center company__info">
				<div className="company__logo"><img src={ Logo } alt="IIIT.com" width="120" height="24"/></div>
			</div>
            <div className="login-register col-md-8 col-xs-12 col-sm-12">
            
                <h3>Log In</h3>
                <form onSubmit={this.form.handleSubmit}>
                    <div class="form-group col-md-11">
                      <label for="username">Email-Id</label>
                      <input type="email"
					         className='form-control'
                              name="username"
				              id="username" 
				              placeholder="E-Mail"
                              onBlur={this.form.handleBlurEvent}
                              onChange={this.form.handleChangeEvent}
                              value={this.state.fields.username}
							  required/>
							  <div className="error">
                              {this.state.errors.username ? <span className="text-danger">* {this.state.errors.username} </span> : ""}
                            </div>
                    </div>
					
                    <div class="form-group col-md-11">
                      <label for="password">Password</label>
                      <input type="password" 
	                               name="password" 
					               className='form-control'
								   id="password" 
								   placeholder="Enter password" 
								   onBlur={this.form.handleBlurEvent} 
	                               onChange={this.form.handleChangeEvent} 
	                               value={this.state.fields.password} 
	                               noValidate
								   required/>
                    </div>
                    <div className='col-md-10'>
                    <button type="submit" class="btn btn-primary">Log In</button>
                    </div>
                </form>
                <br/>
                <div className="col-md-10">
						<p>Don't have an account? 
						<Link to='/register'>
                            Register Here
                        </Link>    
                        </p>
					</div>
            </div>
            </div>
            </div>
           <br/><br/>

</body>
    </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
	return{
	checkLoginstatus: (status) => {
	  dispatch({type:'LOGIN_STATUS',status:status});
	  }
	}
  }

export default withRouter(connect(null, mapDispatchToProps)(Login));