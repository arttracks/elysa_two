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
        updateEntity: entityFunction
      }
    };
    wrapper = mount(EditorPerson, opts);
  });
  it("Is a vue component", () => {
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
      let updateFunct = wrapper.vm.wrappedUpdate("name");
      expect(entityFunction).lastCalledWith("tester.name");
    });
  });
});
