import { SET_USER, SET_HASCREATEDUSER } from '../../user-types'

export const mutations = {
  [SET_USER] (state: any, user: any) {
    localStorage.setItem('bulletin_board_user', JSON.stringify(user));
    state.user = user
  },
  [SET_HASCREATEDUSER] (state: any, hasCreatedUser: boolean) {
    state.hasCreatedUser = hasCreatedUser
  }
}
