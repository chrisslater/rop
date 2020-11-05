import { Result, ISuccess, IFail, MessageEnvelope } from './types'
import { isSuccess } from './result'

export const successTree = 
    <T>(fn: (value: T, messages: MessageEnvelope[]) => void) => 
    (result: ISuccess<T> | IFail<T>): ISuccess<T> | IFail<T> => { 
        if (isSuccess<T>(result)) {
            fn(result.value, result.messages)
            return result
        } else {
            return result
        }
    }