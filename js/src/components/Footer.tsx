import React from 'react';

const Footer: React.FC = (props) => {
    return (
        <div className="app-wrapper-footer">
            <div className="app-footer iframe-hide">
                <div className="app-footer__inner">
                    <div className="app-footer-left">
                        <ul className="nav">
                            <li className="nav-item">
                                <a href="/admin/logout" className="nav-link">
                                    Logout
                                </a>
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