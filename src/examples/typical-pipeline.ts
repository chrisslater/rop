import * as R from 'ramda'
import * as Rop from '../rop'

import { Profile } from '../domain-types'

const logFail = (fail: string[]): void => {
    console.log('fail', fail)

}

const logSuccess = <T>(success: T, messages: string[]): void => {
    console.log('success', success, messages)
}

const database = [
    {
        email: 'simon@example.com'
    }
]

const dtos: Profile.ProfileDto[] = [
    {
        name: 'Chris',
        email: 'chris@example.com',
    },
    {
        name: 'Simon',
        email: 'simon@example.com',
    }
]

const transformDtoToProfile = R.pipe(   
    Profile.dtoToProfile,
    Rop.failTree(logFail),
    Rop.successTree(logSuccess),
    Rop.s((v) => {
        return 'v';
    }),
)

const fetchDtos = async () => dtos

const pipeline = R.map(transformDtoToProfile)

const then = <I, T>(fn: (input: I) => T) => (value: Promise<I>): Promise<T> => 
    value.then((v) => fn(v))

// filter success and errors seperately

R.pipe(
    fetchDtos,
    then(pipeline),
)

    
