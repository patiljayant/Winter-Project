import { React, Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import '../assets/addAddress.css'

class AddAddress extends Component{
    state = {
        inputAddress : '',
        inputAddress2 : '',
        inputCity : '',
        inputState : '',
        inputZip : ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        
        const address = {
            address : this.state.inputAddress,
            address2 : this.state.inputAddress2,
            city : this.state.inputCity,
            state : this.state.inputState,
            zip : parseInt(this.state.inputZip)
        }
        axios.post('/api/apiRoutes/addAddress',address)
             .then(res => {
                 this.props.checkLoginstatus(res.data);
                 console.log(this.props)
                 this.props.history.goBack();
             })
    }
    render(){
      console.log('add address')
        return(<body>
        <br/><br/><br/>
            <div className="add-address">
                <h3>Add Address</h3>
                <form onSubmit = {this.handleSubmit}>
                    <div class="form-group">
                      <label for="inputAddress">Address</label>
                      <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" 
                      onChange={ (e) => {
                          this.setState({
                              inputAddress : e.target.value
                          })
                      }}
                      required/>
                    </div>
                    <div class="form-group">
                      <label for="inputAddress2">Address 2</label>
                      <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" 
                          onChange={ (e) => {
                          this.setState({
                              inputAddress2 : e.target.value
                          })
                      }}
                      />
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="inputCity">City</label>
                        <input type="text" class="form-control" id="inputCity" 
                        onChange={ (e) => {
                          this.setState({
                              inputCity : e.target.value
                          })
                      }}
                        required/>
                      </div>
                      <div class="form-group col-md-4">
                        <label for="inputState">State</label>
                        <select id="inputState" class="form-control" 
                        onChange={ (e) => {
                          this.setState({
                              inputState : e.target.value
                          })
                      }}
                        required>                          
                          <option>Maharastra</option>
                          <option>Gujrat</option>
                          <option>Madhya Pradesh</option>
                          <option>Maharastra</option>
                          <option>Maharastra</option>
                          <option>Maharastra</option>
                          <option>Maharastra</option>
                          <option>Maharastra</option>
                          <option>Maharastra</option>
                          <option>Maharastra</option>
                          <option>Maharastra</option>
                          <option>Maharastra</option>
                          <option>Maharastra</option>
                          <option>Maharastra</option>
                          <option>Maharastra</option>
                          <option>Maharastra</option>
                          <option>Maharastra</option>
                          <option>Maharastra</option>
                          <option>Maharastra</option>
                          <option>Maharastra</option>
                          <option>Maharastra</option>
                          <option>Maharastra</option>
                          <option>Maharastra</option>
                          <option>Maharastra</option>
                          <option>Maharastra</option>
                          <option>Maharastra</option>
                          <option>Maharastra</option>
                          <option>Maharastra</option>
                        </select>
                      </div>
                      <div class="form-group col-md-2">
                        <label for="inputZip">Zip</label>
                        <input type="tel" class="form-control" id="inputZip" 
                        onChange={ (e) => {
                          this.setState({
                              inputZip : e.target.value
                          })
                      }}
                        required/>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Add Address</button>
                </form>
            </div>
            <br/><br/>
</body>
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

export default withRouter(connect(null, mapDispatchToProps)(AddAddress));