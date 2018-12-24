import axios from 'axios';
import { BASEURL } from '../../api'
import {
  FETCH_BULLETINS,
  SET_BULLETINS,
  FETCH_USER_BULLETINS,
  SET_USER_BULLETINS,
  CREATE_BULLETIN,
  SET_CURRENT_BID
} from '../../bulletins-types'

export const actions = {
  [FETCH_BULLETINS] ( { commit }: any) {
    return axios.get(`${BASEURL}Bulletins`)
      .then((res: any) =>
        commit(SET_BULLETINS, res.data))
  },
  [FETCH_USER_BULLETINS] ( { commit }: any, params: any) {
    return axios.get(`${BASEURL}Bulletins/User`, { params })
      .then((res: any) =>
        commit(SET_USER_BULLETINS, res.data))
  },
  [CREATE_BULLETIN] ( { commit }: any, request: any) {
    return axios.post(`${BASEURL}Bulletins`, request)
      .then((res: any) =>
        commit(SET_CURRENT_BID, res.data))
  }
}
