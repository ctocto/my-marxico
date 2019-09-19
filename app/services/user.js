/**
 * @Summary short description for the file
 * @Author: hefan
 * @Date: 2019-09-17 17:06:45
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-09-17 19:01:36
 */
import { remoteApi } from './utils'

const USER_API = {
  getInfo: async () => {
    try {
      const data = await remoteApi.user.getUserSetting()
      return data
    } catch (error) {
      throw (error)
    }
  },
}

export default USER_API
