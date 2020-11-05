import { matchMessage } from './matchMessage'
import { fail } from './result'

const messages = {
    WithIdErrorMessage: jest.fn(),
    Error: jest.fn(),
    ErrorMessage: jest.fn(),
}

describe('matchMessage', () => {
    afterEach(() => {
        messages.Error.mockReset()
        messages.WithIdErrorMessage.mockReset()
        messages.ErrorMessage.mockReset()
    })

    describe('when a matching message is passed', () => {
        beforeEach(() => {
            matchMessage(messages)(fail({ code: 'ErrorMessage' }))
        })

        it('should not call WithIdError function', () => {
            expect(messages.WithIdErrorMessage).toBeCalledTimes(0)
        })

        it('should call ErrorMessage function', () => {
            expect(messages.ErrorMessage).toBeCalledTimes(1)
        })

        it('should call Error function', () => {
            expect(messages.Error).toBeCalledTimes(0)
        })
    })

    describe('when a matching message with `id` is passed', () => {
        beforeEach(() => {
            matchMessage(messages)(fail({ id: 'WithId', code: 'ErrorMessage' }))
        })

        it('should call WithIdError function', () => {
            expect(messages.WithIdErrorMessage).toBeCalledTimes(1)
        })

        it('should not call ErrorMessage function', () => {
            expect(messages.ErrorMessage).toBeCalledTimes(0)
        })

        it('should not call Error function', () => {
            expect(messages.Error).toBeCalledTimes(0)
        })
    })

    describe('when no matching error message is passed', () => {
        
        it.todo('should call generic Error function')
    })
})
