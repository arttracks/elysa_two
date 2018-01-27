import { mount } from "@vue/test-utils";
import EntityLookup from "../components/EntityLookup.vue";

describe("EntityLookup.vue", () => {
  it("Is a vue component", () => {
    const wrapper = mount(EntityLookup);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  describe("Input text", () => {
    it("has a value property", () => {
      const wrapper = mount(EntityLookup);
      wrapper.setProps({ entityText: "sample text" });
      expect(wrapper.props().entityText).toBe("sample text");
    });
  });

  describe("Certainty controls", () => {
    let wrapper = null;
    beforeEach(() => {
      wrapper = mount(EntityLookup);
      wrapper.setProps({
        setter: val => {
          // console.log(val);
          wrapper.setProps({ value: val });
        }
      });
    });

    it("defaults to enabling certainy controls ", () => {
      expect(wrapper.props().certaintyEnabled).toBeTruthy();
      expect(wrapper.contains(".certainty-button")).toBe(true);
    });

    it("can be set uncertain ", () => {
      wrapper.setProps({ certaintyEnabled: false });
      expect(wrapper.props().certaintyEnabled).toBeFalsy();
      expect(wrapper.contains(".certainty-button")).toBe(false);
    });

    it("has a certainty property", () => {
      wrapper.setProps({ certain: true });
      expect(wrapper.vm.isCertain).toBe(true);
    });

    it("certainty inactivates the button", () => {
      let button = wrapper.find(".certainty-button");
      wrapper.setData({ isCertain: true });
      expect(button.classes()).toContain("inactive");
    });

    it("uncertainty activates the button", () => {
      let button = wrapper.find(".certainty-button");
      wrapper.setProps({ value: { string: "", uri: "", certainty: false } });
      expect(button.classes()).not.toContain("inactive");
    });

    it("ending the input text with w/a ? sets uncertainty", () => {
      wrapper.setProps({ value: { string: "", uri: "", certainty: true } });
      let el = wrapper.find(".entity-text");
      el.element.value = "I am uncertain?";
      el.trigger("input");
      expect(wrapper.vm.isCertain).toBe(false);
    });

    it("adding a second question mark toggles", () => {
      wrapper.setProps({
        value: { string: "I am uncertain?", uri: "", certainty: false }
      });
      let el = wrapper.find(".entity-text");
      el.element.value = "I am uncertain??";
      el.trigger("input");
      expect(wrapper.vm.isCertain).toBe(true);
      expect(wrapper.vm.entityText).toBe("I am uncertain");
    });

    it("ending the input text with w/o a ? sets certainty", () => {
      wrapper.setData({ isCertain: false });
      wrapper.setData({ entityText: "certain text" });
      expect(wrapper.vm.isCertain).toBe(true);
    });

    it("clicking the certainty button changes certainty", () => {
      wrapper.setProps({ value: { string: "text", uri: "", certainty: true } });
      expect(wrapper.vm.entityText).toBe("text");
      wrapper.find(".certainty-button .button").trigger("click");
      expect(wrapper.vm.entityText).toBe("text?");
      expect(wrapper.vm.isCertain).toBe(false);
    });

    it("clicking the certainty button changes certainty", () => {
      wrapper.setProps({
        value: { string: "text", uri: "", certainty: false }
      });
      expect(wrapper.vm.entityText).toBe("text?");
      wrapper.find(".certainty-button .button").trigger("click");
      expect(wrapper.vm.entityText).toBe("text");
      expect(wrapper.vm.isCertain).toBe(true);
    });

    it("clicking the certainty button without text does nothing", () => {
      wrapper.setData({ entityText: "", isCertain: true });
      wrapper.find(".certainty-button .button").trigger("click");
      expect(wrapper.vm.entityText).toBe("");
      expect(wrapper.vm.isCertain).toBe(true);
    });
  });
});
