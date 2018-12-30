import {
  GET_BULLETINS,
  GET_USER_BULLETINS,
  GET_CURRENT_BID,
  GET_BULLETIN_POSTS,
  GET_CURRENT_BPID,
  GET_CURRENT_BULLETIN
} from '../../bulletins-types'

export const getters = {
  [GET_BULLETINS] (state: any) {
    return state.bulletins
  },
  [GET_USER_BULLETINS] (state: any) {
    return state.userBulletins
  },
  [GET_CURRENT_BID] (state: any) {
    return state.currentBid
  },
  [GET_BULLETIN_POSTS] (state: any) {
    return state.bulletinPosts
  },
  [GET_CURRENT_BPID] (state: any) {
    return state.currentBPid
  },
  [GET_CURRENT_BULLETIN] (state: any) {
    return state.currentBulletin
  }
}
