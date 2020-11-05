import { Result, Matcher } from './types'
import { isSuccess, isFail } from './result'

export const matchResult = <T>(successOrFail: Result<T>) => (matchers: Matcher<T>): void => {
    isSuccess<T>(successOrFail) && matchers.Success(successOrFail.value)
    isFail<T>(successOrFail) && matchers.Fail(successOrFail.messages)
}
  
export const matchResult2 = <T>(matchers: Matcher<T>) => (successOrFail: Result<T>): void => {
    isSuccess<T>(successOrFail) && matchers.Success(successOrFail.value)
    isFail<T>(successOrFail) && matchers.Fail(successOrFail.messages)
}