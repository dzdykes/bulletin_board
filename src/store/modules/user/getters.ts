import { GET_USER, GET_HASCREATEDUSER } from '../../user-types'

export const getters = {
  [GET_USER] (state: any) {
    return state.user
  },
  [GET_HASCREATEDUSER] (state: any) {
    return state.hasCreatedUser
  }
}
