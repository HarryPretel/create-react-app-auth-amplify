import React from 'react'
import { Card , Switch} from '@material-ui/core'

class Shutoff extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Card>
                Power status: <Switch></Switch>
            </Card>
        )
    }
}

export default Shutoff