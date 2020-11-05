import { MatchMessage } from './types'
import { isFail } from './result'

export const matchMessage: MatchMessage = (messages) => (result) => {
    isFail(result) && result.messages.map((message) => {
        messages && messages[message.code] && messages[message.code](message)
    })
}