 

import { call, put, takeLatest } from 'redux-saga/effects'
import { cartAddRoute, cartRoute } from '../Reducers/CartReducer'
import { FirebaseApi } from '../../Firebase/FirebaseApi';


// worker
function* addToCartWorker(action) { 
    const { request } = cartAddRoute;
    const {item, userId} = action.payload

    yield put(request({items: item})) 
    try { 
      const cartAdd = yield call(FirebaseApi.addToCart, action.payload)
      // const cart = yield call(FirebaseApi.cart, action.payload)
      console.log(cartAdd)
    } catch (error) {
      console.log(error)
      // yield put(failure({error: error.message, isLoading: false}))
    }
}

// watcher
// при срабатывании триггера login отработает и loginWorker
export function* addToCartWatcher() {
  yield takeLatest(cartAddRoute.TRIGGER, addToCartWorker)
}


// worker
function* cartWorker(action) { 
    const { request, success, failure, fulfill } = cartRoute;
    // const {item, userId} = action.payload

    try { 
      const cart = yield call(FirebaseApi.cart, action.payload)
      yield put(success(cart)) 
    } catch (error) {
      yield put(failure({error: error.message}))
    } finally {
      // yield put(fulfill({}))
    }
}

// watcher
// при срабатывании триггера login отработает и loginWorker
export function* cartWatcher() {
  yield takeLatest(cartRoute.TRIGGER, cartWorker)
}