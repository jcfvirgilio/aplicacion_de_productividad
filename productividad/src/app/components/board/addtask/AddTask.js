import React from 'react';
import { useForm } from 'react-hook-form'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import './addtask.css';


/**
 * 
 * @param {onAdd} param se usa para agrega la tarea, es parametro por la funcion esta en el board 
 * @returns void
 * 
 * @param {onShow} param para mostrar el dialogo, lo controla el boton de agregar tarea que esta en el toolbar
 * @returns void
 * 
 * @param {onClose} param para ocultar el dialogo, lo controla la función que esta en el toolbar
 * @returns void
 */
const AddTask = ({ onAdd, numeroCarril, onShow, onClose }) => {

    const { register, handleSubmit, setValue } = useForm();

    const onTaskSubmit = (data) => {
        if (data.taskName && onAdd) {
            onAdd(data.taskName, numeroCarril);
        }
        setValue("taskName", "")
        onClose();
    }

    /*uso register del hook-form para hacer referencia dle input
    * de esta forma el hook lleva el seguimiento de los cambios en el input
    */
    return (
        <>
            <Dialog open={onShow} onClose={() => onClose()} >
                <DialogTitle>Agregar Nueva Tarea</DialogTitle>
                <DialogContent>
                    <DialogContentText>Nombre de la Tarea: </DialogContentText>
                    <form className="card add-task-form" onSubmit={handleSubmit(onTaskSubmit)}>
                        <input type="text" name="taskName" aria-label="Nueva Tarea"
                            {...register("taskName", { required: true })}
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