import LoginForm from '@/components/LoginForm.vue'
import { mount } from '@vue/test-utils'

describe('LoginForm', () => {
  it('emmits an event with a user data payload', () => {
    //find text input
    const wrapper = mount(LoginForm)
    const input = wrapper.find('[data-testid="name-input"]')

    //set value for text input
    input.setValue('Andreea Dan')
    //simulate form submission
    wrapper.trigger('submit')

    //assert event has been submitted
    const formSubmittedCalls = wrapper.emitted('formSubmitted')
    expect(formSubmittedCalls).toHaveLength(1)

    //assert payload is correct
    const expectedPayload = { name: 'Andreea Dan' }
    expect(wrapper.emitted('formSubmitted')[0][0]).toMatchObject(
      expectedPayload
    )
  })
})
