import React from 'react'
import { Card , Switch} from '@material-ui/core'
import {ToggleButton, ToggleButtonGroup} from '@mui/material'

class StealthMode extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Card>
                Stealth Mode: <Switch></Switch>
                <ToggleButtonGroup>Stealth Mode
                    <ToggleButton>sdfasfsd</ToggleButton>
                    <ToggleButton>sdfasfsd</ToggleButton>
                    <ToggleButton>sdfasfsd</ToggleButton>
                </ToggleButtonGroup>
            </Card>
        )
    }
}

export default StealthMode