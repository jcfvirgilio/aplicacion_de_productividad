import React from 'react';
import TaskCard from '../task/Task';
import AddTask from '../addtask/AddTask';
import './carril.css';


const Carril = (props) => {

    const cards = props.cards.map((card, index) => {
        return (
            <li key={index}>
                <TaskCard {...card} onDragStart={props.onDragStart} />
            </li>
        );
    })

    return (
        <div>
            <h2 className={`name-header name-${props.id}`}>{props.title}</h2>
            <ul className="list" onDragOver={props.onDragOver} onDrop={props.onDrop}>
                {cards}
                <li className="add-list-wrapper">
                    <AddTask formNum={props.id} onAdd={props.onAdd} />
                </li>
            </ul>
        </div>
    );


}

export default Carril;