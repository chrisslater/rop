import { Result, IFail, ISuccess } from './types'

import { either } from './either'
import { fail, succeed } from './result'

const failureFn = (value: string[]): string[] => {
    return value
}

type SuccessFn = <Out>(fn: <T>(value: T, messages: string[]) => Out) => <T>(value: T, messages: string[]) => Out 
const successFn: SuccessFn = (fn) => (value, messages) => { 
    return fn(value, messages)
}

export const s = <Out>(fn: <T>(value: T, messages: string[]) => Out) => <T>(result: Result<T>): Result<Out> => {
    const f = successFn(fn)

    return either<Out>(failureFn)(f)(result)
}