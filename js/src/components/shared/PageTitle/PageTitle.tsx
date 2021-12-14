import React, { ReactElement } from 'react';
import { SocialType } from '../../../services/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

type PageTitleProps = {
    title: string
    subtitle?: string | HTMLElement | ReactElement<any, any>,
    logoURL?: string,
    socials?: SocialType[]
}

const PageTitle: React.FC<PageTitleProps> = (props) => {
    return (
        <div className="app-page-title">
            <div className="page-title-wrapper">
                <div className="page-title-heading">
                    {
                        props.logoURL ? <img className="page-title-logo" src={props.logoURL} /> :
                        <div className="page-title-icon">
                            <i className="pe-7s-user icon-gradient bg-mean-fruit"></i>
                        </div>
                    }
                        <div>
                            {props.title} 
                            {props.socials && <PageTitleLogos socials={props.socials} />}
                            <div className="page-title-subheading">{props.subtitle}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const PageTitleLogos: React.FC<{ socials: SocialType[] }> = ({ socials }) => {
    return (
        <div className="c-logos">
            {socials && socials.map(s => <PageTitleLogo {...s} key={s.socialID} />)}
        </div>
    )
}

const PageTitleLogo: React.FC<SocialType> = (props) => {
    let icon = null;
    switch (props.socialType) {
        case "Facebook":
            icon = <FontAwesomeIcon icon={faFacebookSquare} />
            break;
        case "Twitter":
            icon = <FontAwesomeIcon icon={faTwitter} />
            break;
        case "LinkedIn":
            icon = <FontAwesomeIcon icon={faLinkedin} />
            break;
        default:
            icon = null;
    }

    return (
        <a target="_blank" href={props.socialLink}>
            {icon}
        </a>
    )
}

export default PageTitle;
