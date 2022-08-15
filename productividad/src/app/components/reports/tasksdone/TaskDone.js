import React from 'react';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryContainer } from 'victory';
import './taskdone.css'
const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
];

/**
 * It returns a div with two VictoryCharts, each with a VictoryBar
 */

const TaskDone = () => {
    return (
        <div className='reports-main'>
            <div className='reports-first'>
                <VictoryChart theme={VictoryTheme.material}>
                    <VictoryBar
                        data={data}
                        x="quarter"
                        y="earnings"
                        style={{ data: { fill: "#c43a31" } }}
                    />
                </VictoryChart>
            </div>
            <div className='reports-first'>
                <VictoryChart theme={VictoryTheme.material}>

                    <VictoryBar
                        data={data}
                        x="quarter"
                        y="earnings"
                        alignment="start"
                        style={{ data: { fill: "#c43a31" } }}
                    />
                </VictoryChart>
            </div>
        </div>

    )
}

export default TaskDone