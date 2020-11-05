import * as R from 'ramda'
import * as Rop from '../rop'

import { Profile } from '../domain-types'

const logFail = (failMessages: Rop.MessageEnvelope[]): void => {
    console.log('fail', failMessages)

}

const logSuccess = (success: Profile.Profile, messages: Rop.MessageEnvelope[]): void => {
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

const saveToDatabase = async (profile: Profile.Profile) => {
    
}

const then = <I, T>(fn: (input: I) => T) => (value: Promise<I>): Promise<T> => 
    value.then(fn)

// const catch = <I, T>(fn: (input: I) => T) => (value: Promise<I>): Promise<T> => 
//     value.then((v) => fn(v))


const resultAsync = ({ successMessages, failMessages }: { successMessages: Rop.MessageEnvelope | Rop.MessageEnvelope[], failMessages: Rop.MessageEnvelope | Rop.MessageEnvelope[] }) => <In, Out>(fn: (value: In) => Promise<Out>) => (value: In): Promise<Rop.Result<Out>> => 
    fn(value)
        .then((out) => Rop.succeed(out, successMessages))
        // @todo add error
        .catch(() => Rop.fail(failMessages))


const processProfile = R.pipe(   
    Profile.dtoToProfile,
    Rop.failTree(logFail),
    Rop.successTree(logSuccess),
    resultAsync({ successMessages: { code: 'SAVE_SUCCESS' }, failMessages: { code: 'SAVE_FAIL' } })(saveToDatabase),
    (value) => {}
)

const fetchDtos = async () => dtos

const asyncTryCatch = <Value>(catcher) => (tryer) => async (value) => {
    try {
        return await tryer()
    } catch (error) {
        return await catcher()
    }
}

// filter success and errors seperately

const log = R.map((profile: Profile.Profile) => {

})

const pipeline = R.pipe(
    fetchDtos,
    then(R.map(processProfile)),
)



Rop.compute(async () => {
    R.map(() => {})(await pipeline())

    
});
