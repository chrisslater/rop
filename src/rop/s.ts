import { Result, MessageEnvelope } from './types'

import { either } from './either'

const failureFn = (value: MessageEnvelope[]): MessageEnvelope[] => {
    return value
}

type SuccessFn = <In, Out>(fn: (value: In, messages: MessageEnvelope[]) => Out) => (value: In, messages: MessageEnvelope[]) => Out 
const successFn: SuccessFn = (fn) => (value, messages) => { 
    return fn(value, messages)
}

export const s = <In, Out>(fn: (value: In, messages: MessageEnvelope[]) => Out) => (result: Result<In>): Result<Out> => {
    //const f = successFn(fn)

    return either<In, Out>(failureFn)(fn)(result)
}