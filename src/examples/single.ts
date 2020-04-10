import { 
    Result,
    valueOrElse,
    succeed, 
    fail,
    liftR2,
    matchResult,
    matchResult2,
    matchMessage
} from '../rop'

import * as R from 'ramda'

const ErrorStrings = {
    Missing: 'Missing',
    MoreThan20: 'MoreThan20'
}

enum KindKey {
    String20 = 'String20',
    Lego = 'Lego',
}   

interface String20 {
    kind: KindKey,
    value: string
}

const isString = (str: any): str is string => typeof str === 'string' || str instanceof String

const isString20 = (value?: any): value is String20 => value && value.kind && value.kind === KindKey.String20 || false

const string20 = (value?: any): Result<String20> => {
    if (!isString(value)) {
        return fail<String20>([ErrorStrings.Missing])
    }

    if (value.length > 20) {
        return fail<String20>([ErrorStrings.MoreThan20])
    }

    return succeed<String20>({
        kind: KindKey.String20,
        value,
    })
}

interface LegoDto {
    id?: string
    name?: string
}

interface Lego {
    kind: KindKey.Lego
    id: string
    name: String20
}

const createLego = (id: string) => (name: String20): Lego => ({
    kind: KindKey.Lego,
    id,
    name,
})

const dtoToId = (id: any): Result<string> =>
    isString(id) ? succeed(id): fail([ErrorStrings.Missing])

const dtoToLego = (legoDto: LegoDto): Result<Lego> => {
    const idOrError = dtoToId(legoDto.id)
    const nameOrError = string20(legoDto.name)

    const res = liftR2(idOrError)(nameOrError)(createLego)

    return res
}

const successfulTransform = dtoToLego({ 
    id: 'abcdefg',
    name: 'Death Star'  
});

const failedTransform = dtoToLego({
    name: 'VERRRRRRRRRRRRRRRRYYYYYYYYYYYY BBIIIIIIIIIIGGGGGG Name'
});

const resultsAsArray = [successfulTransform, failedTransform]

const logErrors = (str: string[]) => { 
    str.map((v, k) => console.log(`error ${k + 1}`, v))
}

successfulTransform.matchResult({
    Success: (value) => { 
        console.log('successfulTransform from Class', value)
    },
    Fail: logErrors,
})

const success1 = succeed('Hello')
const success2 = succeed('World')

const result = success1.flatten(success2)

const successGetResult = successfulTransform.valueOrElse(() => 'Hello')
const failGetResult = failedTransform.flatten(successfulTransform)

const mapResult = R.map((value) => {
    console.log(value)
    return value
})

const teset = failedTransform.map((value) => { 
    return value
})

const handleMessages = matchMessage({
    'Missing': () => { 
        console.log('Missing the things') 
    },
    'MoreThan20': () => {
        console.log('More than 20!')
    },
})

handleMessages(failedTransform)

failedTransform.matchResult({
    Success: (value) => { 
        console.log('successfulTransform from Class', value)
    },
    Fail: logErrors,
})

matchResult(successfulTransform)({
    Success: (value) => {
        console.log('successfulTransform', value)
    },

    Fail: logErrors
})

const match = matchResult2<Lego>({
    Success: (value) => {
        console.log('matcherResult2 success', value)
    },
    Fail: logErrors,
})

resultsAsArray.map(match)



const resultOfGetOrElse = resultsAsArray.map(valueOrElse(() => 'Boo'))

