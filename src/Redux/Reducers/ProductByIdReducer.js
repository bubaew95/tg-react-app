

import { createReducer } from '@reduxjs/toolkit'
import { createRoutine } from 'redux-saga-routines'

// state
const initialState = {
    isLoading: true,
    error: null,
    product: []
}

// routine теперь заменяет action creator
export const productByIdRoute = createRoutine('PRODUCT_BY_ID')

// reducer откликается на созданные роутинами actions
const productById = createReducer(initialState, {
  [productByIdRoute.SUCCESS]: (state, action) => {
    const { product, isLoading } = action.payload 
    return { ...state, product, isLoading }
  },
  [productByIdRoute.FAILURE]: (state, action) => {
    const { error } = action.payload
    return { ...state, error }
  },
  [productByIdRoute.FULFILL]: (state, action) => {
    const { isLoading } = action.payload
    return { ...state, isLoading }
  }
})

export default productById