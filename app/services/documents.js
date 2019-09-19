/**
 * @Summary short description for the file
 * @Author: hefan
 * @Date: 2019-09-18 15:27:00
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-09-19 09:43:59
 */
import { remoteApi } from './utils'

const DOC_API = {
  getList: async () => {
    try {
      const res = await remoteApi.documents.getDocList()
      return res
    } catch (error) {
      throw (error)
    }
  },
  getDoc: async (id) => {
    try {
      const res = await remoteApi.documents.getDoc(id)
      return res
    } catch (error) {
      throw (error)
    }
  },
  addDoc: async (doc) => {
    try {
      const res = await remoteApi.documents.addDoc(doc)
      return res
    } catch (error) {
      throw (error)
    }
  },
  delDoc: async (id) => {
    try {
      const res = await remoteApi.documents.delDoc(id)
      return res
    } catch (error) {
      throw (error)
    }
  },
  updateDoc: async (params) => {
    try {
      const res = await remoteApi.documents.updateDoc(params)
      return res
    } catch (error) {
      throw (error)
    }
  },
}

export default DOC_API
