import { succeed } from  './result'
import { either } from './either'
import { mockFail } from './__mocks__'

describe('either', () => {
    const successFn = jest.fn()
    const failFn = jest.fn()

    beforeEach(() => {
        successFn.mockReset()
        failFn.mockReset()
    })

    it('should call success branch if success', () => {
        const success = succeed('foo')
        successFn.mockReturnValue('fighters')
        const result = either(failFn)(successFn)(success)
        expect(successFn).toBeCalledTimes(1)
        expect(failFn).toBeCalledTimes(0)
        expect(result.value).toEqual('fighters')
    })

    it('should call fail branch if fail', () => {
        failFn.mockReturnValue({ code: 'GoodTimes' })
        const result = either(failFn)(successFn)(mockFail)

        expect(successFn).toBeCalledTimes(0)
        expect(failFn).toBeCalledTimes(1)
        expect(result.messages[0]).toEqual({ code: 'GoodTimes' })
    })
})
