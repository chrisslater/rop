import { Result } from '../types'
import { succeed } from '../result'
import { toAsync } from './toAsync'

describe('asyncWrap', () => {
    describe('', () => {
        it.skip('should', () => {
            const test = (a: Result<string>): string => {
                return 'foo'
            }



            const meh = toAsync(test)(Promise.resolve(succeed('hello')))
        })
    })
})