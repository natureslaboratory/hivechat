import React, { useRef } from 'react';

interface ContainerProps {
    children: React.ReactNode
}

const Container = React.forwardRef<HTMLLIElement, ContainerProps>((props, ref) => (
    <li ref={ref} className="card-wrapper">
        <div className="main-card card">
            <div className="card-body">
                {props.children}
            </div>
        </div>
    </li>
))

export default Container;