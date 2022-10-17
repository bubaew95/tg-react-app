import { combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'

// import counter from './counter'
import products from './Reducers/ProductsReducer'
import productById from './Reducers/ProductByIdReducer'
import cart from './Reducers/CartReducer'
import rootSaga from './Sagas/rootSaga'

// добавить sagaMiddleware
const sagaMiddleware = createSagaMiddleware()

// добавить user reducer
const rootReducer = combineReducers({
    products,
    productById,
    cart
})

// использовать middleware
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

// и запустить корневую сагу
sagaMiddleware.run(rootSaga)

export default store