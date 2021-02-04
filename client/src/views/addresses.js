import { React, Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import '../assets/addresses.css'

class Address extends Component{
    state = {
        checkedAddress : ''
    }


    calculateDC = () => {
        let tc = 0;
        if(this.props.location.state.from !== "cart"){
            let p = this.props.user.productsInCart.filter(m => m._id === this.props.location.state.from)
            let price = Math.round(p[0].price - (p[0].discount/100)*p[0].price)
            if(price >1000)
                tc+=price;
            
            else
                tc+=(price + 120);
        }

        else{
            this.props.user.productsInCart.map(p => {
                let price = Math.round(p.price - (p.discount/100)*p.price);
                if(price >1000)
                tc+=price;
            
            else
                tc+=(price + 120);
            })
        }
        return tc;
    }

    displayRazorpay = async () => {
        const totalCharge = this.calculateDC();
        console.log(totalCharge)
        const result = await axios.post("/api/apiRoutes/orders", {totalCharge});

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency } = result.data;

        console.log(result.data)


        const options = {
            key: "rzp_test_Rr55cqI1se8NcK", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "IIIT.com",
            description: "Test Transaction",
            order_id: order_id,
            handler : async (response) => {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
                const result = await axios.post("/api/apiRoutes/success", data);

                if(result.data.msg === "Payment Successful"){
                        const obj = {
                            orderId : result.data.orderId,
                            paymentId : result.data.paymentId,
                            pId : this.props.location.state.from,
                            addressId : this.state.checkedAddress
                        }
                        axios.post('/api/apiRoutes/orderConfirmed', obj )
                             .then(res => {
                                 this.props.checkLoginstatus(res.data);
                                 this.props.history.push('/productsInCart')
                             })
                }
                alert(result.data.msg);
                
            },
            prefill: {
                name: this.props.user.firstName + this.props.user.lastName ,
                email: this.props.user.username,
                contact: this.props.user.phone_number,
            },
            notes: {
                address: this.props.user.addresses.filter(a => a._id === this.state.checkedAddress),
            },
            theme: {
                color: "#61dafb",
            },
            payment_capture: 1
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }


    handleSubmit = (e) => {
        console.log(this.state)
        e.preventDefault();
    }

    handleClick = (e) => {
        this.props.history.push('/'+ this.props.user._id +'/addAddress')
    }
    
    render(){
        console.log(this.props)
        const address = this.props.user.addresses
        const addressList =  address.length ? ( address.map(p => {return(
        <div className='address-card'>
            <div class="custom-control custom-radio">
  <input type="radio" id={p._id} name="customRadio" value={p._id} class="custom-control-input" onChange = {e => this.setState({checkedAddress:e.target.value})  }/>
  <label class="custom-control-label" for={p._id}> 
      {p.address.toUpperCase()}<br/>
      {p.address2.length ? (<div>{p.address2.toUpperCase()}</div>):(<div></div>)}
      {p.city.toUpperCase()}<br/>
      {p.state.toUpperCase()}<br/>
      {p.zip}
  </label>
</div>
        </div>)})):(
            this.props.history.push('/'+ this.props.user._id +'/addAddress')
        )
        var p;
        if(this.props.location.state.from !== "cart"){
            p = this.props.user.productsInCart.filter(m => m._id === this.props.location.state.from)
        }
        var sum = 0;   
        const summary = this.props.location.state.from === "cart" ? (
            this.props.user.productsInCart.map(p=> {
                let price = Math.round(p.price - (p.discount/100)*p.price);
                if(price < 1000)
                    sum+=(price+120);

                else
                    sum+=price;
                
                return(
                <div>
                <div className="row" >
                   <div className="col-sm-10">{p.name.toUpperCase()} &nbsp;
                   { Math.round(p.price - (p.discount/100)*p.price)<1000 ? (<div className="text-danger text-sm" >Delivery Charges Applied</div>) : (<></>)}
                   </div>
                   <div className="col-sm-2">&#8377;{Math.round(p.price - (p.discount/100)*p.price)}
                   { Math.round(p.price - (p.discount/100)*p.price)<1000 ? (<div className="text-danger text-sm">(+&#8377;120)</div>) : (<></>)}
                   </div>
                   </div>
                   <div className="dropdown-divider"></div>
        </div>
            )})
            ) : (
                <div>
                <div className="row" >
                   <div className="col-sm-10">{p[0].name.toUpperCase()} &nbsp;
                   { Math.round(p[0].price - (p[0].discount/100)*p[0].price)<1000 ? (<div className="text-danger text-sm">Delivery Charges Applied</div>) : (<></>)}
                   </div>
                   <div className="col-sm-2">&#8377;{Math.round(p[0].price - (p[0].discount/100)*p[0].price)}
                   { Math.round(p[0].price - (p[0].discount/100)*p[0].price)<1000 ? (<div className="text-danger text-sm">(+&#8377;120)</div>) : (<></>)}
                   </div>
                   </div>
                   <div className="dropdown-divider"></div>
        </div>)
        return(
            <div>
            <br/>
            <div className='address'>
                <div className="address-card">
                    <div className='text-info text-center head'>Order Summary</div>
                    <div className="dropdown-divider"></div>
                    <div>
                        {summary}
                    </div>
                    {this.props.location.state.from === "cart" ? (<div className="row">
                        <div className="col-sm-10" >TOTAL</div>
                   <div className="col-sm-2" >&#8377;{sum}
                   </div>
                   </div>
                    ) : (<div className="row">
                        <div className="col-sm-10" >TOTAL</div>
                        <div className="col-sm-2" >&#8377;{Math.round(p[0].price - (p[0].discount/100)*p[0].price)<1000 ? (Math.round(p[0].price - (p[0].discount/100)*p[0].price)+120) : (Math.round(p[0].price - (p[0].discount/100)*p[0].price))}
                   </div>
                    </div>)}
                </div>
                <form onSubmit={this.handleSubmit}>

                    {addressList}
                    <button type="submit" class="btn btn-primary btn-responsive" onClick={this.displayRazorpay}>Proceed To Payment</button> &nbsp;&nbsp;
                    <button type="button" class="btn btn-primary btn-responsive" onClick={this.handleClick}>Add Another Address</button>
                    
                </form>    
            </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return { 
        user : state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        checkLoginstatus: (status) => {
            dispatch({type:'LOGIN_STATUS',status:status});
            }
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Address));