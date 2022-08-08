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
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }


    return (
        <>
            <div className="task" draggable="true" id={[props.timeId]} title={props.numeroCarril}
                onDrop={props.onDropEnterTask} onDragStart={props.onDragStart}
                onDragEnter={props.onDragEnter}
            >
                <header className="task-header">
                    <div className="task-title">Header</div>
                    <div className="task-tools">
                        <MenuItem disableRipple>
                            <EditRounded />
                        </MenuItem>
                        <MenuItem disableRipple>
                            <Delete />
                        </MenuItem>

                        <MenuItem
                            id="demo-customized-button"
                            aria-controls={open ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            variant="text"
                            onClick={handleClick}
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
                            <MenuItem onClick={handleClose} disableRipple>
                                <Pause />
                                Pausar
                            </MenuItem>
                            <MenuItem onClick={handleClose} disableRipple>
                                <PlayArrow />
                                Detener
                            </MenuItem>
                            <MenuItem onClick={handleClose} disableRipple>
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
