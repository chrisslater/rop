import { Result, MessageEnvelope } from './types'
import { isSuccess, succeed, fail } from './result'

export const either = <In, Out>(failFn: (messages: MessageEnvelope[]) => MessageEnvelope[]) => (successFn: (value: In, messages: MessageEnvelope[]) => Out) => (result: Result<In>): Result<Out> => {
    if (isSuccess<In>(result)) {
        return succeed<Out>(successFn(result.value, result.messages))
    } else {
        return fail<Out>(failFn(result.messages))
    }
}