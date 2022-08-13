import React, { useState } from "react";
import { useForm } from 'react-hook-form'
import { Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material/";
import FormAddTask from "../../board/FormAddtask/FormAddTask";
import './toolbar.css';

/***
 * @param {onAdd} param se usa para agrega la tarea, es parametro por la funcion esta en el board 
 * @returns void
 */
const Toolbar = () => {

    const { register, handleSubmit, } = useForm();
    const [openAddTask, setOpenAddTask] = useState(false)
    const [configTask, setConfigTask] = useState({
        title: 'Agregar Nueva Tarea',
        isEdit: false
    })

    const handlerCloseAddTask = () => setOpenAddTask(false);
    const handlerOpenAddTask = () => setOpenAddTask(true);

    const handleChange = (data) => {
        console.log("valor::", data.target.value)
        console.log("nombre::", data.target.name)
    }

    return (
        <div className="toolbarRow">

            {openAddTask && <FormAddTask
                onShow={openAddTask}
                onClose={handlerCloseAddTask}
                config={configTask} />}
            <FormControl sx={{ m: 2, minWidth: 50 }}>
                <Button variant="contained" onClick={() => handlerOpenAddTask()}
                    sx={{ maxWidth: '10rem', minWidth: '4rem' }}>
                    Crear Tarea
                </Button>
            </FormControl>

            <FormControl onSubmit={handleSubmit(handleChange)} sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="demo-controlled-open-select-label">Filtrar</InputLabel>
                <Select {...register("filter")} sx={{ maxWidth: '15rem', minWidth: '0.5rem' }}
                    labelId="demo-simple-select-label"
                    label="filter"
                    margin="dense"
                    onChange={(e) => handleChange(e)}
                >
                    <MenuItem value={30}>30min</MenuItem>
                    <MenuItem value={301}>30min a 1h</MenuItem>
                    <MenuItem value={0}>más de 1h</MenuItem>
                </Select>
            </FormControl>

        </div >

    )
}

export default Toolbar;
