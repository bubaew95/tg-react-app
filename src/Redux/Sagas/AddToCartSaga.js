

import { call, put, takeLatest } from 'redux-saga/effects'
import { cartRoute } from '../Reducers/AddToCartReducer'

// worker
function* addToCartWorker(action) { 
    const { request } = cartRoute;
    yield put(request({items: action.payload}))
}

// watcher
// при срабатывании триггера login отработает и loginWorker
export function* cartWatcher() {
  yield takeLatest(cartRoute.TRIGGER, addToCartWorker)
}