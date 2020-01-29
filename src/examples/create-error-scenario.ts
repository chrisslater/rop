import { 
    Result,
    succeed, 
    fail,
    liftR2,
} from '../rop'

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

// const isString20 = (value?: any): value is String20 => value && value.kind && value.kind === KindKey.String20 || false

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

export const failedTransform = dtoToLego({
    id: 'valid-id',
    name: 'VERRRRRRRRRRRRRRRRYYYYYYYYYYYY BBIIIIIIIIIIGGGGGG Name'
});