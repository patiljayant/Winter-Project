import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import _ from 'lodash';
import '../assets/productStyle.css';


class Product extends Component{
    state = {
        altImages: this.props.product.altImgUrl,
        image: this.props.product.imgUrl
    }
    
    componentDidMount(){
        this.props.similarProducts(this.props.product._id);
    }

    handleClick = (e) =>{
        let imgUrl = this.state.image,
            targetImgUrl = e.target.alt,
            targetImgId = e.target.id;
        let altImages = this.state.altImages.filter(product => product._id != targetImgId);
        const alt = {
            _id : targetImgId,
            imgUrl : imgUrl
        }
        altImages = [...altImages, alt]
        this.setState({
            ...this.state,
            altImages: altImages,
            image: targetImgUrl
        });
    }
    
    handleAddingToCart = (e) => {
        if(this.props.isLoggedIn){
            const product = this.props.product;
            product.numberOfItems = 1 ;
            axios.post('/api/apiRoutes/addToCart', product)
                     .then(res => {
                        this.props.addToCart(res.data);
                     })
                     .catch(err => console.log('err ' + err))
        }
        else{
            this.props.history.push('/login')
        }    
    }
    
    handleDirectBuy = () => {
        if(this.props.isLoggedIn){
            const product = this.props.product;
            product.numberOfItems = 1 ;
            axios.post('/api/apiRoutes/addToCart', product)
                     .then(res => {
                        this.props.addToCart(res.data);
                        this.props.history.push('/'+this.props.user._id+'/address', { from: this.props.product._id })
                     })
                     .catch(err => console.log('err ' + err))
        }
        else{
            this.props.history.push('/login')
        } 
    }

    calculateRating = (p) => {
        var sum = 0;
        for(var i=0;i<p.rating.length;i++){
            sum+=p.rating[i];
        }
        return sum/p.rating.length;
    }

    render(){
        const altImagesList = this.state.altImages.length ?(
            this.state.altImages.map(altImage => {return(
                <img className="img-thumbnail rounded float-start" alt={altImage.imgUrl} src={altImage.imgUrl} id={altImage._id} onClick={ this.handleClick}/>
            );})
        ):(<div></div>);
        var inCart = false;
         if(!(_.isEmpty(this.props.user))){
             this.props.user.productsInCart.forEach(p => {
                 if(this.props.product._id === p._id)
                     inCart = true;
             });
         }
         const btn = _.isEmpty(this.props.user) ? (<button className="btn btn-primary btn-a" onClick={this.handleAddingToCart}>ADD TO CART</button>):
                                                  (inCart ? (<Link to='/productsInCart' ><button className="btn btn-primary btn-a" >GO TO CART</button></Link>):
                                                  ((<button className="btn btn-primary btn-a" onClick={this.handleAddingToCart}>ADD TO CART</button>)));

        const product = this.props.product ? (
            <div className="bg-div" >
            <div className="img-div col-md-5" >
                
            <div className="small-image">
            { altImagesList }
            </div>
             <div className="big-image">
             <img className="img-thumbnail rounded float-start rmv-border" alt="" src={ this.state.image}/>
           
              {btn}
             <button className="btn btn-success btn-b" onClick={this.handleDirectBuy} >BUY</button>
             </div>
            </div>
            <div className="info-div col-md-7" >
            <span>{this.props.product.name.toUpperCase()}</span><br/>
                            <p className="text-muted home-reduce-margin"><button className="btn btn-success" type="button" >{this.props.product.rating.length ? (this.calculateRating(this.props.product).toFixed(1)):(0)} &#9734;</button> {this.props.product.rating.length} Ratings and {this.props.product.reviews.length} Reviews</p>
                            <p className="home-reduce-margin" ><b><span>&#8377;{Math.round(this.props.product.price - (this.props.product.discount/100)*this.props.product.price)}</span></b> &nbsp; <s>&#8377; {this.props.product.price}</s> &nbsp; {this.props.product.discount}% off</p>
                            <b>{this.props.product.emiAvailable ? <p className="home-reduce-margin text-info">EMI Available</p>: <p className="home-reduce-margin text-danger" >EMI Not Available</p> }
                            {this.props.product.inStock ? <p className="home-reduce-margin text-info">In Stock</p> : <p className="home-reduce-margin text-danger" >Out of Stock</p>}
                            </b> <p className="home-reduce-margin">{this.props.product.info}</p>  
            </div>
        </div>
        ):(<div className='container text-danger'>
        <h2>Error 404: Product not Found</h2>
    </div>)
    const similarProducts = this.props.foundSimilarProducts
    const sp = similarProducts.length ? (
        similarProducts.map(product => {
            return(
                <div className='similar-card' >
                <img className="img-thumbnail rounded rmv-border" alt="" src={product.imgUrl} />
                <div className="caption">
                {product.name.toUpperCase()}
                </div>
                </div>
            )
        })
    ) : (<></>)
        return(<div className='container-fluid '>
            <div >
            <br/>
               {product}
            </div><br/><br/>
            <div className='text-center'>SIMILAR PRODUCTS</div>
            <div className='scroll'>
                {sp}                
            </div>
            </div>
        );
    }
}

const mapStateToProps = (state, myProps) => {
    let id = myProps.match.params.id;
    return{
        product: state.products.find(product => id==product._id),
        isLoggedIn : state.isLoggedIn,
        user : state.user,
        foundSimilarProducts : state.similarProducts
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        updateImage : (idObject) => {
            dispatch({type:'UPDATE_IMAGE', object:idObject});    
        },
        addToCart : (user) =>{
            dispatch({type:'ADD_TO_CART',user:user});
        },
        similarProducts : (id) => {
            dispatch({type:'FIND_SIMILAR_PRODUCTS', id:id});
        }
      }

    }
    

export default connect(mapStateToProps, mapDispatchToProps)(Product);