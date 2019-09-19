/**
 * @Summary short description for the file
 * @Author: hefan
 * @Date: 2019-09-17 17:00:30
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-09-17 17:05:52
 */
import { remote } from 'electron'

// eslint-disable-next-line import/prefer-default-export
export const remoteApi = remote.require('./apiService')
