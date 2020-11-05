import { 
    Result,
    succeed, 
    fail,
} from '../rop'

interface KindKeys {
    String20: 'String20'
}

export const ErrorCodes = {
    Missing: 'Missing',
    MoreThan20: 'MoreThan20'
}

export const KindKeys: KindKeys = {
    String20: 'String20'
}

export interface String20 {
    kind: KindKeys['String20'],
    id: string
    value: string
}

export const isString = (str: any): str is string => typeof str === 'string' || str instanceof String

export const isString20 = (value?: any): value is String20 => 
    value && 
    value.kind && 
    value.kind === KindKeys.String20 || 
    false

export const string20 = (value?: any, id: string = 'String20'): Result<String20> => {
    if (!isString(value)) {
        return fail<String20>({
            code: ErrorCodes.Missing,
            id,
            value,
        })
    }

    if (value.length > 20) {
        return fail<String20>({ 
            code: ErrorCodes.MoreThan20, 
            id, 
            value, 
        })
    }

    return succeed<String20>({
        kind: KindKeys.String20,
        id,
        value,
    })
}