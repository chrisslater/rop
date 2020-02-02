import { Result, IFail, ISuccess } from './types'

import { either } from './either'
import { fail, succeed } from './result'


type FailureFn = <T>(value: string[]) => IFail<T>
type SuccessFn = <T>(fn: (value: T, messages: string[]) => void) => (value: T, messages: string[]) => ISuccess<T> 
// type SuccessTree = <T>(fn: (value: T) => void) => (result: Result<T>) => Result<T>

const failureFn: FailureFn = <T>(value: string[]) => {
    return fail<T>(value)
}
const successFn: SuccessFn = (fn) => (value, messages) => { 
    fn(value, messages)
    return succeed(value, messages)
}

export const successTree = <T>(fn: (value: T, messages: string[]) => void) => (result: Result<T>): Result<T> => {
    const f = successFn(fn)

    return either<T, IFail<T>, ISuccess<T>>(failureFn)(f)(result)
}