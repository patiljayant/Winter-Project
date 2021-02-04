import {React, Component} from 'react';
import {Link} from 'react-router-dom'
import '../assets/footer.css'

class Footer extends Component{
    render(){
        return(
            <footer className="footer">
            <div className='row container-fluid'  style={{marginRight:0,marginLeft:0}}>
            <div className="col-4">
            <img src={'/images/footerlogo.png'} className="footer-logo"/>
            </div>
            <div className='col-4' >
            <div className="thumbnail">
                <div className="caption">CONTACT US:</div>
                <div className="caption">
                    <Link href="#" class="fa fa-facebook" style={{textDecoration:'none'}}></Link>
                    <Link href="#" class="fa fa-twitter" style={{textDecoration:'none'}}></Link>
                    <Link href="#" class="fa fa-google" style={{textDecoration:'none'}}></Link>
                    <Link href="#" class="fa fa-linkedin" style={{textDecoration:'none'}}></Link>
                </div>
            </div>    
            </div>
            <div className='col-4' >
                <div className="thumbnail">
                    <div className="caption">Developer:</div>
                    <div className="caption">Jayant Patil</div>
                    <div className="caption">8378038486</div>
                </div>
            </div>
            </div>
            <div className='col-12 text-center baby-footer' >
                <div>&#169; 2021 IIIT.com. All Rights Reserved</div>
            </div>
            </footer>
        )
    }
}

export default Footer;