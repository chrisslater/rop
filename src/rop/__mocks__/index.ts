import { fail } from '../result'

export const failMessage = { code: 'MockFail' }
export const mockFail = fail<string>(failMessage)
