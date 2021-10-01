import React from 'react'
import { Card , Switch, Button} from '@material-ui/core'
import {Stack} from '@mui/material'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
class ControlButtons extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Card>                
                <Stack direction="row" spacing={5} justifyContent="space-between">

                    <Button>
                        <PowerSettingsNewIcon>

                        </PowerSettingsNewIcon>
                    </Button>
                </Stack>
            </Card>
        )
    }
}

export default ControlButtons