import {
  SET_BULLETINS,
  SET_USER_BULLETINS,
  SET_CURRENT_BID,
  SET_BULLETIN_POSTS,
  SET_CURRENT_BPID,
  SET_CURRENT_BULLETIN
} from '../../bulletins-types'

export const mutations = {
  [SET_BULLETINS] (state: any, bulletins: any) {
    state.bulletins = bulletins
  },
  [SET_USER_BULLETINS] (state: any, bulletins: any) {
    state.userBulletins = bulletins
  },
  [SET_CURRENT_BID] (state: any, bid: any) {
    state.currentBid = bid
  },
  [SET_BULLETIN_POSTS] (state: any, bulletinPosts: any) {
    state.bulletinPosts = bulletinPosts
  },
  [SET_CURRENT_BULLETIN] (state: any, bulletin: any) {
    state.currentBulletin = { ...bulletin, viewing: true }
  },
  [SET_CURRENT_BPID] (state: any, id: string) {
    state.currentBPID = id
  }
}
