import { MessageEnvelope, Result } from './types'
import { isSuccess, isFail } from './result'

export type Messages<ResultValue, ReturnValue> =  {
    [str: string]: (input: { value: ResultValue | undefined; message: MessageEnvelope }) => ReturnValue
    Default: (input: { value: ResultValue | undefined; message: MessageEnvelope }) => ReturnValue
}

export const matchMessage = <ResultValue, ReturnValue>(messages: Messages<ResultValue, ReturnValue>) => (result: Result<ResultValue>): ReturnValue  => {
    const message = result.messages && result.messages[0]
    const identifier = message && `${message.id || ''}${message.code}` || ''

    if (identifier in messages) {
        return messages[identifier]({ value: result.value, message })
    } else if (message && message.code in messages) {
        return messages[message.code]({ value: result.value, message })
    } else if (isSuccess(result) && 'Success' in messages) {
        return messages.Success({ value: result.value, message })
    } else if (isFail(result) && 'Fail' in messages) {
        return messages.Fail({ value: result.value, message })
    } else {
        return messages.Default({ value: result.value, message })
    }
}