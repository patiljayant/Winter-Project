import {React, Component} from 'react';
import axios from 'axios';

class Verify extends Component{

componentDidMount(){
    const uId = this.props.match.params.uId;
        console.log(uId)
        axios.post('/api/apiRoutes/verifyEmail', {uId})
             .then((res) => {
                 this.props.history.push('/login')
             })

        
}

    render(){
        
        return(
            <div className='container'>
                <br/><br/><br/>
                <div className='jumbotron text-center'>
                    <h3>Verifying User</h3>
                </div>
            </div>
        )     
    }
}

export default Verify;