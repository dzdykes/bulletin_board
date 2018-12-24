import { SET_BULLETINS, SET_USER_BULLETINS, SET_CURRENT_BID } from '../../bulletins-types'

export const mutations = {
  [SET_BULLETINS] (state: any, bulletins: any) {
    state.bulletins = bulletins
  },
  [SET_USER_BULLETINS] (state: any, bulletins: any) {
    state.userBulletins = bulletins
  },
  [SET_CURRENT_BID] (state: any, bid: string) {
    state.currentBid = bid
  }
}
