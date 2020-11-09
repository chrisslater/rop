import { Result, MessageEnvelope } from './types'
import { isSuccess, succeed, fail } from './result'

export const either = <In, Out>(failFn: (input: { messages: MessageEnvelope[] }) => MessageEnvelope[]) => (successFn: (input: { messages: MessageEnvelope[], value: In }) => Out) => (result: Result<In>): Result<Out> => {
    if (isSuccess<In>(result)) {
        return succeed<Out>(successFn({ messages: result.messages, value: result.value }))
    } else {
        return fail<Out>(failFn({ messages: result.messages }))
    }
}