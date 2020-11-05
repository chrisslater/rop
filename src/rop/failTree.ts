import { Result, MessageEnvelope } from './types'
import { isFail } from './result'

export const failTree = (fn: (messages: MessageEnvelope[]) => void) => <T>(result: T): T => {
    if (isFail(result)) {
        fn(result.messages)
    }

    return result
}