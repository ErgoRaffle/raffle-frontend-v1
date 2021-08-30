import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
    'addressLoaded': false,
    'walletAddr': ""
}

const SET_WALLET = "SET_WALLET"
const CLEAR_WALLET = "CLEAR_WALLET"

export const loadAddress = () => {
    return dispatch => {
        if (!store.getState().addressLoaded)
        {
            const walletAddress = localStorage.getItem('walletAddr')
            if (walletAddress !== null) dispatch({
                type: "SET_WALLET",
                payload: walletAddress
            })
            else dispatch({
                type: "CLEAR_WALLET",
                payload: ""
            })
        }
    }
}

export const setAddress = (walletAddr) => {
    return dispatch => {
        localStorage.setItem('walletAddr', walletAddr)
        dispatch({
            type: "SET_WALLET",
            payload: walletAddr
        })
    }
}

export const clearAddress = () => {
    return dispatch => {
        localStorage.setItem('walletAddr', "")
        return dispatch({
            type: "CLEAR_WALLET",
            payload: ""
        })
    }
}

const reducer = (state = initialState, action) => {
    if (action.type === SET_WALLET)
    {
        return {
            ...state,
            'walletAddr': action.payload,
            addressLoaded: true
        }
    }
    else if (action.type === CLEAR_WALLET)
    {
        return {
            ...state,
            'walletAddr': "",
            addressLoaded: true
        }
    }
    else
    {
        return state
    }
}

export const store = createStore(reducer, applyMiddleware(thunk))
