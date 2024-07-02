import React from 'react'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom"

const Navbar = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.removeItem('token');
        props.showAlert("Logout successfully", "success");
        navigate("/login");
    }
    
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token')?<form className="d-flex">
                        <Link className="btn btn-primary mx-1" to="/login" role='button'>Login</Link>
                        <Link className="btn btn-primary mx-1" to="/signup" role='button'>Sign up</Link>
                    </form>:<button onClick={handleClick} className='btn btn-primary'>Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
