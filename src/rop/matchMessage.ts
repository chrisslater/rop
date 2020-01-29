import { MatchMessage } from './types'
import { isFail } from './result'

export const matchMessage: MatchMessage = (messages) => (result) => {
    isFail(result) && result.value.map((value) => {
        messages && messages[value] && messages[value]()
    })
}