import React, { useState, useEffect } from 'react';

export interface CellData {
    cellID: number,
    hiveID: number,
    memberID: number,
    cellTitle: string,
    cellDateTime: string,
    cellLive: string,
    introduction?: string
    video?: string,
    zoomURL?: string,
    documents?: string
}

const Cell: React.FunctionComponent<CellData> = (props) => {
    let video = null;
    if (props.video) {
        video = (
            <div className="main-card mb-3 card">
                <div className="card-body">
                    <h5 className="card-title">Video - via YouTube</h5>
                    <div className="fluid-width-video-wrapper" style={{ paddingTop: "56.25%" }} dangerouslySetInnerHTML={{__html: props.video}}>
                        
                    </div>                    
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            {video ? video : null}
            <div className="main-card mb-3 card">
                <div className="card-body">
                    <h5 className="card-title">Introduction</h5>
                    <div dangerouslySetInnerHTML={{__html: props.introduction}}></div>                    
                </div>
            </div>
        </React.Fragment>
    )
}

export default Cell;