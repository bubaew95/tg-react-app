 

import { call, put, takeLatest } from 'redux-saga/effects'
import { cartRoute } from '../Reducers/AddToCartReducer'
import { FirebaseApi } from '../../Firebase/FirebaseApi';


// worker
function* addToCartWorker(action) { 
    const { request } = cartRoute;
    const {item, userId} = action.payload

    yield put(request({items: item})) 
    try { 
      const product = yield call(FirebaseApi.addToCart, action.payload)
    } catch (error) {
      console.log(error)
      // yield put(failure({error: error.message, isLoading: false}))
    }
}

// watcher
// при срабатывании триггера login отработает и loginWorker
export function* cartWatcher() {
  yield takeLatest(cartRoute.TRIGGER, addToCartWorker)
}