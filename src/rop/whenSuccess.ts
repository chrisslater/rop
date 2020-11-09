import { Result, MessageEnvelope } from './types'

import { either } from './either'

const failureFn = (input: { messages: MessageEnvelope[] }): MessageEnvelope[] => {
    return input.messages
}

// type SuccessFn = <In, Out>(fn: (value: In, messages: MessageEnvelope[]) => Out) => (value: In, messages: MessageEnvelope[]) => Out
// const successFn: SuccessFn = (fn) => (value, messages) => {
//     return fn(value, messages)
// }

export const whenSuccess = <In, Out>(fn: (input: { messages: MessageEnvelope[], value: In }) => Out) => (result: Result<In>): Result<Out> => {
    //const f = successFn(fn)

    return either<In, Out>(failureFn)(fn)(result)
}