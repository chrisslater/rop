import { Result } from './types'
import { isSuccess, isFail, fail } from './result'

type FailEitherFn<O> = (messages: string[]) => O
type SuccessEitherFn = <I>(value: I, messages: string[]) => any
type Either = <TFn>(failFn: FailEitherFn<TFn>) => (successFn: SuccessEitherFn) => <T, TFail, TSuccess>(result: Result<T>) =>  TSuccess | TFail

export const either: Either = (failFn) => (successFn) => (result) => {
    if (isSuccess(result)) {
        return successFn(result.value, result.messages)
    }

    if (isFail(result)) {
        return failFn(result.value)
    }

    return fail('EitherUndefined')
}