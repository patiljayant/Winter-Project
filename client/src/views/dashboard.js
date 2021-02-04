import {React, Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import '../assets/dashboard.css'

class Dashboard extends Component{
    render(){
        
        const address = this.props.user.addresses
        const addressList =  address.length ? ( address.map(p => {return(
            <div >
          {p.address}<br/>
          {p.address2.length ? (<div>{p.address2}</div>):(<div></div>)}
          {p.city}<br/>
          {p.state}<br/>
          {p.zip} 
    <div className='dropdown-divider'></div>
          </div>)})):(
                <div></div>)
            

        return(
        <div className='container '>
        <br/><br/><br/>
        <div className='container-fluid'>
            <div className='row dashboard'>
                <div className='col-md-4 col-xs-12 dashboard-small'>
                <div className='dp'>
                        <img className='dp' src={'/images/profile-photo.png'}/>
                        <button className='posi-btn'>Edit</button>
                        </div>  
                        <br/>
                        <div style={{fontSize:25, fontWeight:2000}}>{this.props.user.firstName} {this.props.user.lastName}</div>
                        
                </div>
                <div className='col-md-8 col-sm-12 user-info'>
                <div class="form-group">
                      <div style={{fontWeight:600}}> E-mail Id</div>
                      <div >{this.props.user.username}</div>
                </div>      
                <div className='dropdown-divider'></div>
                <div class="form-group">
                      <div style={{fontWeight:600}}> Contact Number</div>
                      <div >{this.props.user.phone_number}</div>
                </div>      
                <div className='dropdown-divider'></div>
                <div class="form-group">
                      <div style={{fontWeight:600}}> Address</div>
                      {addressList}
                      <button className='btn btn-primary' onClick={() => {this.props.history.push('/'+ this.props.user._id + '/addAddress')} } >Add Another Address</button>
                </div>      
                <div className='dropdown-divider'></div>
                <div className='float-right'><button className='btn btn-danger'>Edit Info</button></div><br/><br/>
                <div className='float-right'><button className='btn btn-danger'>Reset Password</button></div>
                
                    <div></div>
                </div>
                
            </div>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user:state.user
    }
}

export default withRouter(connect(mapStateToProps)(Dashboard));