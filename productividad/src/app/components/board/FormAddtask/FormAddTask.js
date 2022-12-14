import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';

import { MyContext } from '../board/Board';
import './addtask.css';

/**
 * A function that returns a form to add a task.
 */
export default function FormAddTask({ onShow, onClose, config }) {

    const context = useContext(MyContext)
    const { register, handleSubmit, setValue, getValues } = useForm();
    const [valueTime, setValueTime] = React.useState(new Date());

    useEffect(() => {

        if (config.isEdit) {
            onGetData()
        }

    })

    /**
     * It takes the data from the form, creates a new object with the data, and then passes that object
     * to the addTaskCard function
     * @param data - This is the data that is passed from the form.
     */
    const onTaskSubmit = (data) => {

        const configTask = {
            header: data.taskName,
            taskText: data.taskDescription,
            numeroCarril: 0,
            startTime: data.duration,
            cuerrentTime: data.currentTime
        }
        context.addTaskCard(configTask)

        setValue("taskName", "")
        setValue("taskDescription", "")
        setValue("duration", "")
        onClose();

    }

    /**
     * It takes the data from the context and filters it to only show the data that matches the id of
     * the task that is being edited
     */
    const onGetData = () => {

        const tasksArray = context.onGetData(config.carril)
        const tasksUpdate = tasksArray.filter(card => Number(card.timeId) === Number(config.id))

        setValue("taskName", tasksUpdate[0].header)
        setValue("duration", tasksUpdate[0].startTime)
        setValue("taskDescription", tasksUpdate[0].taskText)

    }

    /**
     * It updates the task with the new values.
     */
    const onUpdate = () => {
        console.log("config::::", config)
        let dataUpdate = {
            id: config.id,
            header: getValues('taskName'),
            taskText: getValues('taskDescription'),
            startTime: getValues('duration'),
            currentTime: 0,
            numeroCarril: config.carril
        }

        context.onUpdate({ data: dataUpdate })
        onClose();
    }



    return (
        <>
            <Dialog open={onShow} onClose={() => onClose()} >

                <DialogTitle>{config.title}</DialogTitle>

                <DialogContent >

                    <form className="card add-task-form" onSubmit={handleSubmit(onTaskSubmit)}>

                        <TextField label="Tarea" name="taskName" {...register("taskName", { required: true })} />
                        <p></p>

                        <FormControl>
                            <InputLabel id="demo-controlled-open-select-label">Duraci??n</InputLabel>
                            <Select {...register("duration")} sx={{ m: 1, minWidth: 220 }}
                                labelId="demo-simple-select-label"
                                label="filter"
                                margin="dense"
                                onChange={(e) => setValueTime(e.target.value)}
                            >
                                <MenuItem value={"30"}>30min</MenuItem>
                                <MenuItem value={"45"}>45min</MenuItem>
                                <MenuItem value={"60"}>1h</MenuItem>
                            </Select>
                        </FormControl>

                        <p></p>

                        <TextField label="Descripci??n" name="taskDescription"
                            maxRows="5"
                            multiline
                            {...register("taskDescription", { required: true })}
                        />

                        <DialogActions>
                            <Button onClick={() => onClose()}>Cancelar</Button>
                            {config.isEdit ? <Button onClick={() => onUpdate()}>Guardar</Button> : <Button type="submit">Aceptar</Button>}
                        </DialogActions>

                    </form>

                </DialogContent>

            </Dialog>
        </>
    )
}

