

import { createReducer } from '@reduxjs/toolkit'
import { createRoutine } from 'redux-saga-routines'

// state
const initialState = {
    isLoading: true,
    error: null,
    products: []
}

// routine теперь заменяет action creator
export const productRoute = createRoutine('product')

// reducer откликается на созданные роутинами actions
const products = createReducer(initialState, {
  [productRoute.SUCCESS]: (state, action) => {
    const { products, isLoading } = action.payload 
    return { ...state, products, isLoading }
  },
  [productRoute.FAILURE]: (state, action) => {
    const { error } = action.payload
    return { ...state, error }
  },
  [productRoute.FULFILL]: (state, action) => {
    const { isLoading } = action.payload
    return { ...state, isLoading }
  }
})

export default products