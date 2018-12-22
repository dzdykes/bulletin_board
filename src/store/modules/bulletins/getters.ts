import { GET_BULLETINS } from '../../bulletins-types'

export const getters = {
  [GET_BULLETINS] (state: any) {
    return state.bulletins
  }
}