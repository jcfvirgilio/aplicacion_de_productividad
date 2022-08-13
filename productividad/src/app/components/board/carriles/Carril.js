import React, { useContext } from 'react';
import { MyContext } from '../board/Board';
import TaskCard from '../task/Task';
import './carril.css';



/**
 * It's a function that returns a div with a title and a list of tasks
 * @returns A div with a h3 and ul
 */
const Carril = ({ id, title, cards }) => {

    const context = useContext(MyContext)

    /* It's mapping the cards array and returning a list of tasks */
    const tasks = cards.map((card, index) => {
        return (
            <li key={index}>
                <TaskCard {...card} />
            </li>
        );
    })

    /* It's returning a div with a h3 and ul */
    return (
        <div onDragOver={(e) => { context.onDragOver(e) }} onDrop={(e) => { context.onDrop(e) }}>
            <h3 className={`carril-header name-${id}`}>{title}</h3>
            <ul className="list"  >
                {tasks}
            </ul>
        </div >
    );

}

export default Carril;