import React from 'react';
import { useGetMemberDetailsQuery } from '../services/newApi';
import { MemberType } from '../services/types';
import { AppDispatch, RootState } from '../App';
import { useSelector, useDispatch } from 'react-redux'
import { toggle, open, close } from '../slices/sidebarSlice';

export const HeaderLogo: React.FC = (props) => (
    <div className="app-header__logo">
        <div className="logo-src" style={{ backgroundImage: "none" }}><img style={{ width: "100%", height: "100%", objectFit: "contain" }} src="/design/images/hivechat_2.svg" /></div>
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
)

export const HeaderMobileMenu: React.FC = (props) => {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="app-header__mobile-menu" style={{ display: "flex" }} onClick={() => dispatch(toggle())}>
            <div>
                <button type="button" className="hamburger hamburger--elastic mobile-toggle-nav">
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                </button>
            </div>
        </div>
    )
}

export const HeaderMenu: React.FC = (props) => (
    <div className="app-header__menu">
        <span>
            <button type="button" className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                <span className="btn-icon-wrapper">
                    <i className="fa fa-ellipsis-v fa-w-6" aria-hidden="true"></i>
                </span>
            </button>
        </span>
    </div>
)

export const HeaderContent: React.FC = (props) => <div className="app-header__content">{props.children}</div>

export type HeaderSideProps = {
    side: "left" | "right"
}
export const HeaderSide: React.FC<HeaderSideProps> = (props) => <div className={`app-header-${props.side}`}>{props.children}</div>
export const HeaderSearch: React.FC = (props) => (
    <div className="search-wrapper">
        <div className="input-holder">
            <form method="get" action="/admin/search">
                <input type="text" name="q" className="search-input" placeholder="Type to search" />
            </form>
            <button className="search-icon"><span></span></button>
        </div>
        <button className="close"></button>
    </div>
)

export const HeaderWidget: React.FC = (props) => (
    <div className="header-btn-lg pr-0">
        <div className="widget-content p-0">
            <div className="widget-content-wrapper">
                {props.children}
            </div>
        </div>
    </div>
)

export const HeaderUser: React.FC<MemberType> = ({ memberEmail, memberID, memberProperties }) => (
    <>
        <div className="btn-group">
            <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="p-0 btn">
                <img width="42" className="rounded-circle" src="https://www.gravatar.com/avatar/399317ffdbda6dc40bda296d54c315d8?s=80&amp;d=mp&amp;r=g" />
                <i className="fa fa-angle-down ml-2 opacity-8" aria-hidden="true"></i>
            </a>
            <div tabIndex={-1} role="menu" aria-hidden="true" className="dropdown-menu dropdown-menu-right">
                <a href="/admin/account"><button className="dropdown-item">Account Settings</button></a>
                <a href="/admin/notifications"><button className="dropdown-item">Notifications</button></a>
                <a href="/admin/invites"><button className="dropdown-item" id="button-invites">Invites</button></a>
                <div tabIndex={-1} className="dropdown-divider"></div>
                <a href="/admin/logout"><button className="dropdown-item">Logout</button></a>
            </div>
        </div>
        <div className="widget-content-left  ml-3 header-user-info">
            <div className="widget-heading">
                {`${memberProperties.first_name} ${memberProperties.last_name}`}
            </div>
            <div className="widget-subheading">
            </div>
        </div>
    </>
)


const Header: React.FC = (props) => {

    const { data: member, isLoading } = useGetMemberDetailsQuery(null);

    console.log(member);

    return (
        <div className="app-header header-shadow iframe-hide">
            <HeaderLogo />
            <HeaderMobileMenu />
            <HeaderMenu />
            <HeaderContent>
                <HeaderSide side="left">
                    <HeaderSearch />
                </HeaderSide>
                <HeaderSide side="right">
                    <HeaderWidget>
                        {member && <HeaderUser {...member} />}
                    </HeaderWidget>
                </HeaderSide>
            </HeaderContent>
        </div>
    )
}

export default Header;