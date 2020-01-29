import { failedTransform } from './create-error-scenario'
import { matchMessage } from '../rop'

const handleMessages = matchMessage({
    'Missing': () => { 
        console.log('Missing the things') 
    },
    'MoreThan20': () => {
        console.log('More than 20!')
    },
})

handleMessages(failedTransform)
