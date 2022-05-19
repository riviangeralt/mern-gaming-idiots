import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instanceApi from '../api/backend';

const initialState = {
    users: [],
    selectedUser: {},
    loading: false,
}

export const fetchUsers = createAsyncThunk('user/fetchUsers',
    async (userId) => {
        const resp = await instanceApi
            .get(`/users/${userId}`)
        return resp.data.data
    })

export const deleteUser = createAsyncThunk('user/deleteUser',
    async (id) => {
        const { admin, user } = id
        const resp = await instanceApi
            .delete(`/delete/${admin}/${user}`)
        return resp.data.message
    })

export const fetchIndividualUser = createAsyncThunk('user/fetchIndividualUser',
    async (id) => {
        const { admin, user } = id
        const resp = await instanceApi
            .get(`/users/${admin}/${user}`)
        return resp.data.user
    })

export const userSlicer = createSlice({
    name: 'users',//name of slice
    initialState,//initial state
    reducers: {//reducers
        removeSelectedUser: (state) => {
            return { ...state, selectedUser: {} }
        }
    },
    extraReducers: {//extrareducers
        [fetchUsers.pending]: (state, { payload }) => {
            return { ...state, loading: true }
        },
        [fetchUsers.fulfilled]: (state, { payload }) => {
            return { ...state, users: payload, loading: false, }
        },
        [fetchIndividualUser.pending]: (state, { payload }) => {
            return { ...state, loading: true }
        },
        [fetchIndividualUser.fulfilled]: (state, { payload }) => {
            return { ...state, selectedUser: payload, loading: false }
        },
    }
})

// Action creators are generated for each case reducer function
export const { removeSelectedUser } = userSlicer.actions
export default userSlicer.reducer