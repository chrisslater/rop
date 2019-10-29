import Rop, { RopResult, isSuccess } from '../Result'

enum ErrorStrings {
    Missing = 'Missing',
    MoreThan20 = 'MoreThan20'
}

enum KindKeys {
    String20 = 'String20',
    Lego = 'Lego'
}

interface String20 {
    kind: KindKeys.String20
    value: string
}

const isString = (str: any): str is string => typeof str === 'string' || str instanceof String

const string20 = (value?: string): RopResult<String20> => {
    if (!isString(value)) {
        return Rop.fail(ErrorStrings.Missing)
    }

    if (value.length > 21) {
        return Rop.fail(ErrorStrings.MoreThan20)
    }
    
    return Rop.succeed({
        kind: KindKeys.String20,
        value,
    })
}

interface LegoDto {
    id?: string
    name?: string
}

interface Lego {
    kind: KindKeys.Lego
    id: string
    name: String20
}

const createLego = (id: string) => (name: String20): Lego => ({
    kind: KindKeys.Lego,
    id,
    name,
})

const dtoToLego = (legoDto: LegoDto): RopResult<Lego> => {
    const idOrError = isString(legoDto.id) ? Rop.succeed(legoDto.id): Rop.fail(ErrorStrings.Missing)
    const string20OrError = string20(legoDto.name)


    const res = Rop.lift2R(createLego)(idOrError)(string20OrError)

    return res
}

interface MatchWith<T> {
    Success: (value: T) => any
    Error: (errors: string[]) => any
}

const matchWith = <T>(matches: MatchWith<T>) => (result: RopResult<T>) => {
    return (isSuccess(result)) ? matches.Success(result.value) : matches.Error(result.value)
}

const getOrElse = <X,T>(other: X) => (result: RopResult<T>) => isSuccess(result) ? result.value : other

const wrap = <T>(result: RopResult<T>) => {
    return {
        matchWith: (matches: MatchWith<T>) => matchWith<T>(matches)(result),
        getOrElse: <X>(other: X) => getOrElse<X,T>(other)(result) 
    }
}



const legoDeathStar = dtoToLego({ id: 'abcdefg', name: 'Death Star000000000000000000' })

// const result = legoDeathStar.matchWith({
//     Success: (lego: string) => lego,
//     Error: (errors) => errors
//     // Error: (err) => {}
// })

const result = legoDeathStar.matchWith((lego) => lego, (str) => str)
console.log(result)

// wrap<Lego>(legoDeathStar).matchWith({
//     Success: (lego) => { console.log('success', lego) },
//     Error: (errs) => { console.log('errors', errs) }
// })

// matchWith({
//     Success: (lego) => { console.log('success', lego) },
//     Error: (errs) => { console.log('errors', errs) },

// })(legoDeathStar)

// const result = matchWith({
//     Success: (lego) => lego,
//     Error: (_) => 'W00t'
// })(legoDeathStar)


// const result2 = wrap(legoDeathStar).getOrElse('NOOOOO')
// console.log('result2', result2)
