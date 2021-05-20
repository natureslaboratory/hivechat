import React = require("react");

export interface HiveProps {
    hiveCategory: string,
    hiveIntro : string,
    hiveID : number,
    hiveLive : string
    hiveTitle : string,
    organisationSlug : string,
    [propName: string]: any,
    adminPage : boolean
}


function Hive(props : HiveProps) {
    let linkURL = "";
    let linkText = "View";
    let intro = (
        <p dangerouslySetInnerHTML={{
            __html: props.hiveIntro
        }}></p>
    )

    if (window.location.href.includes("manage/hives") && props.organisationSlug) {
        linkURL = `/explore/organisations/${props.organisationSlug}/manage/hives/edit/${props.hiveID}`
        linkText = "Edit";
        intro = null;
    } else if (props.organisationSlug) {
        linkURL = `/explore/organisations/${props.organisationSlug}/${props.hiveID}`;
    } else {
        linkURL = `/hive/${props.hiveID}`
    }

    let link = <a href={linkURL} className="btn btn-secondary">{linkText}</a>;
    

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-header-title">{props.hiveTitle}</div>
            </div>
            <div className="card-body">
                {intro}
                {link}
            </div>
        </div>
    )
}

export default Hive;