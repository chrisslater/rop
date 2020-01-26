import * as Rop from '../Result'

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

const string20 = (value?: any): Rop.Result<String20> => {
    if (!isString(value)) {
        return Rop.fail([ErrorStrings.Missing])
    }

    if (value.length > 20) {
        return Rop.fail([ErrorStrings.MoreThan20])
    }

    return Rop.succeed({
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

const dtoToLego = (legoDto: LegoDto): Rop.Result<Lego> => {
    const idOrError = isString(legoDto.id) ? Rop.succeed(legoDto.id): Rop.fail([ErrorStrings.Missing])
    const nameOrError = string20(legoDto.name)

    const res = Rop.liftR2(idOrError)(nameOrError)(createLego)

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

Rop.matchResult(successfulTransform)({
    Success: (value) => {
        console.log('successfulTransform', value)
    },

    Fail: logErrors
})

const match = Rop.matchResult2<Lego>({
    Success: (value) => {
        console.log('matcherResult2 success', value)
    },
    Fail: logErrors,
})

resultsAsArray.map(match)