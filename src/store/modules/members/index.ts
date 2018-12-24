import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'

const initialState = {
  members: [],
  membership: {},
  currentMID: null
}

export default {
  state: {...initialState},
  getters,
  mutations,
  actions
}
