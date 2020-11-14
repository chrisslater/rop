import { Result } from '../types'
import { toResult } from './fnToResult'

// export const toAsyncResult = <O>(fn: <I1>(input: I1) => O) => async <I>(result: Result<I>): Promise<Result<O>> => {
// 	return toResult<I, O>(fn)(result);
// }