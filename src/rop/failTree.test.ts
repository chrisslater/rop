import { fail, succeed, Success, Fail } from './result'
import { failTree } from './failTree'

describe('failTree', () => {
    const mockFn = jest.fn()
    const failTreeFn = failTree(mockFn)

    describe('when a fail is passed', () => {
        it('should run the function', () => {
            const mockFail = fail<string>('hello')
            const result = failTreeFn(mockFail)
            expect(result).toBeInstanceOf(Fail)
            expect(result.value).toEqual(['hello'])
        })
    })

    describe('when a success is passed', () => {
        it('should not run the function', () => {
            const mockSuccess = succeed<string>('hello')
            const result = failTreeFn(mockSuccess)
            expect(result).toBeInstanceOf(Success)
            expect(result.value).toEqual('hello')
        })
    })
})