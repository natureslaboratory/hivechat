import React, { ReactElement } from 'react';

type PageTitleProps = {
    title: string
    subtitle?: string | HTMLElement | ReactElement<any, any>
}

const PageTitle: React.FC<PageTitleProps> = (props) => {
    return (
        <div className="app-page-title">
            <div className="page-title-wrapper">
                <div className="page-title-heading">
                    <div className="page-title-icon">
                        <i className="pe-7s-user icon-gradient bg-mean-fruit"></i>
                    </div>
                    <div>{props.title} <div className="page-title-subheading">{props.subtitle}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageTitle;
