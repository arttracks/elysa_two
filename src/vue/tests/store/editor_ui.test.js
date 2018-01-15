import { mutations } from '../../store/modules/editor_ui.js'
import * as types from '../../store/mutation-types.js'

const { increment } = mutations

describe('Editor UI state mutations', () => {
  it('toggles help', () => {
    const state = {helpShown: false}
    mutations[types.TOGGLE_HELP](state)
    expect(state.helpShown).toBeTruthy()
  })
})