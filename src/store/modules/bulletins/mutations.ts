import { SET_BULLETINS } from '../../bulletins-types'

export const mutations = {
  [SET_BULLETINS] (state: any, bulletins: any) {
    state.bulletins = bulletins
  }
}
