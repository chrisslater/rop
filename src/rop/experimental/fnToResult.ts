import { Result } from '../types'
import { flatten } from './flatten'

export const fnToResult = <I, O>(fn: (v: I) => Result<O>) => (result: Result<I>): Result<O> => {
	const r = result.map(fn)
	return flatten(r)
}

export const toResult = fnToResult