import { mutations } from "../../store/modules/editorInterface.js";
import * as types from "../../store/mutation-types.js";

describe("Editor UI state mutations", () => {
  it("toggles help", () => {
    const state = { helpShown: false };
    mutations[types.TOGGLE_HELP](state);
    expect(state.helpShown).toBeTruthy();
  });

  it("sets active periods", () => {
    const state = { activePeriod: 0 };
    mutations[types.SET_ACTIVE_PERIOD](state, 1);
    expect(state.activePeriod).toBe(1);
  });
});
