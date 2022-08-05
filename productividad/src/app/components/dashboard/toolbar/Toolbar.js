import React, { useState } from "react";
import { Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material/";
import './toolbar.css'
const Toolbar = () => {

    const [filter, setFilter] = useState(0)

    const handleChange = (event) => {
        setFilter(event.target.value)
    }


    return (
        <div className="toolbarRow">
            <FormControl sx={{ m: 3, minWidth: 50 }}>
                <Button variant="contained" >Crear Tarea</Button>
            </FormControl>
            <FormControl sx={{ m: 2, minWidth: 150 }}>
                <InputLabel id="demo-controlled-open-select-label">Filtrar</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filter}
                    label="filter"
                    onChange={handleChange}
                >
                    <MenuItem value={30}>30min</MenuItem>
                    <MenuItem value={301}>30min a 1h</MenuItem>
                    <MenuItem value={1}>más de 1h</MenuItem>
                </Select>
            </FormControl>

        </div >

    )
}

export default Toolbar;