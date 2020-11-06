import { MessageEnvelope, Result } from './types'
import { isSuccess, isFail } from './result'

type Messages<ReturnValue> =  {
    [str: string]: (message: MessageEnvelope) => ReturnValue
    Default: () => ReturnValue
}

export const matchMessage = <ReturnValue>(messages: Messages<ReturnValue>) => <A>(result: Result<A>): ReturnValue  => {
    const message = result.messages && result.messages[0]
    console.log('message', message)
    const identifier = message && `${message.id || ''}${message.code}` || ''

    if (identifier in messages) {
        return messages[identifier](message)
    } else if (message && message.code in messages) {
        return messages[message.code](message)
    } else if (isSuccess(result) && 'Success' in messages) {
        return messages.Success(message)
    } else if (isFail(result) && 'Fail' in messages) {
        return messages.Fail(message)
    } else {
        return messages.Default()
    }
}