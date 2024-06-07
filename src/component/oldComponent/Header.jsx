import { CiLogin } from "react-icons/ci";
// import logo from '../assets/logo.png'

export function Header({title}){
    return <>
        <div className="logo">
            {/*<img src={logo} alt="logo Fadesol" className="logo-img"/> */}
        </div>
        <h2 className="login-title">{title}<CiLogin className="icon"/> </h2>
    </>
}
