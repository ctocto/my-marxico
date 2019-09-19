import userApi from '@services/user'

export default {
  namespace: 'setting',

  state: {
    settingVisible: false,
  },

  effects: {
    * fetchData({ _ }, { call, put }) {
      try {
        const res = yield call(userApi.getInfo)
        console.log(res)
        if (res) {
          yield put({
            type: 'file/setPath',
            payload: res.documentPath,
          })
        }
      } catch (error) {
        throw (error)
      }
    },
  },

  reducers: {
    toggleSettingVisible(state) {
      return {
        ...state,
        settingVisible: !state.settingVisible,
      }
    },
  },
}
