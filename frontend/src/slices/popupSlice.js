import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dialog: false
}

export const popupSlicer = createSlice({
    name: 'popup',//name of slice
    initialState,//initial state
    reducers: {//reducers
        handleDialog: (state, { payload }) => {
            switch (payload.type) {
                case 'OPEN':
                    return { ...state, dialog: true }
                case 'CLOSE':
                    return { ...state, dialog: false }
                default:
                    return 'Something went wrong'
            }

        }

    }

})

// Action creators are generated for each case reducer function
export const { handleDialog } = popupSlicer.actions
export default popupSlicer.reducer