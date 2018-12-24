import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'

const initialState = {
  user: {},
  hasCreatedUser: false
}

export default {
  state: {...initialState},
  getters,
  mutations,
  actions
}
