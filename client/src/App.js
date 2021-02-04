import { React, Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import './App.css';
import Navbar from './views/navbar.js';
import Home from './views/home.js';
import Product from './views/product.js';
import Cart from './views/cart.js';
import Login from './views/Login.js'
import Register from './views/Register';
import AddProduct from './views/addProduct.js';
import Search from './views/searchedProducts.js';
import Dashboard from './views/dashboard.js';
import VerifyEmail from './views/verify.js';
import AddAddress from './views/addAddress';
import Address from './views/addresses';
import Footer from './views/footer.js';
import Onw from './views/ordersOnWay.js'




class App extends Component{
  async componentDidMount(){
    await axios.get('/api/apiRoutes/getInitialState')
         .then(res => {
           this.props.checkLoginstatus(res.data);
           this.props.fetchProducts(res.data.products);
         })

  }
  render(){
    
    return (<BrowserRouter>
      <div className="App">
        <Route path ='/' component = {Navbar}/>
        
        <Switch>
        <Route exact path='/' render={()=><Home/>}/>
        <Route exact path='/productsInCart' render={()=> this.props.state.isLoggedIn ? (<Cart/>):(<Redirect to='/login'/>)}/>
        <Route exact path='/ordersOnWay' render={()=> this.props.state.isLoggedIn ? (<Onw/>):(<Redirect to='/login'/>)}/>
        <Route exact path='/products/:id'  component={Product}/>
        <Route exact path='/:uId/address' render={()=> this.props.state.isLoggedIn ? (<Address/>):(<Redirect to='/login'/>)}/>
        <Route exact path='/:uId/addAdderss' render={()=> this.props.state.isLoggedIn ? (<AddAddress/>):(<Redirect to='/login'/>)}/>
        <Route exact path='/login' render={()=> this.props.state.isLoggedIn ? (<Redirect to='/' />):(<Login/>)}/>
        <Route exact path='/register' render={()=> this.props.state.isLoggedIn ? (<Redirect to='/' />):(<Register/>)}/>
        <Route exact path='/addProduct' component={AddProduct}/>
        <Route path='/search/:value' component={Search}/>
        <Route exact path='/:uId/dashboard' render={()=> this.props.state.isLoggedIn ? (<Dashboard/>):(<Redirect to='/login'/>)}/> 
        <Route exact path='/:uId/verify' component={VerifyEmail}/>        
        </Switch>
        <br/><br/>
        <Route path ='/' component = {Footer}/>
      </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return{
      state : state
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
  checkLoginstatus: (status) => {
    dispatch({type:'LOGIN_STATUS',status:status});
    },
    fetchProducts : (products) => {
      dispatch({type:'FETCH_PRODUCTS', products:products})
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
