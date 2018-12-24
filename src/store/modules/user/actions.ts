import axios from 'axios';
import { BASEURL } from '../../api'
import { FETCH_USER, SET_USER, CREATE_USER, SET_HASCREATEDUSER } from '../../user-types'

export const actions = {
  async [FETCH_USER] ( { commit }: any, params: any) {
    const res = await axios.get(`${BASEURL}AuthUser`, { params });
    return commit(SET_USER, res.data);
  },
  async [CREATE_USER] ( { commit }: any, email: string) {
    const res = await axios.post(`${BASEURL}AuthUser`, { email });
    return commit(SET_HASCREATEDUSER, res.data);
  }
}
