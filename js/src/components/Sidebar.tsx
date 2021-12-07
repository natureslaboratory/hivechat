import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = (props) => {
    return (
        <div className="app-sidebar sidebar-shadow">
            <div className="app-header__logo">
                <div className="logo-src"></div>
                <div className="header__pane ml-auto">
                    <div>
                        <button type="button" className="hamburger close-sidebar-btn hamburger--elastic" data-class="closed-sidebar">
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
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
                            <Link to="/">Home</Link>
                        </li>
                        <li id="Account">
                            <a href="/admin/account">Account</a>
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
                            <a href="/explore/organisations">Organisations</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;