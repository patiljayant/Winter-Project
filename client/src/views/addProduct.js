import React, { Component } from "react";
import "../App.css";
import ReactFormInputValidation from "react-form-input-validation";
import axios from "axios";

class AddProduct extends Component{

    constructor(props) {
		super(props);
		this.state = {
            files : [],
		  fields: {
            name : "",
            price : "",
            discount : "", 
            emiAvailable : "",
            inStock : "",
            info: ""  
		  },
		  errors: {},
		  
		};
		this.form = new ReactFormInputValidation(this);
		this.form.useRules({
			name: "required",
			image: "required",
			price: "required|numeric",
			discount: "required|numeric",
            inStock: "required",
            emiAvailable: "required",
            info: "required"
		});
		this.form.onformsubmit = (fields) => {
			this.send(fields);
		}
	  }

    send = (fields) => {
        const price = parseInt(fields.price),
              discount = parseInt(fields.discount),
              a = Array.from(this.state.files),
              name = fields.name,
              info = fields.info;
        var inStock, emiAvailable;
        console.log(this.state.files[0])
        if(fields.inStock == 'true')
            inStock = true;

        else
            inStock = false;
            
        if(fields.emiAvailable == 'true')
            emiAvailable = true;

        else
            emiAvailable = false;    

        
        const data = new FormData();
        data.append("name", name);
        data.append("price", price);
        data.append("discount", discount);
        data.append("inStock", inStock);
        data.append("emiAvailable", emiAvailable);
        data.append("info", info);
        for(var i=0; i < a.length; i++){
            data.append("files",this.state.files[i] )
        }

        axios.post("api/apiRoutes/addProduct", data)
          .then(res => {
              this.props.history.push('/');
          })
          .catch(err => console.log('err'));
      };    
    render() {
  
  return (
	<div>       
    <body>
	<div className="container-fluid">
		<div className="row main-content bg-success text-center">
			<div className="col-md-4 text-center company__info">
				<span className="company__logo"><h2><span class="fa fa-android"></span></h2></span>
				<h4 className="company_title">IIIT.com</h4>
			</div>
			<div className="col-md-8 col-xs-12 col-sm-12 login_form">
				<div className="container-fluid">
					<div className="row">
						<h2>Register</h2>
					</div>
					<div className="row">
						<form className="form-group" onSubmit={this.form.handleSubmit} >
						<div class="row">    
                <input
                  type="text"
                  name="name"
				  id="ProductName"
				   className="form__input"
				    placeholder="Product Name"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.name}
                />
			  </div>
              <div className="error row">
                {this.state.errors.name ? <span>* {this.state.errors.name} </span> : ""}
              
			  </div>
 
			  <div class="row">
                <input
                  type="file"
                  multiple
                  name="image"
				  id="file" 
				  className="form__input" 
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent , event => {
                const files = event.target.files;
                this.setState({
                     files : files
                })
                const max_length = 5;
                if(Array.from(files).length > max_length){
                    event.target.value = null;
                    alert('Cannot upload files more than '+ max_length);
                    this.state.errors.image = "Cannot take more than five photos"
                }
              }}
                />
			  </div>
              <div className="error row">
                {this.state.errors.image ? <span>* {this.state.errors.image} </span> : ""}
              </div>
 
            
			<div className="row">
            <input
                  type="tel"
                  name="price"
				  id="price" 
				  className="form__input" 
				  placeholder="Product's Price"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.price}
                />
            </div>
              <div className="error row">
                {this.state.errors.price? <span>* {this.state.errors.price} </span> : ""}
              </div>
			<div className="row">
            <input type="tel" 
	               className="form__input"
	               name="discount" 
				   id="discount" 
				   placeholder="Enter Discount( In %)" 
				   onBlur={this.form.handleBlurEvent} 
	               onChange={this.form.handleChangeEvent} 
	               value={this.state.fields.discount} 
	               noValidate />
			</div>
			<div className="error row">
                {this.state.errors.discount ? <span>* {this.state.errors.discount} </span> : ""}
            </div>
		    <div className="row">
            <div className="form__input" onChange= {e => {this.state.fields.inStock = e.target.value}}>In Stock&nbsp;&nbsp;
            <input type="radio" id="inStock-yes" value="true" name="inStock" onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent} /> Yes &nbsp;&nbsp;
            <input type="radio" id="inStock-no"  value="false" name="inStock" onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent} />No
            </div>
            </div><div className="error row">
                {this.state.errors.inStock ? <span>* {this.state.errors.inStock} </span> : ""}
            </div>
		    <div className="row">
            <div className="form__input" onChange= {e => {this.state.fields.emiAvailable = e.target.value}}>Is EMI Available&nbsp;&nbsp;
            <input type="radio" id="emiAvailable-yes" name="emiAvailable"  value="true" onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}/>Yes
            <input type="radio" id="emiAvailable-no" name="emiAvailable" value="false" onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}/> No
            </div>
            </div><div className="error row">
                {this.state.errors.emiAvailable ? <span>* {this.state.errors.emiAvailable} </span> : ""}
            </div>
            <div class="row">    
                <input
                  type="text"
                  name="info"
				  id="ProductInfo"
				   className="form__input"
				    placeholder="Product description"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.info}
                />
			  </div>
              <div className="error row">
                {this.state.errors.info ? <span>* {this.state.errors.info} </span> : ""}
              
			  </div>
			<div class="row">
              <button type="submit" className="btn login-register-btn" >Submit</button>
            </div>
            
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
    </div>
  );
}
}
export default AddProduct;