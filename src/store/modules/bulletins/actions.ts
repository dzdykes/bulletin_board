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
  async [FETCH_BULLETINS] ( { commit }: any) {
    const res = await axios.get(`${BASEURL}Bulletins`);
    return commit(SET_BULLETINS, res.data);
  },
  async [FETCH_USER_BULLETINS] ( { commit }: any, params: any) {
    const res = await axios.get(`${BASEURL}Bulletins/User`, { params });
    return commit(SET_USER_BULLETINS, res.data);
  },
  async [CREATE_BULLETIN] ( { commit }: any, request: any) {
    const res = await axios.post(`${BASEURL}Bulletins`, request);
    return commit(SET_CURRENT_BID, res.data);
  }
}
