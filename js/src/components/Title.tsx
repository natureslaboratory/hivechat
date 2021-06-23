import React from 'react';

interface TitleProps {
    title : string,
    subTitle? : string
}

const Title : React.FunctionComponent<TitleProps> = (props) => {
    return (
        <div className="app-page-title">
            <div className="page-title-wrapper">
                <div className="page-title-heading">
                    <div className="page-title-icon">
                        <i className="pe-7s-users icon-gradient bg-mean-fruit"></i>
                    </div>
                    <div> {props.title}
                        <div className="page-title-subheading" dangerouslySetInnerHTML={{__html: props.subTitle}}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Title;