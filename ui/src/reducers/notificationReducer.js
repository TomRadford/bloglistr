import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: null,
    type: null,
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return initialState
        },
    },
})

const notificationTimeout = {
    cancel: () => {
        clearTimeout(notificationTimeout.timeoutId)
    },
    runTimeout: (dispatch, seconds) => {
        notificationTimeout.timeoutId = setTimeout(() => {
            dispatch(removeNotification())
        }, seconds)
    },
}

export const { addNotification, removeNotification } = notificationSlice.actions
export const setNotification = (notificationObject, seconds) => {
    return (dispatch) => {
        notificationTimeout.cancel
        dispatch(addNotification(notificationObject))
        notificationTimeout.runTimeout(dispatch, seconds)
    }
}

export default notificationSlice.reducer
