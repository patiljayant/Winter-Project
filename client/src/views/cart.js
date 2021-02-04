import {React, Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import '../assets/cartStyle.css';

class Cart extends Component{

    handleSubstractItems = (e) => {
        let id = e.target.id;
        console.log(id)
        axios.post('/api/apiRoutes/substractNumberOfItems', {id : id})
             .then(res => {
                this.props.substractNumberOfItems(res.data);
             })
        
    }
    handleAddItems = (e) => {
        let id = e.target.id;
        console.log(id)
        axios.post('/api/apiRoutes/addNumberOfItems', {id : id})
             .then(res => {
                this.props.addNumberOfItems(res.data);
             })
    }
    handleRemove = (e) => {
        let id = e.target.id;
        console.log(id)
        axios.post('/api/apiRoutes/removeCartProduct', {id : id})
             .then(res => {
                this.props.updateCart(res.data);
             })
    }

    render(){
        console.log(this.props)
        const productsInCart = this.props.productsInCart;
        const inCartList = productsInCart.length ? (
            productsInCart.map(productInCart => {return(
           <div>
            <div className="cart-ldiv">
                <div className="cart-img-div">
                    <img className="img-thumbnail rounded float-start"  src={productInCart.imgUrl}/>
                </div>
                <div className="cart-info-div">
                    <span>{productInCart.name.toUpperCase()}</span><br/>
                    <p className="home-reduce-margin"><span>&#8377;{Math.round(productInCart.price - (productInCart.discount/100)*productInCart.price)}</span>&nbsp;<s>&#8377;{productInCart.price}</s> {productInCart.discount}% off</p>
                    {productInCart.inStock ? <p className="home-reduce-margin text-info">In Stock</p> : <p className="home-reduce-margin text-danger" >Out of Stock</p>}
                    {Math.round(productInCart.price - (productInCart.discount/100)*productInCart.price) > 1000 ? <p className="home-reduce-margin text-info">Free Delevery</p> : <p className="home-reduce-margin text-danger">Delevery Charges Applied</p>}
                    <button type="button" className="btn cart-mk" id={productInCart._id} onClick={this.handleSubstractItems} >-</button> <button className=" btn cart-count">{productInCart.numberOfItems}</button> <button className="btn cart-mk" id={productInCart._id} onClick={this.handleAddItems} >+</button><br/>
                    <button className="btn btn-danger cart-remove" id={productInCart._id} onClick={this.handleRemove}>REMOVE</button>
                </div>
            </div>
            
            </div>
        )})
        ):( <div className='jumbotron'>HEY, NO PRODUCTS ADDED IN CART YET</div>);

        var totalPrice=0, netPrice=0, idca=0;
        
        productsInCart.forEach(product => {
            totalPrice += product.numberOfItems*product.price;
            netPrice += product.numberOfItems*(product.price - (product.discount/100)*product.price);
            if((product.price - (product.discount/100)*product.price) < 1000)
                idca++;
        });

        let dCharge = idca ? idca*120 : 0;

        const priceDetails = productsInCart.length ? (
            <div className="cart-price">
                    <div><span className="float-left"> TOTAL PRICE</span> <span className="float-right">&#8377;{Math.round(netPrice)}</span></div>
                        <div><span className="float-left">DISCOUNT</span><span className="float-right">&#8377;{Math.round(totalPrice-netPrice)}</span></div>
                        <div><span className="float-left">DELEVERY CHARGES</span><span className="float-right">&#8377;{dCharge}</span></div> 
                        <hr/>
                        
                        <div className="net-total"><span className="float-left">TOTAL AMOUNT</span><span className="float-right">&#8377;{Math.round(netPrice + dCharge)}</span></div>
                          <button class="btn btn-primary buy-btn" type="button" onClick = { ()=>{this.props.history.push('/'+this.props.user._id +'/address', {from : "cart"})}}>PROCEED TO BUY</button>
                        </div>
        ):(<div></div>)

        return(
            <div className="Cart container-fluid">
            <br/>
            <div>
            </div>
            <div className="cart-mld col-md-8"> 
                {this.props.user.productsInCart.length ? (<div className="my-cart">MY CART ( {this.props.productsInCart.length} ) </div>):(<></>)}
                {inCartList}
            </div>
                <div className="cart-mrd cart-sticky col-md-4">
                {this.props.user.productsInCart.length ? (<div className="my-cart">PRICE DETAILS</div>):(<></>)}
                    {priceDetails}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        productsInCart: state.user.productsInCart,
        user : state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateCart: (user) => {
            dispatch({type:'UPDATE_CART',user: user});
        },
        addNumberOfItems: (user) => {
            dispatch({type:'ADD_ITEM',user : user});
        },
        substractNumberOfItems: (user) => {
            dispatch({type:'SUBSTRACT_ITEM',user:user});
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));