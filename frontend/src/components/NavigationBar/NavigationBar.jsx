import React from 'react';
import{Link} from 'react-router-dom';

let NavigationBar = () => {
    return (
        <>
            <nav className= "navbar navbar-dark bg-dark navbar-expand-sm">
                <div className="container">
                    <Link to={'/'} className="navbar-brand">
                        <i className="fa fa-mobile text-success me-2"/>Address <span className="text-success">Book</span></Link>
                </div>
            </nav>
        </>
    )
};
export default NavigationBar;