import { Result, Func1 } from './types';
import { isSuccess, isFail, succeed, fail } from './result'


export const applyR =  <U>(successOrFail: Result<U>) => <T>(fn: Result<Func1<T, U>>): Result<T> => {
    if (isSuccess<Func1<T, U>>(fn) && isSuccess<U>(successOrFail)) {
      return succeed(fn.value(successOrFail.value))
    } else if (isFail<Func1<T, U>>(fn) && isSuccess<U>(successOrFail)) {
      return fail(fn.messages);
    } else if (isSuccess<Func1<T, U>>(fn) && isFail<U>(successOrFail)) {
      return fail(successOrFail.messages);
    } else if (isFail<Func1<T, U>>(fn) && isFail<U>(successOrFail)) {
      return fail(fn.messages.concat(successOrFail.messages))
    } else {
      // Won't drop in here but added to stop typescript blowing up
      return fail({ code: 'ROP_FAIL' })
    }
  }