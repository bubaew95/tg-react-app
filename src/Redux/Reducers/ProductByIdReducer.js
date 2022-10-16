

import { createReducer } from '@reduxjs/toolkit'
import { createRoutine } from 'redux-saga-routines'

// state
const initialState = {
    isLoading: true,
    error: null,
    product: null
}

// routine теперь заменяет action creator
export const productByIdRoute = createRoutine('PRODUCT_BY_ID')
export const productByIdClearRoute = createRoutine('PRODUCT_BY_ID_CLEAR')

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

  [productByIdClearRoute.FULFILL]: (state, action) => { 
    return { ...state, isLoading: false, error: null, product: null }
  }
})

export default productById