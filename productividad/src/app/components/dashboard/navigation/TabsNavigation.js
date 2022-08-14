import React, { useState } from 'react';
import { Tab, AppBar } from '@mui/material';
import { TabContext, TabPanel, TabList } from '@mui/lab';
import AccessAlarm from '@mui/icons-material/AccessAlarm'
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import Board from '../../board/board/Board';
import TaskDone from '../../reports/tasksdone/TaskDone'

const TabsNavigation = () => {

    const [value, setValue] = useState("admon")

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <TabContext value={value}>
                <AppBar position="sticky" color="default" sx={{ alignItems: "center" }}>
                    <TabList onChange={handleChange}>
                        <Tab label="Administrador Tareas" value="admon" icon={<DashboardCustomizeOutlinedIcon />} />
                        <Tab label="Informes" value="informes" icon={<AccessAlarm />} />
                    </TabList>

                </AppBar>

                <TabPanel value={"admon"}>
                    <Board />
                </TabPanel>
                <TabPanel value={"informes"}>
                    <TaskDone />
                </TabPanel>
            </TabContext>
        </>
    )
}

export default TabsNavigation;