/* eslint-disable no-underscore-dangle */
import docApi from '@services/documents'
import { message } from 'antd'

const defaultCurrent = {
  currentDocId: '',
  currentDocTitle: 'Untitled',
  currentDocCategory: 'Untitled',
  currentDocTag: 'Untitled',
  currentDocData: '',
}

export default {
  namespace: 'documents',

  state: {
    documents: [],
    ...defaultCurrent,
  },

  effects: {
    * fetchList({ _ }, { call, put, select }) {
      try {
        const res = yield call(docApi.getList)
        const { currentDocId } = yield select(state => state.documents)

        yield put({
          type: 'save',
          payload: {
            documents: res || [],
          },
        })
        if (!currentDocId && res) {
          const [current] = res
          yield put({
            type: 'fetchDoc',
            payload: current._id,
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    * fetchDoc({ payload }, { call, put }) {
      try {
        const res = yield call(docApi.getDoc, payload)

        if (res) {
          yield put({
            type: 'save',
            payload: {
              currentDocId: res._id,
              currentDocTitle: res.title,
              currentDocCategory: res.category,
              currentDocTag: res.tag,
              currentDocData: res.content,
            },
          })
        }
      } catch (error) {
        message.warning('获取文档失败')
      }
    },
    * fetchAddDoc({ _ }, { call, put }) {
      try {
        const res = yield call(docApi.addDoc, {
          title: defaultCurrent.currentDocTitle,
          content: defaultCurrent.currentDocData,
          tag: '',
          category: '',
        })
        if (res) {
          yield put({
            type: 'fetchList',
          })
          yield put({
            type: 'save',
            payload: {
              ...defaultCurrent,
              // eslint-disable-next-line no-underscore-dangle
              currentDocId: res._id,
            },
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    * fetchUpdateDoc({ payload }, { call, put }) {
      const { content, id } = payload
      const index = content.search(/\n/)
      const title = content.substr(0, index > 0 ? index : 15).replace(/^#+\s+/, '')

      try {
        const res = yield call(docApi.updateDoc, {
          id,
          title,
          content,
          tag: '',
          category: '',
        })
        if (res) {
          console.log(res, '123123')
          yield put({
            type: 'fetchList',
          })
          yield put({
            type: 'save',
            payload: {
              currentDocTitle: title,
              currentDocCategory: '',
              currentDocTag: '',
              currentDocData: content,
            },
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    * fetchDelDoc({ payload }, { call, put }) {
      try {
        const res = yield call(docApi.delDoc, payload)

        if (res) {
          message.success('删除完成')
          yield put({
            type: 'fetchList',
          })
          yield put({
            type: 'save',
            payload: {
              ...defaultCurrent,
            },
          })
        }
      } catch (error) {
        console.log(error)
        message.warning('删除文档失败')
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    saveData(state, { payload }) {
      return {
        ...state,
        currentDocData: payload,
      }
    },
  },
}
