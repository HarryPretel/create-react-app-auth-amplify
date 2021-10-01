import React from 'react'
import { Card, CircularProgress } from '@material-ui/core'

class Water extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Card>
                Water remaining: 
                Tank: 1200ml / 2000ml
<CircularProgress variant="determinate" value={50} />
                Time: 6 days since last refill... 10 days left in tank
            </Card>
        )
    }
}

export default Water