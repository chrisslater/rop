import {  Result } from './types'

// export type MatchMessage = <ExtraMessages, ReturnValue = void>(messages: Messages<ExtraMessages, ReturnValue>) => <A>(result: Result<A>) => ReturnValue

type Messages<ExtraMessages, ReturnValue> = ExtraMessages & {
    // [str: string]: (message: MessageEnvelope) => ReturnValue
    Default: () => ReturnValue
}


export const matchMessage= <ExtraMessages, ReturnValue>(messages: Messages<ExtraMessages, ReturnValue>) => <A>(result: Result<A>): ReturnValue  => {
    const message = result.messages && result.messages[0] || { code: 'Default' }
    const identifier = `${message.id || ''}${message.code}`
    return messages[identifier](message)
}