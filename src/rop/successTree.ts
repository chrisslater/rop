import { Result } from './types'
import { isSuccess } from './result'

export const successTree = <T>(fn: (value: T, messages: string[]) => void) => (result: Result<T>): Result<T> => { 
    if (isSuccess(result)) {
        fn(result.value, result.messages)
    }

    return result
}