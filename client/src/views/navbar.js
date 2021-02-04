import { React, Component } from 'react';
import { Link, NavLink, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../assets/logo.png';
import Cart from '../assets/cart.png';
import SI from '../assets/searchIcon.png';
import '../assets/navbarStyle.css';
import axios from 'axios';
import Close from '../assets/close-outline.svg';
import Menu from '../assets/menu-outline.svg';

class Navbar extends Component{

    state={
        value:null
    };

    handleLogOut = (e) => {
        axios.get('/api/apiRoutes/logout')
             .then((res) => {
                this.props.checkLoginstatus(res.data);
             });
    }
    handleSearch = (e) => {
        e.preventDefault();
        if(this.state.value === null || this.state.value === "")
            e.preventDefault();

        else{
                
               if(this.props.state.searchValue !== this.state.value){
                   console.log('sucess')
                   this.props.updateSearchValue(this.state.value);
                   this.props.history.push('/search/'+this.state.value)
               }
            }   
    }
    
    
    handleChange = (e) => {
        this.setState({
            value:e.target.value,
            position : -258
        });
    }
    
    handleSidebar = () =>{
        console.log('cllicked')
        this.setState({
            position : 0
        })
    }

    handleSidebarClose = () => {
        this.setState({
            position : -258
        })
    }

    render(){
    const flag = this.props.state.isLoggedIn ? (
        <li class="nav-item" onClick = {this.handleLogOut}> <span className="set-display">&nbsp; </span><Link > <button className="btn btn-light set-display">LogOut</button></Link></li>):(
        <li class="nav-item"><span className="set-display">&nbsp;</span> <Link to={"/login"} ><button className="btn btn-light set-display">LogIn/SignUp</button></Link></li>);

    return(
    <div className="Navbar">
    <div className='sidebar' style={{ position:'fixed' ,left:this.state.position}}>
    <div className="close-sidebar" onClick={this.handleSidebarClose}>
    <img src={Close} />
    </div>
    <div className='sidebar-head'>Hello, {this.props.state.isLoggedIn ? (this.props.state.user.firstName):(<>User</>)}</div>
    <div className='dropdown-divider'></div>
    <div className="sidebar-body">Home</div>
    <div className='dropdown-divider'></div>
    {this.props.state.isLoggedIn ? (<Link to={'/'+ this.props.state.user._id +'/dashboard'} style={{textDecoration:'none', color:'#8cfffb'}}><div className="sidebar-body">Dashboard</div><div className='dropdown-divider'></div></Link>) : (<div></div>)}
    
    <Link to='/ordersOnway' style={{textDecoration:'none', color:'#8cfffb'}}><div className="sidebar-body">Orders On The Way</div></Link>
    <div className='dropdown-divider'></div>
    <div className="sidebar-body">Buy Again</div>
    <div className='dropdown-divider'></div>
    {this.props.state.isLoggedIn ? (<div className="sidebar-body" onClick = {this.handleLogOut}>LogOut</div>) : 
    (<Link to='/login' style={{textDecoration:'none', color:'#8cfffb'}}><div className="sidebar-body" >Login/SignUp</div></Link>)}
    <div className='dropdown-divider'></div><br/>
    </div>
        <nav class="navbar navbar-expand-lg navbar-light " >
        <div className="sidebar-toggler" onClick={this.handleSidebar}>
        <img src={Menu} />
        </div>
                <Link className="navbar-brand mobile-display" to={"/"}>
                    <img src={ Logo } alt="IIIT.com" width="120" height="24"/>
                </Link>
                <div className="contain mobile-display">
                                <button className="btn set-item">
                                    <img src={ Cart } alt="Cinque Terre" width="35" height="25"/>
	        						{this.props.state.isLoggedIn ? <div class="center" >{this.props.state.user.productsInCart.length}</div> :<></>}
                                </button>
                </div>  
            <div className="container"> 
                <Link className="navbar-brand set-display" to={"/"}>
                    <img src={ Logo } alt="IIIT.com" width="120" height="24"/>
                </Link>
                    
                <form class="form-inline d-flex my-2 my-lg-0" onSubmit={this.handleSearch}>
                    <input class="control-input" type="search" placeholder="Search" aria-label="Search" onChange={ this.handleChange } />
                    <button class="control-button my-2 my-sm-0" width="45" type="submit">
                        <img src={ SI } alt="search" width="20" height="20"/>
                    </button>
                </form>
                
                <div class="set-item" id=''>
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active ">
                            <div className="contain">
                                <button className="btn set-display" onClick={()=>{this.props.history.push('/productsInCart')}}>
                                    <img src={ Cart } alt="Cinque Terre" width="35" height="25"/>
	        						{this.props.state.isLoggedIn ? <div class="center" >{this.props.state.user.productsInCart.length}</div> :<></>}
                                </button>
                                </div>              
                        </li> 
        
                        {flag}
                    
                    </ul>
                </div>
            </div>                    
        </nav>

    </div>
    );
}
}
const mapStateToProps = (state) =>{
    return{
    state : state
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
    checkLoginstatus: (status) => {
      dispatch({type:'LOGIN_STATUS',status:status});
      },
    
    updateSearchValue : (value) => {
        dispatch({type:'SEARCH_VALUE', value:value});
    }  
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
