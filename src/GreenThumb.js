import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import DashBoard from './pages/DashBoard.js'
import ControlPanel from './pages/ControlPanel.js'
import LightSchedule from './features/LightSchedule.js'
import FamilyTree from './features/FamilyTree.js'

function getRandomData(n, ceiling) {
    let arr = []
    for (let i = 0; i < n; i++) {
        arr.push({ x: i, y: Math.random() * ceiling })
    }
    return arr
}

function getRandomTimestampedData(n, unit, ceiling) {
    let arr = []
    for (let i = 0; i < n; i++) {
        arr.push({ timestamp: i * 10*60*1000, unit: unit, value: Math.floor(Math.random() * ceiling) })
    }
    return arr
}


class GreenThumb extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: "Harry Pretel", graphs: ["ph", "temp", "humidity", "water_schedule", "weight", "co2", "nutrients"]}
    }



    render() {
        let arr_mod = {}
        for(let i=0; i<this.state.graphs.length; i++) {
            arr_mod[this.state.graphs[i]] = getRandomTimestampedData(52*7*24*6, "Celsius", 100)
        }
        return (
            <body>
                <DashBoard graphs={this.state.graphs} data={arr_mod} widget_widths={window.innerWidth*.8} widget_heights="200"/>
            </body>
        )
    }
}

export default GreenThumb