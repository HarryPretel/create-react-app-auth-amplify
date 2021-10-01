import React from 'react'
import { SpeedDial} from '@mui/material'
import { Card , Switch, Button} from '@material-ui/core'
import AttachFileIcon from '@mui/icons-material/AttachFile';
class ImportImages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Card>
                <Button
  variant="contained"
  component="label"
>
  <input
    type="file"
    hidden
  />
  <AttachFileIcon>

  </AttachFileIcon>
</Button>
            </Card>
        )
    }
}

export default ImportImages