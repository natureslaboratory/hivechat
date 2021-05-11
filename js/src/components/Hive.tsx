import React = require("react");

export interface HiveProps {
    hiveCategory: string,
    hiveIntro : string,
    hiveID : number,
    hiveLive : string
    hiveTitle : string,
    organisationSlug : string,
    [propName: string]: any
}


function Hive(props : HiveProps) {
    let link = <a href={`/hive/${props.hiveID}`} className="btn btn-secondary">View</a>;
    if (props.organisationSlug) {
        link = <a href={`/explore/organisations/${props.organisationSlug}/${props.hiveID}`} className="btn btn-secondary">View</a>
    }

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-header-title">{props.hiveTitle}</div>
            </div>
            <div className="card-body">
                <p dangerouslySetInnerHTML={{
                    __html: props.hiveIntro
                }}></p>
                {link}
            </div>
        </div>
    )
}

export default Hive;