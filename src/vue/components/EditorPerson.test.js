import { mount } from "@vue/test-utils";
import EditorPerson from "../components/EditorPerson.vue";

describe("EditorPerson.vue", () => {
  let opts = null;
  let entityFunction = null;
  let wrapper = null;
  beforeEach(() => {
    entityFunction = jest.fn().mockName("entityFunction");
    opts = {
      propsData: {
        person: {
          name: {
            string: "Bob",
            uri: "http://example.com/bob",
            certainty: true
          },
          birth: "1910-uu-uu",
          death: "1980-uu-uu"
        },
        personField: "tester",
        updateEntity: entityFunction,
        label: "Tester"
      }
    };
    wrapper = mount(EditorPerson, opts);
  });
  it("Is a vue component", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("handles undefined person data", () => {
    wrapper.setProps({
      person: null,
      personField: "tester",
      updateEntity: entityFunction,
      label: "Tester"
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  describe("Appearance", () => {
    it("has the standard sections", () => {
      expect(wrapper.contains(".life-dates")).toBe(true);
      expect(wrapper.contains(".associated-place")).toBe(true);
      expect(wrapper.contains(".related-person")).toBe(true);
      expect(wrapper.contains(".person-name")).toBe(true);
    });
    it("hides most sections if the person name is blank", () => {
      wrapper.setProps({
        person: {
          name: {
            string: ""
          }
        }
      });
      expect(wrapper.contains(".person-name")).toBe(true);
      expect(wrapper.contains(".life-dates")).toBe(false);
      expect(wrapper.contains(".associated-place")).toBe(false);
      expect(wrapper.contains(".related-person")).toBe(false);
    });
    it("by default shows the standard help text", () => {
      expect(wrapper.find(".person-name .help").text()).toBe(
        "The verbatim name of the tester."
      );
    });
    it("by renders custom help text", () => {
      wrapper.setProps({ help: "help text" });
      expect(wrapper.find(".person-name .help").text()).toBe("help text");
    });
    it("hides most the related section if showRelated is false", () => {
      wrapper.setProps({ noRelated: true });
      expect(wrapper.contains(".related-person")).toBe(false);
    });

    it("displays birth and death years", () => {
      expect(wrapper.find(".birth-year").element.value).toBe("1910");
      expect(wrapper.find(".death-year").element.value).toBe("1980");
    });
  });

  describe("Updates", () => {
    it("updates birth dates", () => {
      const updateFunction = jest.fn();
      entityFunction.mockReturnValueOnce(updateFunction);
      let el = wrapper.find(".birth-year");
      el.element.value = "1600";
      el.trigger("input");
      expect(updateFunction).lastCalledWith("1600-XX-XX");
    });
    it("updates death dates", () => {
      const updateFunction = jest.fn();
      entityFunction.mockReturnValueOnce(updateFunction);
      let el = wrapper.find(".death-year");
      el.element.value = "1600";
      el.trigger("input");
      expect(updateFunction).lastCalledWith("1600-XX-XX");
    });
  });

  describe("computed properties", () => {
    it("extracts years", () => {
      expect(wrapper.vm.birthYear).toBe(1910);
      expect(wrapper.vm.deathYear).toBe(1980);
    });
    it("lowercases the label", () => {
      expect(wrapper.vm.lowercaseLabel).toBe("tester");
    });
    it("does nothing with blank labels", () => {
      wrapper.setProps({ label: undefined });
      expect(wrapper.vm.lowercaseLabel).toBe(undefined);
    });
    it("returns null if there is no year", () => {
      wrapper.setProps({
        person: {
          name: {
            string: "Bob"
          }
        }
      });
      expect(wrapper.vm.birthYear).toBeNull();
      expect(wrapper.vm.deathYear).toBeNull();
    });
  });

  describe("methods", () => {
    it("wraps the input function", () => {
      wrapper.vm.wrappedUpdate("name");
      expect(entityFunction).lastCalledWith("tester.name");
    });
  });
});
