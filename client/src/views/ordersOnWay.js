import {React, Component} from 'react';
import {connect} from 'react-redux';
import '../assets/onw.css'

class Onw extends Component{
    render(){
        const o = this.props.state.user.orders
        const orders = o.length ? (
            o.map(i => {
                return(
                i.products.map(j => {
                    let date = new Date(i.tentArrive);
                    return(
                    <div className="row justify-content-center">
                <div className='col col-sm-8 col-12 onw-card'>
                    <div className='row'>
                    <div className='col col-3'>
                        <img src={j.imgUrl} className='img-thumbnail round' style={{maxHeight:125,minHeight:60,minWidth:60, border:'none'}}/>
                    </div>
                    <div className='col col-9'>
                            <div className="mb-1">{j.name.toUpperCase()}</div>
                            <div>Expected Delivery on <b>{date.toDateString()}</b></div>
                    </div> 
                    </div>   
                </div>
                </div>
                )})
            )})
        ) : (<div className='jumbotron'>
            You 
        </div>)

        return(
            <div className='container onw'>
            <br/>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        state : state
    }
}

export default connect(mapStateToProps)(Onw);