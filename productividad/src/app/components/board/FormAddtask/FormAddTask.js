import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { MyContext } from '../board/Board';
import './addtask.css';

const FormAddTask = ({ onShow, onClose, config }) => {

    const context = useContext(MyContext)
    const { register, handleSubmit, setValue } = useForm();
    const [isEditTask, setConfigTask] = useState(config.isEdit)

    useEffect(() => {
        if (config.isEdit) {
            onGetData()
        }
    })

    /**
     * Obtiene los datos desde el form, agrega una nueva tarea y limpia el form
     * @param data - datos fueton enviados por el form
     */
    const onTaskSubmit = (data) => {
        context.addTaskCard(data.taskName, data.taskDescription, 0)
        setValue("taskName", "")
        setValue("taskDescription", "")
        onClose();
    }

    const onGetData = () => {
        const cards = JSON.parse(localStorage.getItem('lists'))
        const tasksArray = cards[config.carril].cards
        const tasksUpdate = tasksArray.filter(card => Number(card.timeId) === Number(config.id))
        setValue("taskName", tasksUpdate[0].header)
        setValue("taskDescription", tasksUpdate[0].taskText)
        console.log(tasksUpdate)
    }

    /**
     *  El form es mostrado cuando el usuario da click en el boton "crear tarea"
     * Uso register del hook-form para hacer referencia al nombre de los  input
     * de esta forma el hook lleva el seguimiento de los cambios en el input
    **/
    return (
        <>
            <Dialog open={onShow} onClose={() => onClose()} >

                <DialogTitle>{config.title}</DialogTitle>

                <DialogContent >

                    <form className="card add-task-form" onSubmit={handleSubmit(onTaskSubmit)}>

                        <TextField label="Tarea" name="taskName" aria-label="Nueva Tarea"
                            {...register("taskName", { required: true })}
                        />
                        <p></p>

                        <TextField label="Descripción" name="taskDescription" aria-label="Descripción"
                            maxRows="5"
                            multiline
                            {...register("taskDescription", { required: true })}
                        />

                        <DialogActions>
                            <Button onClick={() => onClose()}>Cancelar</Button>
                            <Button type="submit">Aceptar</Button>
                        </DialogActions>

                    </form>

                </DialogContent>

            </Dialog>
        </>
    )
}

export default FormAddTask; 