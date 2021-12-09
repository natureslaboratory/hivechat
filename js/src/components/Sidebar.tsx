import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppDispatch, RootState } from '../App';
import { useSelector, useDispatch } from 'react-redux'
import { toggle, open, close } from '../slices/sidebarSlice';

const Sidebar: React.FC = (props) => {
    const sidebarCommonStyles: React.CSSProperties = {
        padding: "1rem",
        backgroundColor: "white",
        width: "280px",
        transition: "150ms",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        zIndex: 100,
        paddingTop: "60px"
    }

    const sidebarOpenStyle: React.CSSProperties = {
        ...sidebarCommonStyles,
        transform: "translateX(0%)"
    }

    const sidebarClosedStyle: React.CSSProperties = {
        ...sidebarCommonStyles,
        transform: "translateX(-100%)"
    }

    const dispatch = useDispatch<AppDispatch>();
    const sidebarOpen = useSelector((state: RootState) => state.sidebar);

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth > 1400) {
                dispatch(open())
            }
        })

        if (window.innerWidth > 1400) {
            dispatch(open())
        }
    }, [])

    return (
        <div className="sidebar-shadow" style={sidebarOpen ? sidebarOpenStyle : sidebarClosedStyle}>
            <div className="app-header__mobile-menu">
                <div>
                    <button type="button" className="hamburger hamburger--elastic mobile-toggle-nav">
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </button>
                </div>
            </div>
            <div className="app-header__menu">
                <span>
                    <button type="button" className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                        <span className="btn-icon-wrapper">
                            <i className="fa fa-ellipsis-v fa-w-6" aria-hidden="true"></i>
                        </span>
                    </button>
                </span>
            </div>
            <div className="scrollbar-sidebar">
                <div className="app-sidebar__inner">
                    <ul className="vertical-nav-menu metismenu">
                        <li className="app-sidebar__heading">Menu</li>
                        <li>
                            <NavLink  activeStyle={{fontWeight: "bold"}} exact to="/">Home</NavLink>
                        </li>
                        <li id="Account">
                            <NavLink activeStyle={{fontWeight: "bold"}} to="/account">Account</NavLink>
                        </li>
                        <li id="Your Organisations">
                            <a href="/admin/organisations">Your Organisations</a>
                        </li>
                        <li id="Notifications">
                            <a href="/admin/notifications">Notifications</a>
                        </li>
                        <li id="Invites">
                            <a href="/admin/invites">Invites</a>
                        </li>
                        <li id="Requests">
                            <a href="/admin/requests">Requests</a>
                        </li>
                        <li id="Logout">
                            <a href="/admin/logout">Logout</a>
                        </li>
                        <li className="app-sidebar__heading">Explore</li><li id="Browse">
                            <a href="/explore/browse">Browse</a>
                        </li>
                        <li id="Organisations">
                            <NavLink activeStyle={{fontWeight: "bold"}} to="/organisations">Organisations</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;