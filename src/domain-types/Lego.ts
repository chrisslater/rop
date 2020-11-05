import { 
    Result,
    succeed, 
    fail,
    liftR2,
    compute,
} from '../rop'

import { Strings } from '../simple-types'

const ErrorStrings = {
    Missing: 'Missing',
    MoreThan20: 'MoreThan20'
}

interface LegoOutput {
    id: string
    name: string
}

type LegoDto = Partial<LegoOutput>

interface KindKeys {
    Lego: 'Lego'
}

const KindKeys: KindKeys = {
    Lego: 'Lego',
}

export interface Lego {
    kind: KindKeys['Lego']
    value: {
        id: Strings.String20
        name: Strings.String20
    }
}

const lego = (id: Strings.String20) => (name: Strings.String20): Lego => ({
    kind: KindKeys.Lego,
    value: {
        id,
        name,
    }
})

export const dtoToLego = (legoDto: LegoDto): Result<Lego> => {
    const idOrError = Strings.string20(legoDto.id, 'id')
    const nameOrError = Strings.string20(legoDto.name, 'name')

    const final = liftR2(idOrError)(nameOrError)(lego)

    return final
}

export const legoToDto = (lego: Lego): Result<LegoOutput> => {
    return succeed({
        id: lego.value.id.value,
        name: lego.value.name.value,
    })
}