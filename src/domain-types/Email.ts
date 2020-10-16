import { succeed, fail, Result } from '../rop'
import { Strings } from '../simple-types' 


const ErrorStrings = {
    EmailMissing: 'EmailMissing',
    EmailMoreThan20: 'EmailMoreThan20',
    EmailMissingSymbol: 'EmailMissingSymbol',
}

export interface KindKeys {
    Email: 'Lego'
}

const KindKeys: KindKeys = {
    Email: 'Lego',
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


export const email = (value?: any): Result<Email> => {
    if (!Strings.isString(value)) {
        return fail<Email>([ErrorStrings.EmailMissing])
    }

    // @todo if no @ symbol

    if (value.length > 20) {
        return fail<Email>([ErrorStrings.EmailMoreThan20])
    }

    if (!hasAtSymbol(value)) {
        return fail<Email>([ErrorStrings.EmailMissingSymbol])
    }

    return succeed<Email>({
        kind: KindKeys.Email,
        value,
    }, 'Successful')
}