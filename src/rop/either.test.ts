import { succeed, fail } from  './result'
import { either } from './either'

describe('either', () => {
    const successFn = jest.fn()
    const failFn = jest.fn()

    const eitherFn = either(failFn)(successFn)


    beforeEach(() => {
        successFn.mockReset()
        failFn.mockReset()
    })

    it('should call success branch if success', () => {
        const success = succeed('blah')
        eitherFn(success)
        expect(successFn).toBeCalledTimes(1)
        expect(failFn).toBeCalledTimes(0)
    })

    it('should call success branch if success', () => {
        const f = fail('blah')
        eitherFn(f)
        expect(successFn).toBeCalledTimes(0)
        expect(failFn).toBeCalledTimes(1)
    })
})
