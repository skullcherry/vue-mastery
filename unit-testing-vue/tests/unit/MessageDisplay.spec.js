import MessageDisplay from '@/components/MessageDisplay.vue'
import { mount } from '@vue/test-utils'
import { getMessage } from '@/services/axios'
import flushPromises from 'flush-promises'

jest.mock('@/services/axios')
beforeEach(() => {
  jest.clearAllMocks()
})

describe('MessageDisplay', () => {
  it('Calls getMessage and displays the message', async () => {
    //mock API call
    const mockMessage = 'hello from the db!'
    getMessage.mockResolvedValueOnce({ text: mockMessage })

    const wrapper = mount(MessageDisplay)

    //wait for promise to resolve
    await flushPromises()

    //check that call happened once
    expect(getMessage).toHaveBeenCalledTimes(1)

    //check that component displays message
    const message = wrapper.find('[data-testid="message"]').element.textContent
    expect(message).toEqual(mockMessage)
  })

  it('displays an error when get Message call fails', async () => {
    //mock API call
    const mockError = 'Oops!'
    getMessage.mockRejectedValueOnce(mockError)

    const wrapper = mount(MessageDisplay)

    //wait for promise to resolve
    await flushPromises()

    //check that call happened once
    expect(getMessage).toHaveBeenCalledTimes(1)

    //check that component displays error
    const error = wrapper.find('[data-testid="message-error"]').element
      .textContent
    expect(error).toEqual(mockError)
  })
})
