import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, removeSelectedUser } from '../../slices/userSlice';
import { withRouter } from 'react-router-dom';

const Users = (props) => {
    const { user } = props
    const users = useSelector(state => state.users.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUsers(user))
        return () => {
            dispatch(removeSelectedUser())
        }
    }, [dispatch]);
    const editUser = async (id) => {
        props.history.push(`/edituser/${id}`)
    }
    const delUser = (id) => {
        dispatch(deleteUser({ "admin": user, "user": id }))
        dispatch(fetchUsers(user))
    }
    const addUser = () => {
        console.log('clicked')
    }
    return (
        <>
            <TableContainer component={Paper}>
                <TableRow style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <TableCell style={{ display: 'flex', alignItems: 'center' }}>  <AddCircleOutlineIcon onClick={() => addUser()} style={{ cursor: 'pointer', marginRight: '.5rem' }} /> Add User</TableCell>
                </TableRow>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Role</TableCell>
                            <TableCell align="left">Game Purchased</TableCell>
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!users ? 'Loading' : users.flat()?.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="left">{row.role === 0 ? 'Registered User' : 'Admin'}</TableCell>
                                <TableCell align="left">{row.history.length}</TableCell>
                                <TableCell align="left">
                                    <EditIcon style={{ marginRight: 10, cursor: 'pointer' }} onClick={() => editUser(row.id)} />
                                    <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => delUser(row.id)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default withRouter(Users);
