import { Result } from '../types'

export const toAsync = <I, O>(fn: (input: Result<I>) => O) => async (value: Promise<Result<I>>): Promise<O> => {
	return fn(await value)
}