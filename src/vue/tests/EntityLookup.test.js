import { mount } from '@vue/test-utils'
import EntityLookup from '../components/EntityLookup.vue'

describe('EntityLookup.vue', () => {
  it('Is a vue component', () => {
    const wrapper = mount(EntityLookup)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  
  describe ("Input text", () => {
    it('has a value property', () => {
      const wrapper = mount(EntityLookup)
      wrapper.setProps({ entityText: "sample text" })
      expect(wrapper.props().entityText).toBe("sample text")
    })

  })  

  describe ("Certainty controls", () => {
    
    it('defaults to enabling certainy controls ', () => {
      const wrapper = mount(EntityLookup)
      expect(wrapper.props().certaintyEnabled).toBeTruthy()
      expect(wrapper.contains('.certainty-button')).toBe(true)
    })
    
    it('can be set uncertain ', () => {
      const opts = {propsData: {certaintyEnabled: false}}
      const wrapper = mount(EntityLookup, opts)
      expect(wrapper.props().certaintyEnabled).toBeFalsy();
      expect(wrapper.contains('.certainty-button')).toBe(false)
    })
    
    it('has a certainty property', () => {
      const wrapper = mount(EntityLookup)
      wrapper.setData({ isCertain: true })
      expect(wrapper.vm.isCertain).toBe(true)
    })

    it('certainty inactivates the button', () => {
      const wrapper = mount(EntityLookup)
      let button = wrapper.find(".certainty-button")
      wrapper.setData({ isCertain: true })
      expect(button.classes()).toContain('inactive')
    })

    it('uncertainty activates the button', () => {
      const wrapper = mount(EntityLookup)
      let button = wrapper.find(".certainty-button")
      wrapper.setData({ isCertain: false })
      expect(button.classes()).not.toContain('inactive')
    })

    it('ending the input text with w/a ? sets uncertainty', () => {
      const wrapper = mount(EntityLookup)
      wrapper.setData({ isCertain: true })
      wrapper.setData({ entityText: "uncertain text?" })
      expect(wrapper.vm.isCertain).toBe(false)
    })

    it('ending the input text with w/o a ? sets certainty', () => {
      const wrapper = mount(EntityLookup)
      wrapper.setData({ isCertain: false })
      wrapper.setData({ entityText: "certain text" })
      expect(wrapper.vm.isCertain).toBe(true)
    })

    it('clicking the certainty button changes certainty', () => {
      const wrapper = mount(EntityLookup)
      wrapper.setData({ entityText: "text" })
      wrapper.find('.certainty-button .button').trigger('click')
      expect(wrapper.vm.entityText).toBe("text?")
      expect(wrapper.vm.isCertain).toBe(false)
    })
    
    it('clicking the certainty button changes certainty', () => {
      const wrapper = mount(EntityLookup)
      wrapper.setData({ entityText: "text?", isCertain: false })
      wrapper.find('.certainty-button .button').trigger('click')
      expect(wrapper.vm.entityText).toBe("text")
      expect(wrapper.vm.isCertain).toBe(true)
    })

    it('clicking the certainty button without text does nothing', () => {
      const wrapper = mount(EntityLookup)
      wrapper.setData({ entityText: "", isCertain: true })
      wrapper.find('.certainty-button .button').trigger('click')
      expect(wrapper.vm.entityText).toBe("")
      expect(wrapper.vm.isCertain).toBe(true)
    })


  })
})