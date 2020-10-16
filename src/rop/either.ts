import { Result } from './types'
import { isSuccess, succeed, fail } from './result'

export const either = <Out>(failFn: (messages: string[]) => string[]) => (successFn: <I>(value: I, messages: string[]) => Out) => <I>(result: Result<I>): Result<Out> => {
    if (isSuccess(result)) {
        return succeed(successFn(result.value, result.messages))
    } else {
        return fail<Out>(failFn(result.value))
    }
}