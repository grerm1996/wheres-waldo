import './footer.css';
import GitHub from './github'
import LinkedIn from './linkedin';
import Email from './email';

function Footer() {
    
    return (
        <div className='footer'>
            Coded by rvc
            <GitHub />
            <LinkedIn />
            <Email />
          
        </div>
    )
}

export default Footer