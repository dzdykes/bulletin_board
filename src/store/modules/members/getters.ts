import { GET_MEMBERSHIP, GET_MEMBERS, GET_CURRENT_MID } from '@/store/member-types';

export const getters = {
  [GET_MEMBERS] (state: any) {
    return state.members
  },
  [GET_MEMBERSHIP] (state: any) {
    return state.memberShip
  },
  [GET_CURRENT_MID] (state: any) {
    return state.currentMID
  }
}
