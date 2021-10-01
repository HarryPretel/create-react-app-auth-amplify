import { Card} from '@material-ui/core'
import BoltIcon from '@mui/icons-material/Bolt'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import * as React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Stack, Divider} from '@mui/material';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {ToggleButton, ToggleButtonGroup, Typography} from '@mui/material'
import TimeGraph from './Canvas2'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}

class Electricity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Card>
                <Stack cirection="column">

                <Typography align="center">
                    Energy
                </Typography>
                <TimeGraph intervals={1000}>
                    
                </TimeGraph>
                <Stack direction="row" spacing={5} justifyContent="space-between">
                <ToggleButtonGroup style={{float: 'right'}}>Stealth Mode
                    <ToggleButton>
                <BoltIcon></BoltIcon>
                    </ToggleButton>
                    <ToggleButton>
                        <AttachMoneyIcon>

                        </AttachMoneyIcon>
                    </ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup>Stealth Mode
                    <ToggleButton>1D</ToggleButton>
                    <ToggleButton>1W</ToggleButton>
                    <ToggleButton>ALL</ToggleButton>
                </ToggleButtonGroup>
                </Stack>
                </Stack>
            </Card>
        )
    }
}

export default Electricity