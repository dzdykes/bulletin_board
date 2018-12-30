import axios from 'axios';
import { BASEURL } from '../../api'
import {
  FETCH_BULLETINS,
  SET_BULLETINS,
  FETCH_USER_BULLETINS,
  SET_USER_BULLETINS,
  CREATE_BULLETINS,
  SET_CURRENT_BID,
  FETCH_BULLETIN_POSTS,
  SET_BULLETIN_POSTS,
  CREATE_BULLETIN_POST,
  FETCH_BULLETIN,
  SET_CURRENT_BULLETIN,
  SET_CURRENT_BPID
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
  async [CREATE_BULLETINS] ( { commit }: any, request: any) {
    const res = await axios.post(`${BASEURL}Bulletins`, request);
    return commit(SET_CURRENT_BID, res.data);
  },
  async [FETCH_BULLETIN_POSTS] ( { commit }: any, params: any) {
    const res = await axios.get(`${BASEURL}BulletinPosts`, { params });
    return commit(SET_BULLETIN_POSTS, res.data);
  },
  async [FETCH_BULLETIN] ( { commit }: any, params: any) {
    const res = await axios.get(`${BASEURL}Bulletins/profile`, { params });
    const bid = res.data.bulletinId
    commit(SET_CURRENT_BID, bid)
    return commit(SET_CURRENT_BULLETIN, res.data)
  },
  async [CREATE_BULLETIN_POST] ( { commit }: any, request: any) {
    const res = await axios.post(`${BASEURL}BulletinPosts`, request);
    return commit(SET_CURRENT_BPID, res.data);
  }
}
