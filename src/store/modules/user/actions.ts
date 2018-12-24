import axios from 'axios';
import { BASEURL } from '../../api'
import { FETCH_USER, SET_USER, CREATE_USER, SET_HASCREATEDUSER } from '../../user-types'

export const actions = {
  [FETCH_USER] ( { commit }: any, params: any) {
    return axios.get(`${BASEURL}AuthUser`, { params })
      .then((res: any) =>
        commit(SET_USER, res.data))
  },
  [CREATE_USER] ( { commit }: any, email: string) {
    return axios.post(`${BASEURL}AuthUser`, { email })
      .then((res: any) =>
        commit(SET_HASCREATEDUSER, res.data))
  }
}
