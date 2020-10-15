import { 
    valueOrElse,
    matchResult,
    matchResult2,
} from '../rop'

import { Lego } from '../domain-types'

import { successfulTransform, failedTransform, mixedTransforms } from './create-example-objects'

// Lets create a logger to see the results of errors 
const logErrors = (str: string[]) => { 
    str.map((v, k) => console.log(`error ${k + 1}`, v))
}

// ======= Matchers

/**
 * Matching a result
 * ----------------
 * matchResult allows you to branch based on the success or failure of the result.
 * Think of it as a switch statement
 */

// You can use dot notation to match a result
successfulTransform.matchResult({
    Success: (value) => { 
        console.log('successfulTransform from Class', value)
    },
    Fail: logErrors,
})

// Or you can use the two matchResult utilities (matchResult and matchResult2)
matchResult(successfulTransform)({
    Success: (value) => {
        console.log('successfulTransform', value)
    },

    Fail: logErrors
})

// matchResult2 allows you to define your branches prior to assigning the result.
// As shown below you can map over your match.
const match = matchResult2<Lego.Lego>({
    Success: (value) => {
        console.log('matcherResult2 success', value)
    },
    Fail: logErrors,
})

mixedTransforms.map(match)


failedTransform.matchResult({
    Success: (value) => { 
        console.log('successfulTransform from Class', value)
    },
    Fail: logErrors,
})

matchResult(successfulTransform)({
    Success: (value) => {
        console.log('successfulTransform', value)
    },

    Fail: logErrors
})



mixedTransforms.map(valueOrElse(() => 'Boo'))