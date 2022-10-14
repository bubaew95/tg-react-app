

import { createReducer } from '@reduxjs/toolkit'
import { createRoutine } from 'redux-saga-routines'

// state
const initialState = {
    items: [],
    totalSum: 0,
    qty: 0
}

// routine теперь заменяет action creator
export const cartRoute = createRoutine('CART')

// reducer откликается на созданные роутинами actions
const cart = createReducer(initialState, {
  [cartRoute.REQUEST]: (state, action) => {
    const { items } = action.payload 
    return { 
      ...state, 
      items: [...state.items, items], 
      totalSum: state.totalSum + parseInt(items.price), 
      qty: state.qty + 1
    }
  },
})

export default cart