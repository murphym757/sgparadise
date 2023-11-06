import React, { createContext, useContext, useReducer } from "react"
import { cos } from "react-native-reanimated"
// Loader Context
//TODO: Create a "error code" page and set it to appear under the ACTION.ERROR case
const LoaderContext = createContext()

const initialState = {
    isLoading: true,
    error: null,
    firebaseData: null
} 

function LoaderReducer(state, action) {
    switch (action.type) {
        case 'ACTIONS.LOAD_PAGE': {
            console.log("LoaderReducer: ACTIONS.LOAD_PAGE case reached")
            return {
                ...state,
                isLoading: action.payload.isLoading
            }
        }
        case 'ACTIONS.SUCCESS': {
            console.log("LoaderReducer: ACTIONS.SUCCESS case reached")
            return {
                ...state,
                isLoading: action.payload.isLoading,
                firebaseData: action.payload.firebaseData
            }
        }
        case 'ACTIONS.ERROR': {
            return {
                ...state,
                isLoading: action.payload.isLoading,
                error: action.error
            }, console.log("LoaderReducer: ACTIONS.ERROR case reached")
        }
        default: {
            return state
        }  
    }
}

//* Goes to app.js
export function LoaderProvider({ children }) {
    const [state, dispatch] = useReducer(LoaderReducer, initialState)
    return (
        <LoaderContext.Provider value={{ state, dispatch }}>
            {children}
        </LoaderContext.Provider>
    )
}

//* Goes everywhere else
export function useLoader() {
    return useContext(LoaderContext)
}