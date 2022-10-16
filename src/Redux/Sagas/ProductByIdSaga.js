

import { call, put, takeLatest } from 'redux-saga/effects'
import { FirebaseApi } from '../../Firebase/FirebaseApi';
import { productByIdRoute, productByIdClearRoute } from '../Reducers/ProductByIdReducer'

// worker
function* oneProductWorker(action) { 
  const { success, failure, request } = productByIdRoute;
  try { 
    yield put(request({isLoading: true}))
    const product = yield call(FirebaseApi.productById, {id: action.payload})
    yield put(success({product, isLoading: false}))
  } catch (error) {
    yield put(failure({error: error.message, isLoading: false}))
  }
}
 
export function* productByIdWatcher() {
  yield takeLatest(productByIdRoute.TRIGGER, oneProductWorker)
}

function* productByIdClearWorker(action) { 
  console.log(action)
  const { fulfill } = productByIdClearRoute;
  yield put(fulfill())
}

export function* productByIdClearWatcher() {
  yield takeLatest(productByIdClearRoute.TRIGGER, productByIdClearWorker)
}