import React, { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../App';

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
    
    const sidebarOpen = useSelector((state: RootState) => state.sidebar);

    const commonStyle = {
        transition: "150ms"
    }

    const open = {
        ...commonStyle,
        paddingLeft: "280px"
    }

    const closed = {
        ...commonStyle,
        paddingLeft: 0
    }
    
    return (
        <div className="app-main__outer" style={sidebarOpen ? open : closed}>
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