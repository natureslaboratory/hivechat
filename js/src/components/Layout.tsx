import React, { ReactElement } from 'react';

export const Row: React.FC = (props) => <div className="row">{props.children}</div>

type ColProps = {
    columns: number
}

export const Col: React.FC<ColProps> = (props) => {
    return (
        <div className={`col-md-${props.columns}`}>
            {props.children}
        </div>
    )
}

export const AppContainer: React.FC = (props) => {
    return (
        <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header closed-sidebar-mobile closed-sidebar">
            {props.children}
        </div>
    )
}

export const AppMain: React.FC = (props) => {
    return (
        <div className="app-main">
            {props.children}
        </div>
    )
}

export const AppMainOuter: React.FC = (props) => {
    return (
        <div className="app-main__outer">
            {props.children}
        </div>
    )
}

export const AppMainInner: React.FC = (props) => {
    return (
        <div className="app-main__inner">
            {props.children}
        </div>
    )
}