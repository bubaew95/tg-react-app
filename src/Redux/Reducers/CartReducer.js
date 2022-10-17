

import { createReducer } from '@reduxjs/toolkit'
import { createRoutine } from 'redux-saga-routines'

// state
const initialState = {
    items: [],
    totalSum: 0,
    quantity: 0
}

// routine теперь заменяет action creator
export const cartAddRoute = createRoutine('CART_ADD')

export const cartRoute = createRoutine('CART')

// reducer откликается на созданные роутинами actions
const cart = createReducer(initialState, {
  [cartAddRoute.REQUEST]: (state, action) => {
    const { items } = action.payload 
    return { 
      ...state, 
      items: [...state.items, items], 
      totalSum: state.totalSum + parseInt(items.price), 
      quantity: state.quantity + 1
    }
  },

  [cartRoute.SUCCESS]: (state, action) => {
    const { items, totalSum, quantity } = action.payload 
    return { 
      ...state, 
      items,
      totalSum, 
      quantity
    }
  }
})

export default cart