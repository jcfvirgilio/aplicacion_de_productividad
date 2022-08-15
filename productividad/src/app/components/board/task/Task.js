import React, { useState, useContext } from 'react';
import { MenuItem, Menu } from '@mui/material';
import { EditRounded, Delete, ArrowDropDown, AppSettingsAlt, Pause, PlayArrow, RestartAlt } from '@mui/icons-material';
import FormAddTask from "../../board/FormAddtask/FormAddTask";
import { MyContext } from '../board/Board';


import './task.css';

/**
 * It's a function that returns a div with a header and a body as card
 * @returns A component that is a card with a header and a body.
 */

export default function TaskCard({ timeId, numeroCarril, header, taskText, startTime, currentTime }) {

    const context = useContext(MyContext)
    const [anchorEl, setAnchorEl] = useState(null);
    const [openEditTask, setOpenEditTask] = useState(false)
    const handlerCloseAddTask = () => setOpenEditTask(false);
    const handlerOpenEditTask = () => setOpenEditTask(true);

    const [configTask, setConfigTask] = useState({
        title: 'Editar Tarea',
        isEdit: true,
        id: timeId,
        startTime: startTime,
        currentTime: currentTime,
        carril: numeroCarril
    })

    const open = Boolean(anchorEl);

    /**
     * When the user clicks on the menu button, the menu will open
     * @param event - The event that triggered the function.
     */
    const onClickOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }


    const handleClose = () => {
        setAnchorEl(null);
    }

    /**
     * A function that is called when the time is up.
     * @param val - The current time of the timer.
     */
    const onChange = (val) => {
        if (val === '00:00:00') {

            let dataUpdate = {
                id: timeId,
                header: header,
                taskText: taskText,
                startTime: 0,
                currentTime: 0,
                numeroCarril: 1
            }

            context.onTaskDone({ data: dataUpdate })
        }
        // console.log("dentro de trask :", header, val === '00:00:00')
    }

    const saveTime = () => {

    }


    /* It's a function that returns a div with a header and a body as Card */
    return (
        <>
            <div className="task" draggable="true" id={[timeId]} title={numeroCarril}
                onDragStart={(e) => { context.onDragStart(e, numeroCarril) }}
                onDragEnter={(e) => { context.onDragEnter(e) }}
                onDrop={(e) => { context.onDropEnterTask(e) }}
            >

                {openEditTask && <FormAddTask
                    onShow={openEditTask}
                    onClose={handlerCloseAddTask}
                    config={configTask}
                />}

                <header className="task-header">
                    <div >{header}</div>
                    <div className="task-tools">

                        <MenuItem onClick={() => { handlerOpenEditTask() }}>
                            <EditRounded />
                        </MenuItem>

                        <MenuItem onClick={() => context.onDelete(timeId, numeroCarril)} >
                            <Delete />
                        </MenuItem>



                        <MenuItem aria-controls={open && ('demo-customized-menu')} onClick={onClickOpenMenu}>
                            <AppSettingsAlt />
                            <ArrowDropDown />
                        </MenuItem>

                        <Menu
                            id="demo-customized-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose} >
                                <Pause />
                                Pausarkoko
                            </MenuItem>

                            <MenuItem onClick={handleClose} >
                                <PlayArrow />
                                Detener
                            </MenuItem>

                            <MenuItem onClick={handleClose} >
                                <RestartAlt />
                                Reiniciar
                            </MenuItem>

                        </Menu>
                    </div>
                </header>
                <div className="task-body">
                    {taskText}
                </div>

            </div >

        </>
    )
}
