
import { all } from 'redux-saga/effects'
import { addToCartWatcher, cartWatcher } from './CartSaga'
import { productByIdWatcher, productByIdClearWatcher } from './ProductByIdSaga'
import { productsWatcher } from './ProductSaga'

export default function* rootSaga() {
  yield all([
    productsWatcher(),
    productByIdWatcher(),
    productByIdClearWatcher(),
    addToCartWatcher(),
    cartWatcher()
  ])
}