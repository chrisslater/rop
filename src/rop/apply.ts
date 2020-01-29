import { Result, Func1 } from './types';
import { isSuccess, isFail, succeed, fail } from './result'


export const applyR =  <U>(successOrFail: Result<U>) => <T>(fn: Result<Func1<T, U>>): Result<T> => {
    if (isSuccess<Func1<T, U>>(fn) && isSuccess<U>(successOrFail)) {
      return succeed(fn.value(successOrFail.value))
    } else if (isFail<Func1<T, U>>(fn) && isSuccess<U>(successOrFail)) {
      return fail(fn.value);
    } else if (isSuccess<Func1<T, U>>(fn) && isFail<U>(successOrFail)) {
      return fail(successOrFail.value);
    } else if (isFail<Func1<T, U>>(fn) && isFail<U>(successOrFail)) {
      return fail(fn.value.concat(successOrFail.value))
    } else {
      // Won't drop in here but added to stop typescript blowing up
      return fail(['ROP_FAIL'])
    }
  }