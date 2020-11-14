import { MessageEnvelope, Result } from '../types'
import { isSuccess, succeed, fail } from '../result'

export const asyncTryCatch = (catcher: (error: any) => MessageEnvelope) => <I, O>(tryer: (value: I) => Promise<O>) => async (result: Result<I>): Promise<Result<O>> => {
    if (isSuccess<I>(result)) {
        try {
            const t = await tryer(result.value)
            return succeed<O>(t, result.messages)
        } catch (error) {
            return fail<O>(catcher(error))
        }
    }

    return fail<O>(result.messages)
}

export const tryCatch = (catcher: (error: any) => MessageEnvelope) => <I, O>(tryer: (value: I) => O) => (result: Result<I>): Result<O> => {
    if (isSuccess<I>(result)) {
        try {
            const t = tryer(result.value)
            return succeed(t, result.messages)
        } catch (error) {
            return fail<O>(catcher(error))
        }
    }

    return fail<O>(result.messages)
}