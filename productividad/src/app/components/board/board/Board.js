import React, { Component } from 'react';
import './board.css';
import Carril from '../carriles/Carril';
import Toolbar from '../../dashboard/toolbar/Toolbar';


/**
 * Board área de los carriles de las tareas
 * 
 * uso Component como ejemplo de conocimiento 
 */
export default class Board extends Component {

    constructor(props) {
        super(props)

        if (localStorage.getItem('lists')) {
            const rawLS = localStorage.getItem('lists');
            const parsedLS = JSON.parse(rawLS);
            this.state = { lists: parsedLS }
        } else {
            this.state = {
                idEnterElement: null,
                carrilEnterElement: null,
                lists: [
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
            }

            localStorage.setItem('lists', JSON.stringify(this.state.lists))
        }

    }

    //obtiene la información de la tarea que empezó el drag
    onDragStart = (e, fromList) => {
        const dragInfo = {
            taskId: e.currentTarget.id,
            fromList: fromList
        }
        localStorage.setItem('temporalInfoTask', JSON.stringify(dragInfo));
    }

    onDragOver = (e) => {
        e.preventDefault();
    }

    onDropEnterTask = (e) => {

        let id = Number(e.currentTarget.id)
        let carril = Number(e.currentTarget.title)

        this.setState({
            "idEnterElement": id,
            "carrilEnterElement": carril
        })

        e.preventDefault();
    }


    /**
     * 
     * @param {s} e objeto del evento generado del drop
     * @param {*} listNum numero de la lista donde se soltará la tarea
     */
    onDrop = (e, listNum) => {

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
            const cardsArrayDestiny = cards[this.state.carrilEnterElement].cards;

            //obtiene el index de la tara destino donde entro el drag 
            const indexOfCardDestiny = cardsArrayDestiny.findIndex(card => Number(card.timeId) === Number(this.state.idEnterElement))

            //inserta rn la posición indicada la tarea
            cards[this.state.carrilEnterElement].cards.splice(indexOfCardDestiny, 0, { ...taskCard, numeroCarril: parseInt(this.state.carrilEnterElement) })

            //sincroniza el estado y el localstorage
            this.setState({
                lists: cards
            });
            localStorage.setItem('lists', JSON.stringify(cards));

        }, 10)

    }

    //add some new task cards
    addTaskCard(header, taskText, numeroCarril) {
        const lists = JSON.parse(localStorage.getItem('lists'));

        const newTask = {
            header,
            taskText,
            numeroCarril,
            timeId: new Date().valueOf()
        }

        //agrega la tarea al inicio del array 
        lists[0].cards.unshift(newTask)

        //sync state and localStorage
        this.setState({
            lists: lists
        })

        localStorage.setItem('lists', JSON.stringify(lists))

    }


    onDelete = (id, numeroCarril) => {
        alert(id)
        alert('numeroCarril:' + numeroCarril)
        //obtiene todas las listas de tareas
        const tasks = JSON.parse(localStorage.getItem('lists'));

        //obtiene las tareas del carril de la tarea a eliminar
        let tasksArray = tasks[numeroCarril].cards

        //filtra para eliminar la tarea
        const tasksUpdate = tasksArray.filter(card => Number(card.timeId) !== Number(id))

        //actualiza el carril donde estaba la tarea eliminada
        tasks[numeroCarril].cards = tasksUpdate;

        //actualiza el estado y el localstorage
        this.setState({
            lists: tasks
        });

        localStorage.setItem('lists', JSON.stringify(tasks));

    }

    /**
     * 
     * @returns regresa los carriles con el toolbar y tareas creadas
     */
    render() {
        const lists = this.state.lists.map((list, index) => (
            <li className="carriles-wrapper" key={index}>
                <Carril {...list}
                    onDragStart={(e, fromList) => this.onDragStart(e, `${list.id}`)}
                    onDragOver={(e) => this.onDragOver(e)}
                    onDropEnterTask={(e) => this.onDropEnterTask(e)}
                    onDrop={(e, listNum) => { this.onDrop(e, `${list.id}`) }}
                    onDelete={(e, listNum) => { this.onDelete(e, `${list.id}`) }}
                />
            </li>

        ));

        return (
            <div className="board">
                <Toolbar onAdd={(header, taskText, numeroCarril) => this.addTaskCard(header, taskText, numeroCarril)} />
                <ul className="carriles">
                    {lists}
                </ul>
            </div>
        );
    }
}