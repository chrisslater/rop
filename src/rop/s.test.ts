import { fail, succeed, Success, Fail } from './result'
import { s } from './s'

describe('s', () => {
    const mockFn = jest.fn()
    const successTreeFn = s(mockFn)

    describe('when a fail is passed', () => {
        it('should not run the function', () => {
            const mockFail = fail<string>('hello')
            const result = successTreeFn(mockFail)

            expect(mockFn).toBeCalledTimes(0)
            expect(result).toBeInstanceOf(Fail)
            expect(result.value).toEqual(['hello'])
        })
    })

    describe('when a success is passed', () => {
        it('should run the function', () => {
            const mockSuccess = succeed<string>('hello')
            
            const result = successTreeFn(mockSuccess)

            expect(mockFn).toBeCalledTimes(1)
            expect(result).toBeInstanceOf(Success)
            expect(result.value).toEqual('hello')
        })
    })
})
