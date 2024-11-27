import { landingPageHeader } from '../common/constants';
import './style/Heading.css'

const Heading =()=>{
    return (
       <div className="heading">
        <h1 className='header-top' onClick={()=>document.location.assign('/')}>{landingPageHeader}</h1>
        <div className='login-pallet'>
            <h2 className='about-btn'>ABOUT</h2>
            <h2 className='login-btn'>LOGIN/SIGNUP</h2>
        </div>
       </div>
    )
    }
    
    export default Heading;