import React, { useState, useEffect } from 'react';
import Video from './Video';

export interface CellData {
    cellID: number,
    hiveID: number,
    memberID: number,
    cellTitle: string,
    cellSubTitle? : string,
    cellDateTime: string,
    cellLive: string,
    introduction?: string
    video?: string,
    zoomURL?: string,
    documents?: string
    cellDynamicFields? : CellDynamicFields
}

interface CellDynamicFields {
    introduction? : CellHtml
    qAndAText? : CellHtml
    qAndAVideo? : string
    video? : string
}

interface CellHtml {
    _flang : string
    raw : string
    processed : string
}

function getDayOfMonth(date : Date) {
    let day = date.getDate().toString();
    let suffix = "th";
    switch (day[day.length-1]) {
        case "1":
            suffix = "st";
            break;
        case "2":
            suffix = "nd";
            break;
        case "3":
            suffix = "rd";
            break;
        default:
            suffix = "th";
    }
    return `${day}${suffix}`;
}

function getMonth(date : Date) {
    let month = date.getMonth();
    switch (month) {
        case 0:
            return "Jan";
        case 1:
            return "Feb";
        case 2: 
            return "Mar";
        case 3: 
            return "Apr";
        case 4:
            return "May"
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "Aug";
        case 8:
            return "Sep";
        case 9: 
            return "Oct";
        case 10:
            return "Nov";
        case 11:
            return "Dec";
    }
}

function addZeroes(time : number) {
    let strTime = time.toString();
    if (strTime.length == 1) {
        return "0" + strTime;
    }
    return strTime;
}

export function formatDate(date) {
    return `${addZeroes(date.getHours())}:${addZeroes(date.getMinutes())}, ${getMonth(date)} ${getDayOfMonth(date)} ${date.getFullYear()}`;
}

const Cell: React.FunctionComponent<CellData> = (props) => {
    

    let dateStr = "";
    if (props.cellDateTime !== "2000-01-01 00:00:00") {
        let date = new Date(props.cellDateTime);
        dateStr = formatDate(date);
    }

    const qAndAText = (
            <div className="main-card mb-3 card">
                <div className="card-body">
                    <h5 className="card-title">Q&amp;A</h5>
                    <div dangerouslySetInnerHTML={{__html: props.cellDynamicFields && props.cellDynamicFields.qAndAText && props.cellDynamicFields.qAndAText.processed}} />
                </div>
            </div>
    )
    return (
        <React.Fragment>
            <h1 style={{marginBottom: props.cellSubTitle ? "0.3rem" : "1.3rem"}}>{props.cellTitle}</h1>
            <div style={{marginBottom: "1.3rem", opacity: 0.85}}>
                {props.cellSubTitle ? <h4>{props.cellSubTitle}</h4> : null}
                {dateStr ? <h6>{dateStr}</h6> : null}
            </div>
            {props.cellDynamicFields && props.cellDynamicFields.video && <Video videoURL={props.cellDynamicFields.video} />}
            <div className="main-card mb-3 card">
                <div className="card-body">
                    <h5 className="card-title">Introduction</h5>
                    {props.cellDynamicFields && props.cellDynamicFields.introduction && <div dangerouslySetInnerHTML={{__html: props.cellDynamicFields.introduction.processed}}></div>}                    
                </div>
            </div>
            {props.cellDynamicFields && props.cellDynamicFields.qAndAVideo && <Video type="question" videoURL={props.cellDynamicFields.qAndAVideo} /> }
            {props.cellDynamicFields && props.cellDynamicFields.qAndAText && qAndAText}
        </React.Fragment>
    )
}

export default Cell;