import { succeed, fail, valueOrElse } from '../rop'

const success1 = succeed('Hello')
const success2 = succeed('World')
const failed1 = fail<string>('sad')

const result = success1.flatten(success2)
const result2 = success1.flatten(failed1)

// Value or else
const successGetResult = success1.valueOrElse(() => 'Hello')

const successGetOrDefaultValue = valueOrElse(() => 'Default value')

const successfulGetResult2 = successGetOrDefaultValue(success1)
const defaultValue =  successGetOrDefaultValue(failed1)
