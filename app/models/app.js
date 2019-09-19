export default {
  namespace: 'app',

  state: {
    documentListDrawer: false,
    settingDrawer: false,
  },

  effects: {},

  reducers: {
    toggleDrawer(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
