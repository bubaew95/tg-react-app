

import { call, put, takeLatest } from 'redux-saga/effects'
import { FirebaseApi } from '../../Firebase/FirebaseApi';
import { productRoute } from '../Reducers/ProductsReducer'

// worker
function* fetchProductsWorker(action) { 
    const { success, failure, request } = productRoute;
  try { 
    yield put(request({isLoading: true}))
    const products = yield call(FirebaseApi.products)
    yield put(success({products, isLoading: false}))
  } catch (error) {
    yield put(failure({error: error.message, isLoading: false}))
  }
}

// watcher
// при срабатывании триггера login отработает и loginWorker
export function* productsWatcher() {
  yield takeLatest(productRoute.TRIGGER, fetchProductsWorker)
}