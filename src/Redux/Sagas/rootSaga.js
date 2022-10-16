
import { all } from 'redux-saga/effects'
import { cartWatcher } from './AddToCartSaga'
import { productByIdWatcher, productByIdClearWatcher } from './ProductByIdSaga'
import { productsWatcher } from './ProductSaga'

export default function* rootSaga() {
  yield all([
    productsWatcher(),
    productByIdWatcher(),
    productByIdClearWatcher(),
    cartWatcher()
  ])
}