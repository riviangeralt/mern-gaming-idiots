import React from 'react'
import Slide from '@mui/material/Slide';
import { useSelector } from 'react-redux'
import { handleDialog } from '../slices/popupSlice';
import { Dialog } from '@mui/material'
import { useDispatch } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const CustomDialog = (props) => {
    const dispatch = useDispatch()
    const dialog = useSelector(state => state.popup.dialog)
    const closeDialog = () => {
        dispatch(handleDialog({ type: 'CLOSE' }))
    }
    return (
        <Dialog
            open={dialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={closeDialog}
        >
            {props.children}
        </Dialog>

    )
}

export default CustomDialog
