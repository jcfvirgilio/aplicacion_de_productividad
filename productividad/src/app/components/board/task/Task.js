import React, { useState } from 'react';
import { MenuItem, Menu } from '@mui/material';
import { EditRounded, Delete, ArrowDropDown, AppSettingsAlt, Pause, PlayArrow, RestartAlt } from '@mui/icons-material';
import './task.css';

/**
 * 
 * @param {*} props se usa como ejemplo para demostrar que se pueden pasar argumentos sin nombre
 * @returns componente como tarea
 */
export default function TaskCard(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [id, setID] = useState(props.timeId)
    const [numeroCarril] = useState(props.numeroCarril)

    const open = Boolean(anchorEl);

    const onClickOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }


    return (
        <>
            <div className="task" draggable="true" id={[id]} title={numeroCarril}
                onDrop={props.onDropEnterTask}
                onDragStart={props.onDragStart}
                onDragEnter={props.onDragEnter}
            >
                <header className="task-header">
                    <div >{props.header}</div>
                    <div className="task-tools">
                        <MenuItem >
                            <EditRounded />
                        </MenuItem>
                        <MenuItem onClick={() => props.onDelete(id, numeroCarril)} >
                            <Delete />
                        </MenuItem>

                        <MenuItem
                            aria-controls={open && ('demo-customized-menu')}
                            onClick={onClickOpenMenu}
                        >
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
                                Pausar
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
                    {props.taskText}
                </div>

            </div >

        </>
    )
}
