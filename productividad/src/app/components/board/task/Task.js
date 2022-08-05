import React from 'react';
import './task.css';

export default function TaskCard(props) {
    return (<div className="task-card" draggable="true" id={
        [props.timeId]
    }

        onDragStart={
            props.onDragStart
        }

    > {
            props.taskText
        }

    </div>)
}

;