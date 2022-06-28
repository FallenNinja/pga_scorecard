import React from 'react';

// Basic navbar component. PGA nav-item takes user to https://www.pga.org
// NOTE: navbar toggler and behaviour has been commented out due to unexpected screen size behaviour.
const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark primary mb-4">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <font className={'accent-text'}>PROS</font>
                    <font color="white"> VS </font>
                    <font className={'secondary-text'}>JOES</font>
                </a>
                {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                <div className="" id="navbarNav">
                    <ul className="navbar-nav float-end">
                        <li className="nav-item">
                            <a className="nav-link active" target="__blank" href="https://www.pga.org">
                                <img className={'float-end d-none d-sm-block'} width={'75%'} height={'75%'} src='https://www.pga.org/static/pga-logo-984f34c12dcd610c1bfe53fc55525442.svg'></img>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default Navbar;