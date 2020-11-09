import { Result } from '../types'
import { fail, isSuccess, isFail } from '../result'

export const flatten = <O>(result: Result<Result<O>>): Result<O> => {
	if (!(result && result.value)) {
        return fail<O>({ code: 'FlattenNotResult' })
    } else {
        return result.value
    }
}