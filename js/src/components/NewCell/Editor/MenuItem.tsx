import React from 'react';
import { Draggable } from 'react-beautiful-dnd'

interface MenuItemProps {
    id: string
    index:  number
    type: string
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    return (
        <Draggable draggableId={props.id} index={props.index}>
            {(provided) => (
                <div
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    key={props.id}
                >
                    <div>{props.type}</div>
                </div>
            )}
        </Draggable>
    )
}

export default MenuItem;