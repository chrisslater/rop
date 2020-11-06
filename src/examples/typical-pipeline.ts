import * as R from 'ramda'
import * as Rop from '../rop'

import { Profile } from '../domain-types'
import { isSuccess } from '../rop'

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

const saveToDatabase = async (profile: Profile.Profile): Promise<void> => {

}

const then = <I, T>(fn: (input: I) => T) => (value: Promise<I>): Promise<T> =>
    value.then(fn)

// const catch = <I, T>(fn: (input: I) => T) => (value: Promise<I>): Promise<T> =>
//     value.then((v) => fn(v))


const resultAsync = ({ successMessages, failMessages }: { successMessages: Rop.MessageEnvelope | Rop.MessageEnvelope[], failMessages: Rop.MessageEnvelope | Rop.MessageEnvelope[] }) => <In, Out>(fn: (value: In) => Promise<Out>) => (result: Rop.Result<In>): Promise<Rop.Result<Out>> => {
    return Rop.s<In, Out>((value) => {
        return fn(value)
            .then((out) => Rop.succeed(out, successMessages))
            // @todo add error
            .catch(() => Rop.fail(failMessages))
    })(result);
}


// const asyncTryCatch = <I, O>(catcher: (error: any) => Rop.MessageEnvelope) => (tryer: (value: I) => Promise<O>) => async (result: Rop.Result<I>): Promise<Rop.Result<O>> => {
//     return Rop.s<I, Rop.Result<O>>((value) => {
//         try {
//             return Rop.succeed(await tryer(value))
//         } catch (error) {
//             return Rop.fail<O>(catcher(error))
//         }
//     })(result)
//         .value
// }

const identity = <T>(value: T): T => value

const asyncTryCatch = <I, O>(catcher: (error: any) => Rop.MessageEnvelope) => (tryer: (value: I) => Promise<O>) => async (result: Rop.Result<I>): Promise<Rop.Result<O>> => {
    if (isSuccess<I>(result)) {
        try {
            const t = await tryer(result.value)
            return Rop.succeed(t, result.messages)
        } catch (error) {
            return Rop.fail<O>(catcher(error))
        }
    }

    return Rop.fail<O>(result.messages)
}


const processProfile = R.pipe(
    Profile.dtoToProfile,
    Rop.failTree(logFail),
    Rop.successTree(logSuccess),
    asyncTryCatch(() => ({ code: 'SaveError' }))(saveToDatabase),
    (value) => {}
)

const fetchDtos = async () => dtos



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
