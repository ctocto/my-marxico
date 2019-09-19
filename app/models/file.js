import { ipcRenderer } from 'electron'

export const defaultFileDetail = {
  currentFilePath: '/Users/hefan/Downloads',
  currentFileName: 'Untitled.md',
  currentFileTitle: 'Untitled',
  currentFileData: '',
}

export default {
  namespace: 'file',

  state: {
    ...defaultFileDetail,
    fileList: [],
  },

  effects: {
    * createFile({ _ }, { put, select }) {
      const { currentFileName, currentFilePath } = yield select(({ file }) => file)

      yield put({
        type: 'newFile',
      })

      ipcRenderer.send('markdown-write', {
        file: `${currentFilePath}/${currentFileName}`,
        data: '',
      })
    },
    * saveFile({ _ }, { put, select }) {
      const file = yield select(({ file }) => file)
      const { currentFileData, currentFilePath } = file

      const index = currentFileData.search(/\n/)

      const name = currentFileData.substr(0, index > 0 ? index : 15)

      yield put({
        type: 'saveFileInfo',
        payload: {
          currentFileName: `${name}.md`,
          currentFileTitle: name,
        },
      })

      ipcRenderer.send('markdown-write', {
        file: `${currentFilePath}/${name}.md`,
        data: currentFileData,
      })
    },
    * setPath({ payload }, { put }) {
      yield put({
        type: 'saveFileInfo',
        payload: {
          currentFilePath: payload,
        },
      })
    },
  },

  reducers: {
    newFile(state) {
      return {
        ...state,
        ...defaultFileDetail,
      }
    },
    saveData(state, { payload }) {
      return {
        ...state,
        currentFileData: payload,
      }
    },
    saveFileInfo(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
