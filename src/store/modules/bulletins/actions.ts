import axios from 'axios';
import { BASEURL } from '../../api'
import { FETCH_BULLETINS, SET_BULLETINS } from '../../bulletins-types'

export const actions = {
  [FETCH_BULLETINS] ( { commit }: any) {
    return axios.get(`${BASEURL}Bulletins`)
      .then((res: any) =>
        commit(SET_BULLETINS, res.data))
  }
}