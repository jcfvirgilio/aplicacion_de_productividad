import React from 'react';
import TaskCard from '../task/Task';
import './carril.css';


/**
 * 
 * @param {*} props se utiliza solo como ejemplo para observar que se pasan parametros sin declarar en el objeto props
 * @returns elemento Carril que funciona para almacenar las tareas
 */
const Carril = (props) => {

    const cards = props.cards.map((card, index) => {
        return (
            <li key={index}>
                <TaskCard {...card} onDragStart={props.onDragStart}
                    onDropEnterTask={props.onDropEnterTask}
                    onDelete={props.onDelete} />
            </li>
        );
    })

    return (
        <div onDragOver={props.onDragOver} onDrop={props.onDrop} >
            <h3 className={`carril-header name-${props.id}`}>{props.title}</h3>
            <ul className="list"  >
                {cards}
            </ul>
        </div>
    );


}

export default Carril;