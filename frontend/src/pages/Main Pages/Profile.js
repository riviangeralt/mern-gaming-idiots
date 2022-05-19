import React, { useState } from 'react'
import { Box } from '@mui/system'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import YourInfo from './YourInfo';
import Purchase from './Purchase'
const Profile = (props) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box
            sx={{ flexGrow: 1, display: 'flex', height: 'auto' }}
        >
            <Tabs
                orientation="vertical"
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                TabIndicatorProps={{ style: { backgroundColor: '#105404' } }}
                sx={{ backgroundColor: "#FFF", height: '6rem', width: '20%' }}
            >
                <Tab label="Your Information"
                    disableRipple={true}
                    style={{ color: value === 0 ? '#105404' : '' }} />

                <Tab label="Purchase History"
                    disableRipple={true}
                    style={{ color: value === 1 ? '#105404' : '' }} />
            </Tabs>
            {
                value === 0 ? <YourInfo />
                    : <Purchase />
            }
        </Box >
    )
}

export default Profile
