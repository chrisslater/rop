import { asyncTryCatch } from './asyncTryCatch'

describe('asyncTryCatch', () => {
    describe('', () => {
        it.skip('should', () => {
            const test = async (a: string): Promise<string> => {
                return 'foo'
            }

            asyncTryCatch(() => ({ code: 'Save'}))(test)
        })
    })
})