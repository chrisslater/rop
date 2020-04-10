import * as R from 'ramda'
import * as Rop from '../rop'

const ErrorStrings = {
    Missing: 'Missing',
    MoreThan20: 'MoreThan20'
}

enum KindKey {
    String20 = 'String20',
    Profile = 'Profile',
    Email = 'Email',
}   

interface String20 {
    kind: KindKey,
    value: string
}

const isString = (str: any): str is string => typeof str === 'string' || str instanceof String

// const isString20 = (value?: any): value is String20 => value && value.kind && value.kind === KindKey.String20 || false

const string20 = (value?: any): Rop.Result<String20> => {
    if (!isString(value)) {
        return Rop.fail<String20>([ErrorStrings.Missing])
    }

    if (value.length > 20) {
        return Rop.fail<String20>([ErrorStrings.MoreThan20])
    }

    return Rop.succeed<String20>({
        kind: KindKey.String20,
        value,
    })
}

const email = (value?: any): Rop.Result<Email> => {
    if (!isString(value)) {
        return Rop.fail<Email>([ErrorStrings.Missing])
    }

    // @todo if no @ symbol

    // if (value.length > 20) {
    //     return Rop.fail<Email>([ErrorStrings.MoreThan20])
    // }

    return Rop.succeed<Email>({
        kind: KindKey.Email,
        value,
    }, 'Successful')
}

interface ProfileDto {
    name?: string
    email?: string
}

const database = [
    {
        email: 'simon@example.com'
    }
]

const dtos: ProfileDto[] = [
    {
        name: 'Chris',
        email: 'chris@example.com',
    },
    {
        name: 'Simon',
        email: 'simon@example.com',
    }
]

interface Email {
    kind: KindKey.Email
    value: string
}

interface Profile {
    kind: KindKey.Profile
    name: String20
    email: Email
}

const createProfile = (name: String20) => (email: Email): Profile => ({
    kind: KindKey.Profile,
    name,
    email,
})

const dtoToProfile = (dto: ProfileDto): Rop.Result<Profile> => {
    const nameOrFail = string20(dto.name)
    const emailOrFail = email(dto.email)

    return Rop.liftR2(nameOrFail)(emailOrFail)(createProfile)
}

const logFail = (fail: string[]): void => {
    console.log('fail', fail)

}

const logSuccess = <T>(success: T, messages: string[]): void => {
    console.log('success', success, messages)
}

const transformDtoToProfile = R.pipe(   
    dtoToProfile,
    Rop.failTree(logFail),
    Rop.successTree(logSuccess),
)

const filterUniqueEmails = R.pipe(
    R.filter(() => )
)

const fetchDtos = async () => dtos

const pipeline = R.pipe(
    R.map(transformDtoToProfile),
)

// filter success and errors seperately
pipeline(dtos)
    
