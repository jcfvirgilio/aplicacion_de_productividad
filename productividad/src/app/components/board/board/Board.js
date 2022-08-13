import React, { useState } from 'react';
import './board.css';
import Carril from '../carriles/Carril';
import Toolbar from '../../dashboard/toolbar/Toolbar';
import useLocalStorage from '../../../hooks/useLocalStorage'

/**
 * A function that returns the board with the toolbar and the lanes created.
 */
const Board = () => {

    const stateLanes = [
        {
            title: 'En Curso',
            id: 0,
            cards: [{
                header: "Tarea 1",
                taskText: 'Ejemplo',
                numeroCarril: 0,
                timeId: 1111
            },
            {
                header: "Tarea 2",
                taskText: 'Tarea dos',
                numeroCarril: 0,
                timeId: 2222
            }]
        },
        {
            title: 'Concluidas',
            id: 1,
            cards: [{
                header: "Tarea 3",
                taskText: 'Tarea 1 carril dos -id 2',
                numeroCarril: 1,
                timeId: 2
            },
            {
                header: "Tarea 4",
                taskText: 'Tarea21 carril dos - id 3',
                numeroCarril: 1,
                timeId: 3
            }]
        }

    ]
    const [lanes, setLanes] = useLocalStorage("lists", stateLanes)
    const [temporalInfoTask, setTemporalInfoTask] = useLocalStorage("temporalInfoTask", null)

    const [enterElementID, setEnterElementID] = useState(null)
    const [carrilEnterElement, setCarrilEnterElement] = useState(null)


    /* The above code is a set of functions that are used to manipulate the data in the local storage. */
    const dataEvent = {

        addTaskCard: (header, taskText, numeroCarril) => {
            const lists = JSON.parse(localStorage.getItem('lists'));
            const newTask = {
                header: header,
                taskText: taskText,
                numeroCarril: numeroCarril,
                timeId: new Date().valueOf()
            }
            lists[0].cards.unshift(newTask)
            setLanes(lists)
        },

        onDrop: (e, listNum) => {
            //obtiene la información del cache
            const temporalInfoTask = JSON.parse(localStorage.getItem('temporalInfoTask'));
            const cards = JSON.parse(localStorage.getItem('lists'));

            //obtiene las tareas del carril de donde fue arrastrada la tarea
            const cardsArray = cards[temporalInfoTask.fromList].cards

            //verifica que exista la tarea 
            const taskCard = cardsArray.find(card => (Number(card.timeId) === Number(temporalInfoTask.taskId)))

            //encuentra el index de la tarea dentro del array
            const indexOfCard = cardsArray.findIndex(card => Number(card.timeId) === Number(temporalInfoTask.taskId))

            //elimina la tarea del array
            cards[temporalInfoTask.fromList].cards.splice(indexOfCard, 1)


            setTimeout(() => {

                //obtiene las tareas del carril de donde se soltara la tarea
                const cardsArrayDestiny = cards[carrilEnterElement].cards;

                //obtiene el index de la tara destino donde entro el drag 
                const indexOfCardDestiny = cardsArrayDestiny.findIndex(card => Number(card.timeId) === Number(enterElementID))

                //inserta rn la posición indicada la tarea
                cards[carrilEnterElement].cards.splice(indexOfCardDestiny, 0, { ...taskCard, numeroCarril: parseInt(carrilEnterElement) })

                //sincroniza el estado y el localstorage

                setLanes(cards)

            }, 10)
        },

        onDragStart: (e, fromList) => {
            console.log("entro en el onDragStart:", fromList)
            const dragInfo = {
                taskId: e.currentTarget.id,
                fromList: fromList
            }
            setTemporalInfoTask(dragInfo)
        },

        onDropEnterTask: (e) => {
            console.log("entro al onDropEnterTask::")
            let id = Number(e.currentTarget.id)
            let carril = Number(e.currentTarget.title)

            setEnterElementID(id)
            setCarrilEnterElement(carril)

            e.preventDefault();

        },

        onDragEnter: (e) => {

            let id = Number(e.currentTarget.id)
            let carril = Number(e.currentTarget.title)

            setEnterElementID(id)
            setCarrilEnterElement(carril)

            e.preventDefault();
            console.log("entro al onDragEnter::", id, carril)
        },

        onDragOver: (e) => {
            e.preventDefault();
        },

        /* Borra las tareas del local storage. */
        onDelete: (id, numeroCarril) => {
            const tasks = JSON.parse(localStorage.getItem('lists'));
            let tasksArray = tasks[numeroCarril].cards
            const tasksUpdate = tasksArray.filter(card => Number(card.timeId) !== Number(id))
            tasks[numeroCarril].cards = tasksUpdate;
            setLanes(tasks)
        }
    }

    /**
     * It takes the array of objects called lanes and maps over it, creating a list item for each object
     * in the array
     * @returns A list of carriles
     */

    const createLanes = () => {
        const lists = lanes.map((list, index) => (
            <li className="carriles-wrapper" key={index}>
                <Carril id={list.id} title={list.title} cards={list.cards} />
            </li>

        ));
        return lists
    }

    /* Returning the board with the toolbar and the lanes created. */
    return (
        <div className="board">
            <MyContext.Provider value={dataEvent}>
                <Toolbar />
                <ul className="carriles">
                    {createLanes()}
                </ul>
            </MyContext.Provider>
        </div>
    );

}

export default Board;
export const MyContext = React.createContext(null)