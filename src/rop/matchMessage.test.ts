import { matchMessage } from './matchMessage'
import { fail } from './result'

const messages = {
    ErrorMessage: jest.fn(),
}

describe('matchMessage', () => {
    afterEach(() => {
        messages.ErrorMessage.mockReset()
    })

    describe('when a matching message is passed', () => {
        beforeEach(() => {
            matchMessage(messages)(fail({ code: 'ErrorMessage' }))
        })

        it('should call function', () => {
            expect(messages.ErrorMessage).toBeCalled()
        })
    })

    describe('when a matching message is passed', () => {
        beforeEach(() => {
            matchMessage(messages)(fail({ code: 'Error' }))
        })

        it('should call function', () => {
            expect(messages.ErrorMessage).toBeCalledTimes(0)
        })
    })
})
