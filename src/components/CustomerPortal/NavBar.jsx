import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

export default class NavBar extends Component {
    render() {
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-danger bg-danger px-3">
                    <NavLink className="navbar-brand fw-bold text-dark" to="/">CustomerPortal</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link text-light site-links" to="/customers">Show Customers</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-light site-links" to="/customers/add">New Customer</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </>
        )
    }
}
