import { failedTransform } from './create-example-objects'
import { matchMessage } from '../rop'

/**
 * Matching messages
 */ 

const handleMessages = matchMessage({
    'Missing': () => { 
        console.log('Missing the things') 
    },
    'MoreThan20': () => {
        console.log('More than 20!')
    },
})

handleMessages(failedTransform)
