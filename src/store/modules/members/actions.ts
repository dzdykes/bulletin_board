import axios from 'axios';
import { BASEURL } from '../../api'
import {
  FETCH_MEMBERS,
  FETCH_MEMBERSHIP,
  SET_MEMBERS,
  SET_MEMBERSHIP,
  CREATE_MEMBERSHIP,
  SET_CURRENT_MID
} from '@/store/member-types'

export const actions = {
  async [FETCH_MEMBERS] ( { commit }: any, bulletinId: string) {
    const res = await axios.get(`${BASEURL}BulletinMembers`, { params: { bulletinId }});
    return commit(SET_MEMBERS, res.data);
  },
  async [FETCH_MEMBERSHIP] ( { commit }: any, params: any) {
    const res = await axios.get(`${BASEURL}BulletinMembers/member`, { params })
    commit(SET_CURRENT_MID, res.data.id || '')
    return commit(SET_MEMBERSHIP, res.data);
  },
  async [CREATE_MEMBERSHIP] ( { commit }: any, request: any) {
    const res = await axios.post(`${BASEURL}BulletinMembers`, request);
    return commit(SET_CURRENT_MID, res.data)
  }
}
