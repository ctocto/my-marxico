import { delay } from 'dva/saga'

export default {
  namespace: 'counter',
  state: 0,
  effects: {
    * increment({ _ }, { put }) {
      yield put({ type: 'incrementReducer' })
    },
    * decrement({ _ }, { put }) {
      yield put({ type: 'decrementReducer' })
    },
    * incrementIfOdd({ _ }, { put }) {
      yield put({ type: 'incrementIfOddReducer' })
    },
    * incrementAsync({ _ }, { call, put }) {
      yield call(delay, 1000)
      yield put({ type: 'increment' })
    },
  },

  reducers: {
    incrementReducer(state, action) {
      return state + 1
    },
    decrementReducer(state, action) {
      return state - 1
    },
    incrementIfOddReducer(state, action) {
      return (state % 2 !== 0) ? state + 1 : state
    },
  },
}
