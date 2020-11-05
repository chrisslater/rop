import { MatchMessage } from './types'
import { isFail } from './result'

export const matchMessage: MatchMessage = (messages) => (result) => {
    isFail(result) && result.messages.map((message) => {
        const identifier = `${message.id || ''}${message.code}`
        // messages && messages[message.code] && messages[message.code](message)
        messages && messages[identifier] && messages[identifier](message)
    })
}