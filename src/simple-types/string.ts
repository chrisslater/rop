import {
    Result,
    succeed,
    fail,
} from '../rop'

export interface String<Kind> {
    kind: Kind,
    id: string
    value: string
}

export type String10 = String<'String10'>
export type String20 = String<'String20'>
export type String30 = String<'String30'>
export type String40 = String<'String40'>
export type String50 = String<'String50'>

export const isString = (str: any): str is string => typeof str === 'string' || str instanceof String
export const createString = <Kind>({ kind, minLength = 0, maxLength }: { kind: Kind; minLength?: number; maxLength: number }) => ({ id }: { id: string }) => (value: any): Result<String<Kind>> => {

    if (value === undefined) {
        return fail<String<Kind>>({
            code: 'Missing',
            id,
            value,
        })
    }

    if (!isString(value)) {
        return fail<String<Kind>>({
            code: 'NotString',
            id,
            value,
        })
    }

    if (value.length === 0) {
        return fail<String<Kind>>({
            code: 'Empty',
            id,
            value,
        })
    }

    if (value.length < minLength) {
        return fail<String<Kind>>({
            code: `LessThan`,
            id,
            value,
            properties: {
                minLength,
            }
        })
    }

    if (value.length > maxLength) {
        return fail<String<Kind>>({
            code: `MoreThan`,
            id,
            value,
            properties: {
                maxLength,
            }
        })
    }

    return succeed<String<Kind>>({
        kind,
        id,
        value,
    })
}

export const createIsString = <Kind>({ kind }: { kind: Kind }) => (value?: any): value is Kind =>
    value &&
        value.kind &&
        value.kind === kind ||
        false

export const string10 = createString<'String10'>({ kind: 'String10', maxLength: 10 })
export const string20 = createString<'String20'>({ kind: 'String20', maxLength: 20 })
export const string30 = createString<'String30'>({ kind: 'String30', maxLength: 30 })
export const string40 = createString<'String40'>({ kind: 'String40', maxLength: 40 })
export const string50 = createString<'String50'>({ kind: 'String50', maxLength: 50 })

export const isString10 = createIsString<'String10'>({ kind: 'String10' })
export const isString20 = createIsString<'String20'>({ kind: 'String20' })
export const isString30 = createIsString<'String30'>({ kind: 'String30' })
export const isString40 = createIsString<'String40'>({ kind: 'String40' })
export const isString50 = createIsString<'String50'>({ kind: 'String50' })

// export const isString20 = (value?: any): value is String20 =>
//     value &&
//     value.kind &&
//     value.kind === KindKeys.String20 ||
//     false

// export const string20 = ({ id }: { id: string }) => (value: any): Result<String20> => {

//     if (value === undefined) {
//         return fail<String20>({
//             code: ErrorCodes.Missing,
//             id,
//             value,
//         })
//     }

//     if (!isString(value)) {
//         return fail<String20>({
//             code: ErrorCodes.Missing,
//             id,
//             value,
//         })
//     }

//     if (value.length === 0) {
//         return fail<String20>({
//             code: ErrorCodes.Empty,
//             id,
//             value,
//         })
//     }

//     if (value.length > 20) {
//         return fail<String20>({
//             code: ErrorCodes.MoreThan20,
//             id,
//             value,
//         })
//     }

//     return succeed<String20>({
//         kind: KindKeys.String20,
//         id,
//         value,
//     })
// }