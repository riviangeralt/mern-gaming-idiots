import React from 'react'
import CustomSwiper from '../../components/CustomSwiper';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Cards = (props) => {
    const { searchedGame, name, type } = props
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <Typography component="h1" style={{ fontSize: '1.5rem ', fontWeight: 'bold' }}>{name}</Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to={props.url} style={{ color: '#00FF00' }}>View All</Link>
                </div>
            </div>
            <CustomSwiper space={25} data={searchedGame} pages={4} height={300} isSmall={true} type={type} />
        </>
    )
}

export default Cards
