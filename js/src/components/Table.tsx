import React from 'react';

const Table: React.FC = (props) => {
    return (
        <div className="table-responsive">
            <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                {props.children}
            </table>
        </div>
    )
}

export default Table;

export type TableHeadProps = {
    labels: string[]
}

export const TableHead: React.FC<TableHeadProps> = (props) => {
    return (
        <thead>
            <tr>
                {props.labels.map(l => <th key={l}>{l}</th>)}
            </tr>
        </thead>
    )
}

export const TableBody: React.FC = (props) => <tbody>{props.children}</tbody>
export const TableRow: React.FC = (props) => <tr>{props.children}</tr>

export type TableCellProps = {
    colSpan?: number,
    style?: React.CSSProperties
}

export const TableCell: React.FC<TableCellProps> = (props) => <td style={props.style} colSpan={props.colSpan && props.colSpan}>{props.children}</td>

export type TableWidgetProps = {
    title: string
}

export const TableWidget: React.FC<TableWidgetProps> = (props) => {
    return (
        <div className="widget-content p-0">
            <div className="widget-content-wrapper">
                <div className="widget-content-left flex2">
                    <div className="widget-heading">{props.title}</div>
                </div>
            </div>
        </div>
    )
}