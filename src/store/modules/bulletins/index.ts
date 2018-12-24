import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'

const initialState = {
  bulletins: [],
  userBulletins: [],
  currentBid: null
}

export default {
  state: {...initialState},
  getters,
  mutations,
  actions
}
