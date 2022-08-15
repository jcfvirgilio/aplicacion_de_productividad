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
                taskText: 'Lorem ipsum dolor sit amet',
                numeroCarril: 0,
                startTime: 1,
                timeId: 1111
            },
            {
                header: "Tarea 2",
                taskText: 'Duis aute irure dolor',
                numeroCarril: 0,
                startTime: 30,
                timeId: 2222
            }, {
                header: "Tarea 3",
                taskText: 'Duis aute irure dolor',
                numeroCarril: 0,
                startTime: 30,
                timeId: 33
            }, {
                header: "Tarea 4",
                taskText: 'Duis aute irure dolor',
                numeroCarril: 0,
                startTime: 30,
                timeId: 44
            }]
        },
        {
            title: 'Concluidas',
            id: 1,
            cards: [{
                header: "Tarea 5",
                taskText: 'Ut enim ad minim veniam, ',
                numeroCarril: 1,
                startTime: 45,
                timeId: 55
            },
            {
                header: "Tarea 6",
                taskText: 'Excepteur sint occaecat cupidatat',
                numeroCarril: 1,
                startTime: 60,
                timeId: 66
            }]
        }

    ]
    const [lanes, setLanes] = useLocalStorage("lists", stateLanes)
    const [temporalInfoTask, setTemporalInfoTask] = useLocalStorage("temporalInfoTask", null)

    const [enterElementID, setEnterElementID] = useState(null)
    const [carrilEnterElement, setCarrilEnterElement] = useState(null)


    /* The above code is a set of functions that are used to manipulate the data in the local storage. */
    const dataEvent = {

        onGetData: (numeroCarril) => {

            const cards = JSON.parse(localStorage.getItem('lists'))
            const tasksArray = cards[numeroCarril].cards
            return tasksArray

        },
        addTaskCard: (config) => {

            const lists = JSON.parse(localStorage.getItem('lists'));

            const newTask = {
                header: config.header,
                taskText: config.taskText,
                numeroCarril: config.numeroCarril,
                startTime: config.startTime,
                currentTime: config.config,
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

            const dragInfo = {
                taskId: e.currentTarget.id,
                fromList: fromList
            }
            setTemporalInfoTask(dragInfo)
        },

        onDropEnterTask: (e) => {

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

        },

        onDragOver: (e) => {
            e.preventDefault();
        },

        onUpdate: (data) => {

            const cards = JSON.parse(localStorage.getItem('lists'))
            const tasksArray = cards[data.numeroCarril].cards

            const taskUpdate = {
                header: data.header,
                taskText: data.taskText,
                numeroCarril: data.numeroCarril,
                startTime: data.startTime,
                currentTime: data.currentTime,
                timeId: data.id
            }
            const taskToUpdateIndex = tasksArray.findIndex(card => Number(card.timeId) === Number(data.id))
            cards[data.numeroCarril].cards[taskToUpdateIndex] = taskUpdate

            setLanes(cards)

        },

        onTaskDone: ({ data }) => {
            //obtiene la información del cache
            const temporalInfoTask = JSON.parse(localStorage.getItem('temporalInfoTask'));
            const cards = JSON.parse(localStorage.getItem('lists'));

            //obtiene las tareas del carril se cumplio la tarea
            const cardsArray = cards[0].cards

            //verifica que exista la tarea 
            const taskCard = cardsArray.find(card => (Number(card.timeId) === Number(data.id)))

            //encuentra el index de la tarea dentro del array
            const indexOfCard = cardsArray.findIndex(card => Number(card.timeId) === Number(data.id))

            //elimina la tarea del array
            cards[0].cards.splice(indexOfCard, 1)

            console.log("taskCard::::", taskCard)
            //inserta rn la posición indicada la tarea
            cards[1].cards.unshift({ ...taskCard, numeroCarril: 1 })


            //sincroniza el estado y el localstorage
            setLanes(cards)



        },

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