import { liftR2, Result } from '../rop'

import { Strings } from '../simple-types'
import { Email } from '../domain-types'

export interface ProfileDto {
    name?: string
    email?: string
}

enum KindKey {
    Profile
}

export interface Profile {
    kind: KindKey.Profile
    name: Strings.String20
    email: Email.Email
}

const profile = (name: Strings.String20) => (email: Email.Email): Profile => ({
    kind: KindKey.Profile,
    name,
    email,
})

export const dtoToProfile = (dto: ProfileDto): Result<Profile> => {
    const nameOrFail = Strings.string20({ id: 'name' })(dto.name)
    const emailOrFail = Email.email(dto.email)

    return liftR2(nameOrFail)(emailOrFail)(profile)
}