import { Result } from './types'
import { isSuccess } from './result'

export const valueOrElse = <A>(other: () => A) => <T>(successOrFail: Result<T>): T | A => 
  (isSuccess<A>(successOrFail)) ? successOrFail.value : other()