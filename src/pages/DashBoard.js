import React from 'react'
import TimeGraph from '../features/Canvas.js'
import Electricity from '../features/Electricity'
import ControlButtons from '../features/ControlButtons'
import Lifeline from '../features/Lifeline'
import Notes from '../features/Notes'
import Shutoff from '../features/Shutoff'
import Water from '../features/Water'
import ImportImages from '../features/ImportImages'
import StealthMode from '../features/StealthMode'
import { Grid, Card } from '@material-ui/core'
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import NotesIcon from '@mui/icons-material/Notes';
import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonAppBar from '../features/ButtonAppBar.js'
import Scans from '../features/Scans.js'
var actions = [
    { icon: <AttachFileIcon />, },
    { icon: <SaveIcon />,},
    { icon: <CreateIcon />},
  ];


class DashBoard extends React.Component {
    constructor(props) {
        super(props)
        let { graphs, data, widget_widths, widget_heights, ...rest } = props
        this.state = { widgets: graphs, data: data, widget_widths: widget_widths, widget_heights: widget_heights }

        // ["ph", "temp", "humidity", "water_schedule", "weight", "co2", "nutrients"]
    }


    render() {
        return <div>
            <ButtonAppBar></ButtonAppBar>
            <Stack direction="column" justifyContent="space-around" spacing={4} padding={4}>

                    <Lifeline >

                    </Lifeline>
                    <Electricity >

                    </Electricity>

                    <Notes>

                    </Notes>

                    <Scans>
                        
                    </Scans>

            </Stack>
                <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>




        </div>
    }

}
export default DashBoard