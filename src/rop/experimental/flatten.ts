import { Result } from '../types'
import { fail, isSuccess, isFail } from '../result'

const isResult = (val: any): boolean => isSuccess(val) || isFail(val)

// @todo Fix the ts-ignore lint issue
export const flatten = <O>(result: Result<Result<O>>): Result<O> => {

    if (isResult(result)) {
        if (isResult(result.value)) {
            // @ts-ignore
            return result.value
        } else {
            // @ts-ignore
            return result;
        }
    } else {
        return fail<O>({ code: 'FlattenNotResult' });
    }
}
