import React from 'react'
import { Card } from '@material-ui/core'
import {List, ListItem, Typography, Divider, Stack, Button} from '@mui/material'
import { Canvas, useFrame } from '@react-three/fiber'
import {Box} from './Box'
import AddIcon from '@mui/icons-material/Add';
class Notes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Card>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Button>fdsfs</Button>
                <Typography align="center">Recent Logs</Typography>  
                <Button align="right"><AddIcon></AddIcon></Button>

                </Stack>
                <Divider></Divider>  
                <List>
                <ListItem>fdafdsa</ListItem>
                <ListItem>fdafdsa</ListItem>
                <ListItem>fdafdsa</ListItem>
                <ListItem>fdafdsa</ListItem>
                <ListItem>fdafdsa</ListItem>
                </List>
            </Card>
        )
    }
}

export default Notes