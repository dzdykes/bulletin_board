import { SET_MEMBERS, SET_MEMBERSHIP, SET_CURRENT_MID } from '../../member-types';

export const mutations = {
  [SET_MEMBERS] (state: any, members: any) {
    state.members = members
  },
  [SET_MEMBERSHIP] (state: any, membership: any) {
    state.membership = membership
    state.currentMID = membership.id
  },
  [SET_CURRENT_MID] (state: any, id: string) {
    state.currentMID = id
  }
}
