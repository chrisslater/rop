import { fail, succeed, Success, Fail } from './result'
import { whenSuccess } from './whenSuccess'

describe('whenSuccess', () => {
    const successTreeFn = whenSuccess(() => {
        return 'foo'
    })

    describe('when a fail is passed', () => {
        it('should not run the function', () => {
            const mockFail = fail<string>({ code: 'hello'})
            const result = successTreeFn(mockFail)

            expect(result).toBeInstanceOf(Fail)
            expect(result.messages).toEqual([{ code: 'hello' }])
        })
    })

    describe('when a success is passed', () => {
        it('should run the function', () => {
            const mockSuccess = succeed<string>('hello')
            const result = successTreeFn(mockSuccess)

            expect(result).toBeInstanceOf(Success)
            expect(result.value).toEqual('foo')
        })
    })
})
