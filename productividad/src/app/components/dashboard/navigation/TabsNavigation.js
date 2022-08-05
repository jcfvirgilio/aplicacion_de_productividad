import React, { useState } from 'react';
import { Tabs, Tab, AppBar, Box } from '@mui/material';
import { TabContext, TabPanel, TabList } from '@mui/lab';
import AccessAlarm from '@mui/icons-material/AccessAlarm'
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import Toolbar from '../toolbar/Toolbar';
import Board from '../../board/board/Board';

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
                    <Toolbar />
                    <Board />
                </TabPanel>
                <TabPanel value={"adinformesmon"}>Item dos</TabPanel>
            </TabContext>
        </>
    )
}

export default TabsNavigation;