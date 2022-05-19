import React from 'react'
import { useSelector } from 'react-redux'
import CustomCard from '../../components/CustomCard'
import { Grid } from '@mui/material'
const Summary = () => {
    const cartItems = useSelector(state => state.games.cart)
    return (
        <>
            <Grid sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                {cartItems.map(element =>
                    <CustomCard isSmall={true} type="games" element={element} height={200} fromCart={true} />
                )}
            </Grid>
        </>
    )
}

export default Summary
