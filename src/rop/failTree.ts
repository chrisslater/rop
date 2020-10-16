import { Result } from './types'
import { isFail } from './result'

export const failTree = (fn: <T>(value: string[]) => void) => <T>(result: Result<T>): Result<T> => {
    if (isFail(result)) {
        fn(result.value)
    }

    return result
}