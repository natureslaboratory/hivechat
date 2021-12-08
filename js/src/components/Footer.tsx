import React from 'react';
import { Link } from 'react-router-dom';
import { useGetMemberDetailsQuery, useLogoutMutation } from '../services/newApi';

const Footer: React.FC = (props) => {

    const [logout] = useLogoutMutation()
    const { data: member, isLoading } = useGetMemberDetailsQuery("");


    function logoutAction(e: React.MouseEvent) {
        e.preventDefault();
        logout("");
    }

    const logoutButton = (
        <a href="/app/logout" className="nav-link" onClick={logoutAction}>
            Logout
        </a>
    )

    const loginButton = (
        <Link className="nav-link" to="/login">Login</Link>
    )

    return (
        <div className="app-wrapper-footer">
            <div className="app-footer iframe-hide">
                <div className="app-footer__inner">
                    <div className="app-footer-left">
                        <ul className="nav">
                            <li className="nav-item">
                                {!isLoading && member.memberEmail ? logoutButton : loginButton}
                            </li>
                            <li className="nav-item">
                                <a href="/" className="nav-link">
                                    Back to Website
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="app-footer-right">
                        <ul className="nav">
                            <li className="nav-item">
                                <a href="/about" className="nav-link">
                                    About
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/terms-and-conditions">Terms and Conditions</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/privacy-policy">Privacy Policy</a>
                            </li>
                            <li className="nav-item">
                                <a href="https://natureslaboratory.co.uk" target="_blank" className="nav-link">
                                    Built by Nature’s Laboratory
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Footer;