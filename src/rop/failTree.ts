import { Result, IFail, ISuccess } from './types'

import { either } from './either'
import { fail, succeed } from './result'


type FailureFn = (fn: (value: string[]) => void) => <T>(value: string[]) => IFail<T>
type SuccessFn = <T>(value: T, messages: string[]) => ISuccess<T> 
type FailTree = (fn: (value: string[]) => void) => <T>(result: Result<T>) => Result<T>

const failureFn: FailureFn = (fn: (value: string[]) => void) => <T>(value: string[]): IFail<T> => {
    fn(value)

    return fail<T>(value)
}
const successFn: SuccessFn = (value, messages) => succeed(value, messages)

export const failTree: FailTree = (fn) => (result) => {
    const f = failureFn(fn)

    return either(f)(successFn)(result)
}