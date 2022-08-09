import React from 'react';
import { useForm } from 'react-hook-form'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import './addtask.css';


/**
 * 
 * @param {onAdd} param se usa para agregar la tarea, es parámetro por la función esta en el board 
 * @returns void
 * 
 * @param {onShow} param para mostrar el diálogo, lo controla el botón de agregar tarea que está en el toolbar
 * @returns void
 * 
 * @param {onClose} param para ocultar el diálogo, lo controla la función que está en el toolbar
 * @returns void
 */
const AddTask = ({ onAdd, numeroCarril, onShow, onClose }) => {

    const { register, handleSubmit, setValue } = useForm();

    const onTaskSubmit = (data) => {
        if (data.taskName) {
            onAdd(data.taskDescription, data.taskName, numeroCarril);
        }
        setValue("taskName", "")
        setValue("taskDescription", "")
        onClose();
    }

    /*uso register del hook-form para hacer referencia al nombre de los  input
    * de esta forma el hook lleva el seguimiento de los cambios en el input
    */
    return (
        <>
            <Dialog open={onShow} onClose={() => onClose()} >

                <DialogTitle>Agregar Nueva Tarea</DialogTitle>

                <DialogContent >

                    <DialogContentText>Nueva Tarea:</DialogContentText>
                    <br></br>
                    <form className="card add-task-form" onSubmit={handleSubmit(onTaskSubmit)}>

                        <TextField label="Tarea" name="taskName" aria-label="Nueva Tarea"
                            {...register("taskName", { required: true })}
                        />
                        <p></p>
                        <TextField label="Descripción" name="taskDescription" aria-label="Descripción"
                            minRow="2"
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

export default AddTask;