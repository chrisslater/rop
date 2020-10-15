import { Lego } from '../domain-types'

export const successfulTransform = Lego.dtoToLego({ 
    id: 'abcdefg',
    name: 'Death Star'  
});

export const failedTransform = Lego.dtoToLego({
    id: 'valid-id',
    name: 'VERRRRRRRRRRRRRRRRYYYYYYYYYYYY BBIIIIIIIIIIGGGGGG Name'
});

export const mixedTransforms = [successfulTransform, failedTransform]