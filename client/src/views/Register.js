import React , {Component} from 'react';
import ReactFormInputValidation from "react-form-input-validation";
import axios from 'axios';
import Logo from '../assets/logo - Copy.png'
import {connect} from 'react-redux'
import '../assets/Login-Register.css';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';


class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  fields: {
			first_name: "",
			last_name:"",
			username: "",
			phone_number: ""
		  },
		  errors: {},
		  msg :''
		};
		this.form = new ReactFormInputValidation(this);
		this.form.useRules({
			first_name: "required",
			last_name: "required",
			username: "required|email",
			phone_number: "required|numeric|digits:10",
			password: "required|confirmed",
			password_confirmation: "required"
		});
		this.form.onformsubmit = (fields) => {
			axios.post('/api/apiRoutes/register',fields)
			.then(res => {
				const msg = res.data;
				this.setState({
					msg : msg
				})
		})
			console.log('success');
		}
	  }
    render() {
        return (
	<div>       
    <body>
	


	<div className='container'>
            <br/><br/><br/>
			<div className="text-danger text-center">
                {this.state.msg}
			</div>
			<br/>
            <div className="row main-content">
			<div className="col-md-4 text-center company__info">
				<div className="company__logo"><img src={ Logo } alt="IIIT.com" width="120" height="24"/></div>
			</div>
            <div className="login-register col-md-8 col-xs-12 col-sm-12">
            
                <h3>Register</h3>
                <form onSubmit={this.form.handleSubmit}>
				<div className="form-row">
                    <div class="form-group col-md-5">
                      <label for="fullname">First Name</label>
                      <input name="first_name"
				  id="first_name"
				   className="form-control"
				    placeholder="First Name"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.first_name} required/>

<div className="error">
                {this.state.errors.first_name ? <span className="text-danger">* {this.state.errors.first_name} </span> : ""}
              
			  </div>
                    </div>
<div className="col-md-1 col-sm-0"></div>
					<div class="form-group col-md-5">
                      <label for="fullname">Last Name</label>
                      <input name="last_name"
				  id="last_name"
				   className="form-control"
				    placeholder="Last Name"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.last_name} required/>

<div className="error">
                {this.state.errors.last_name ? <span className="text-danger">* {this.state.errors.last_name} </span> : ""}
              
			  </div>
                    </div>
                    <div class="form-group col-md-11">
                      <label for="username">Email-Id</label>
                      <input type="email"
                  name="username"
				  id="username" 
				  className="form-control" 
				  placeholder="Email-Id"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.username} required/>

<div className="error">
                {this.state.errors.username ? <span className="text-danger">* {this.state.errors.username} </span> : ""}
              </div>
                    </div>
                    <div class="form-group col-md-11">
                      <label for="phonenumber">Contact</label>
                      <input type="tel"
                  name="phone_number"
				  id="phonenumber" 
				  className="form-control" 
				  placeholder="Phone Number"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.phone_number} required/>

<div className="error">
                {this.state.errors.phone_number ? <span className="text-danger">* {this.state.errors.phone_number} </span> : ""}
              </div>
                    </div>

                    <div class="form-group col-md-11">
                      <label for="password">Password</label>
                      <input type="password" 
	               className="form-control"
	               name="password" id="password" placeholder="Create password" onBlur={this.form.handleBlurEvent} 
	               onChange={this.form.handleChangeEvent} 
	               value={this.state.fields.password} 
	               noValidate required/>

<div className="error">
                {this.state.errors.password ? <span className="text-danger">* {this.state.errors.password} </span> : ""}
              </div>
                    </div>
                    <div class="form-group col-md-11">
                      <label for="password_confirmation">Confirm Password</label>
                      <input type="password" 
	               className="form-control"
	               name="password_confirmation" 
	               id="password_confirmation" 
	               placeholder="Confirm password" 
	               onBlur={this.form.handleBlurEvent} 
	               onChange={this.form.handleChangeEvent} 
	               value={this.state.fields.password_confirmation} noValidate
				    required/>

<div className="error row">
                {this.state.errors.confirm_password ? <span className="text-danger">* {this.state.errors.confirm_password} </span> : ""}
            </div>
                    </div>
                    <div className='col-md-10'>
                    <button type="submit" class="btn btn-primary">Sign Up</button>
                    </div>
					</div>
                </form>
                <br/>
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

export default withRouter(connect(null, mapDispatchToProps)(Register));