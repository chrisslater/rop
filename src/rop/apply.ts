import { Result, Func1 } from '../types';
import { isSuccess, isFail, succeed, fail } from '../result'


export const applyR =  <U>(successOrFail: Result<U>) => <T>(fn: Result<Func1<T, U>>): Result<T> => {
    if (isSuccess(fn) && isSuccess(successOrFail)) {
      return succeed(fn.value(successOrFail.value))
    } else if (isFail(fn) && isSuccess(successOrFail)) {
      return fail(fn.value);
    } else if (isSuccess(fn) && isFail(successOrFail)) {
      return fail(successOrFail.value);
    } else if (isFail(fn) && isFail(successOrFail)) {
      return fail(fn.value.concat(successOrFail.value))
    } else {
      // Won't drop in here but added to stop typescript blowing up
      return fail(['ROP_FAIL'])
    }
  }