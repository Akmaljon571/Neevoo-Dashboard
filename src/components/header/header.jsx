import './header.scss'
import logo from '../../img/2-logo 1.svg'

function Header({ children }) {
    return (  
        <header>
            <h1>{children}</h1>
            <img src={logo} alt="" />
        </header>
    );
}

export default Header;