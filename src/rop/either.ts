import { Result } from './types'
import { isSuccess, isFail, fail } from './result'

type FailEitherFn<O> = (messages: string[]) => O
type SuccessEitherFn<I, O> = (value: I, messages: string[]) => O
type Either = <T, TFail, TSuccess>(failFn: FailEitherFn<TFail>) => (successFn: SuccessEitherFn<T, TSuccess>) => (result: Result<T>) =>  TSuccess | TFail

export const either: Either = (failFn) => (successFn) => (result) => {
    if (isSuccess(result)) {
        return successFn(result.value, result.messages)
    }

    return failFn(result.value)
}