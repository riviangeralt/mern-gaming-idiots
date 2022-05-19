import { Paper } from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles'
import CloseIcon from '@mui/icons-material/Close';
import ButtonController from '../control/ButtonController'
const useStyles = makeStyles({
    heading: {
        borderBottom: '1px solid #707070',
        marginBottom: '1rem',
        padding: '.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

const CustomModal = (props) => {
    const classes = useStyles()
    return (
        <Paper style={{ width: '50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
            <div className={classes.heading}>
                <h1 style={{ fontSize: '1.2rem' }}>Checkout</h1>
                <CloseIcon style={{ cursor: 'pointer', }} onClick={props.onClose} />
            </div>

            <div>{props.data.toLocaleString()}</div>
            <ButtonController>Pay</ButtonController>
        </Paper>
    )
}

export default CustomModal
