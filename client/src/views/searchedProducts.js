import {React, Component} from 'react';
import { connect } from 'react-redux';
import {Link,NavLink} from 'react-router-dom';
import Navbar from './navbar.js'
import '../assets/homeStyle.css';
import Drop from '../assets/chevron-down-outline.svg';

class Search extends Component{

   componentDidMount(pre){
       console.log('sucess')
        this.props.search(this.props.match.params.value);
   } 

   componentDidUpdate(pre){
    console.log(pre)
    if(pre.location.pathname !== this.props.location.pathname){
        console.log(this.props)
     this.props.search(this.props.match.params.value);
    }
}

    state = {
        preValue : ''
    }

    sortDescending = () =>{
        this.props.sortHighToLowSearch();
    }

    sortAscending = () => {
        this.props.sortLowToHighSearch();
    }
    
    sortRating = () => {
        this.props.sortRatingSearch();
    }

    calculateRating = (p) => {
        var sum = 0;
        for(var i=0;i<p.rating.length;i++){
            sum+=p.rating[i];
        }
        return sum/p.rating.length;
    }

    render(){
        const products = this.props.products;
        const sort = products.length ? (<div className="mld ">
        <div className="ldiv">
            <span>SORT BY</span>
            <div class="navbar-toggler float-right" type="button" data-toggle="collapse" data-target="#sortDropDown" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <img className="adjust-dropdown" src={Drop} />
            </div>
            <br/>
            <div class="dropdown-divider"></div>
            <div class="collapse navbar-collapse" id="sortDropDown">
            <ul className="navbar-nav">
            <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Price
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" onClick={this.sortDescending} >High to Low</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" onClick={this.sortAscending} >Low to High</a>
        </div>
      </li>
      <li>
      <a class="nav-link" href="#" onClick={this.sortRating} >
          Rating
        </a>
        </li>
        <li>
      <a class="nav-link" href="#"  >
          Relevence
        </a>
      </li>
      </ul>
      </div>
        </div>
        <br/>
    </div>):(<div></div>)
        const productList = products.length ? (
            products.map(product => {return(
                    <div className="mrd" key={product._id} >
                        <Link to={'/products/' + product._id }  style={{ color: 'inherit', textDecoration: 'none', margin:0}}>
                            <div className="rdiv" >
                                    <div className="productImage">
                                        <img className="img-thumbnail rounded float-start" style={{border:'none'}} alt={product.imgUrl} src={product.imgUrl} />
                                    </div>

                                <div className="productInfo" >
                                    <span>{product.name.toUpperCase()}</span><br/>
                                    <p className="text-muted home-reduce-margin"><button className="btn btn-success" type="button" >{ product.rating.length ? (this.calculateRating(product).toFixed(1)):(0) } &#9734;</button> {product.rating.length} Ratings and {product.reviews.length} Reviews</p>
                                    <p className="home-reduce-margin p-desc">{product.info.substring(0,300)}...</p>

                                    <div className="p-desc p-price">
                                    <span>&#8377; {Math.round(product.price - (product.discount/100)*product.price)}</span>
                                    <p className="home-reduce-margin"> <s>&#8377; {product.price}</s> &nbsp; {product.discount}% off</p>
                                    </div>

 
                                </div>
    
                                <div className="productPrice p-desc">
                                    <span>&#8377; {Math.round(product.price - (product.discount/100)*product.price)}</span><br/>
                                    <p className="home-reduce-margin"> <s>&#8377; {product.price}</s> &nbsp; {product.discount}% off</p>
                                    <b>{ product.emiAvailable ? <p className="home-reduce-margin text-info">EMI Available</p>: <p className="home-reduce-margin text-danger" >EMI Not Available</p> }
                                    {product.inStock ? <p className="home-reduce-margin text-info">In Stock</p> : <p className="home-reduce-margin text-danger" >Out of Stock</p>}
                                    </b>
                                </div>
                            </div>
                        </Link>
                    </div>           
             ) })
        ) : (<div className='jumbotron'>HEY, NO PRODUCTS FOUND RELATED TO YOUR SEARCH</div>)
        return(
            <div className='home row'>
            <div className="col-md-3 cart-sticky home-mld">{sort}</div>

               <div className="col-md-9 home-mrd" >    { productList } </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return{
        products: state.searchedProducts,
        value : state.searchValue
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        sortHighToLowSearch : () => {
            dispatch({type:'SORT_SEARCH_HIGH_TO_LOW'});
        },
        sortLowToHighSearch : () => {
            dispatch({type:'SORT_SEARCH_LOW_TO_HIGH'});
        },
        sortRatingSearch : () => {
            dispatch({type:'SORT_SEARCH_BY_RATING'})
        },
        search : (value) => {
            dispatch({type:'SEARCH', value:value});
        }  
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
