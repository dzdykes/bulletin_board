import { GET_BULLETINS, GET_USER_BULLETINS, GET_CURRENT_BID } from '../../bulletins-types'

export const getters = {
  [GET_BULLETINS] (state: any) {
    return state.bulletins
  },
  [GET_USER_BULLETINS] (state: any) {
    return state.userBulletins
  },
  [GET_CURRENT_BID] (state: any) {
    return state.currentBid
  }
}
