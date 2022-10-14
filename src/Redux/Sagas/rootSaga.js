
import { all } from 'redux-saga/effects'
import { cartWatcher } from './AddToCartSaga'
import { productByIdWatcher } from './ProductByIdSaga'
import { productsWatcher } from './ProductSaga'

export default function* rootSaga() {
  yield all([
    productsWatcher(),
    productByIdWatcher(),
    cartWatcher()
  ])
}