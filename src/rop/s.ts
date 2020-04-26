import { Result, IFail, ISuccess } from './types'

import { either } from './either'
import { fail, succeed } from './result'

const failureFn = <Out>(value: string[]) => {
    return fail<Out>(value)
}

type SuccessFn = <T, Out>(fn: (value: T, messages: string[]) => Out) => (value: T, messages: string[]) => ISuccess<Out> 
const successFn: SuccessFn = (fn) => (value, messages) => { 
    const outValue = fn(value, messages)
    return succeed(outValue, messages)
}

export const s = <InValue, OutValue>(fn: (value: InValue, messages: string[]) => OutValue) => (result: Result<InValue>): Result<OutValue> => {
    const f = successFn(fn)

    return either<InValue, IFail<OutValue>, ISuccess<OutValue>>(failureFn)(f)(result)
}