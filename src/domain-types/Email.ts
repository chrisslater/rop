import { succeed, fail, Result } from '../rop'
import { Strings } from '../simple-types' 


const ErrorStrings = {
    EmailMissing: 'EmailMissing',
    EmailMoreThan20: 'EmailMoreThan20',
    EmailMissingSymbol: 'EmailMissingSymbol',
}

export interface KindKeys {
    Email: 'Email'
}

const KindKeys: KindKeys = {
    Email: 'Email',
}

export interface Email {
    kind: KindKeys['Email']
    value: string
}

const hasAtSymbol = (str: string): boolean =>
    str
        .split(',')
        .find((val) => val === '@') 
    ? true
    : false


export const email = (value?: any, id = 'Email'): Result<Email> => {
    if (!Strings.isString(value)) {
        return fail<Email>({ 
            code: ErrorStrings.EmailMissing,
            id,
            value, 
        })
    }

    if (value.length > 20) {
        return fail<Email>({ code: ErrorStrings.EmailMoreThan20, id })
    }

    if (!hasAtSymbol(value)) {
        return fail<Email>({ code: ErrorStrings.EmailMissingSymbol, id })
    }

    return succeed<Email>({
        kind: KindKeys.Email,
        value,
    })
}