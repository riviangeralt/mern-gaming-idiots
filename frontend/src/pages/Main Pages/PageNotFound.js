import React from 'react'
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

const PageNotFound = () => {
    return (
        <Grid container justifyContent={'center'} alignItems={'center'} sx={{ width: '100%', height: '70vh' }} >
            <Typography variant='h4' sx={{ textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '10px' }}>This page could not be found!</Typography>
            <Typography variant='h6' component='p' sx={{ textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '5px', lineHeight: '0' }}>
                <Link to='/' style={{ color: '#FFF', }}>
                    click here to go back
                </Link>
            </Typography>

        </Grid >
    )
}

export default PageNotFound
